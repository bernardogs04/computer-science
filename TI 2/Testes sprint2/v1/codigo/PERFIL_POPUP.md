# Pop-up de Perfil do Usuário

Artefato individual: **visualização dos dados pessoais e alteração do apelido** (RF01–RF11).

## 1. Diagnóstico da estrutura existente

| Item | Situação encontrada |
|---|---|
| Tecnologias | HTML + CSS + JavaScript puros (sem framework), Font Awesome (CDN), Bootstrap só na tela de login do template. Back end: **json-server 0.17.4** (`npm start`) servindo `codigo/db/db.json` e `codigo/public/` na porta 3000. |
| Páginas | `index.html` (home Mentora), `dm.html` (chat), `disciplina.html`; `home.html`, `about.html` e `modulos/login/*` são do template da disciplina. |
| Usuários | Coleção `usuarios` em `db/db.json`: `id, login, nome, email, senha, cargo`. O papel se chama **`cargo`** (não `classe`) e os valores são os mesmos do documento: `aluno, monitor, professor, administrador`. **Não existem** `apelido, matricula, curso, campus, disciplinas, data_cadastro` no banco. |
| Usuário atual | Não há login funcional (`assets/js/login.js`, referenciado pelas páginas do template, **não existe** no projeto). Duas convenções provisórias coexistem: `sessionStorage.usuarioCorrente` (chat) e `localStorage.usuarioId` (home, com fallback para o id 1). |
| Persistência | **Real**: o json-server grava as requisições `POST/PATCH/DELETE` em `db/db.json`. |
| Componentes de popup existentes | `<dialog>` nativo na home (notificações, lembretes) e overlays próprios no chat e na disciplina. |
| Botões de perfil já existentes | Avatar `.perfil` da home (era um `<a href="#">` sem ação) e link/botões "Perfil" em `disciplina.html` (sem ação). Chat: não havia. |
| Padrões | Português, `camelCase`/`kebab-case`, classes BEM-like (`lembrete-form__fechar`), variáveis CSS do tema da home (`--superficie`, `--texto`, `--destaque`…). |

## 2. Como funciona

Um único componente reutilizável, **sem dependências**:

- `public/assets/js/perfil.js` — cria **um** `<dialog>` nativo (modal) na primeira abertura e reaproveita sempre o mesmo.
- `public/assets/css/perfil.css` — estilos; usa as variáveis do tema da home (claro/escuro) e cai para a paleta roxa do projeto nas outras páginas.

Gatilhos sem JavaScript adicional:

```html
<button data-perfil-usuario="proprio">Meu perfil</button>  <!-- usuário logado: pode editar o apelido -->
<a href="#" data-perfil-usuario="3">Perfil</a>             <!-- usuário de id 3: somente leitura -->
```

ou por código: `Perfil.abrir(3)`.

**Regra de modo (RF11):** o pop-up compara o `id` devolvido pela API (`GET /usuarios/:id`) com o id do usuário logado. Só se forem iguais aparece o botão ✎, o campo, Salvar/Cancelar, e-mail e matrícula. Para terceiros, e-mail, matrícula e senha são descartados **antes** de renderizar (não ficam nem no DOM).

**Salvamento (RF09):** `PATCH /usuarios/:id` com corpo `{ "apelido": "..." }` (somente esse campo). O sucesso só é exibido se o servidor responder 2xx **e** devolver o apelido gravado. Em seguida é disparado o evento `perfil:apelido-atualizado` (`detail: {id, apelido}`) no `document` e num `BroadcastChannel`, para atualizar telas da mesma aba e de outras abas.

**Validação (RF08):** 2 a 30 caracteres, após `trim` e colapso de espaços repetidos; letras (inclusive acentuadas), números, espaços e `. _ ' ’ -`; precisa ter ao menos uma letra ou número. Mensagens: "Digite um apelido.", "O apelido deve ter pelo menos 2 caracteres.", "O apelido deve ter no máximo 30 caracteres.", "O apelido contém caracteres inválidos.". O botão Salvar fica desabilitado enquanto o apelido for inválido.

### Pontos de integração

| Tela | Integração |
|---|---|
| `index.html` (home) | Avatar do topo virou `<button data-perfil-usuario="proprio">`, mostra as iniciais; saudação e nomes de monitores nos cards usam o apelido (fallback: primeiro nome / nome completo); atualiza ao salvar. |
| `dm.html` (chat) | Avatar do contato (clicável, também por teclado) e botão "Ver perfil" no painel Informações abrem o perfil do **contato**; título do chat usa o apelido do contato, se houver. |
| `disciplina.html` | Link "Perfil" do cabeçalho abre o perfil próprio; botão "Perfil" do card do Monitor 1 abre o usuário 3. |

## 3. Relação de alterações

**Criados**
- `codigo/public/assets/js/perfil.js` — componente do pop-up (lógica, validação, API, a11y).
- `codigo/public/assets/css/perfil.css` — estilos do pop-up e do botão de avatar.
- `codigo/PERFIL_POPUP.md` — este documento.

**Modificados** (alterações localizadas; nada removido)
- `public/index.html` — `<link>`/`<script>` do componente; avatar `<a href="#">` → `<button>` com `data-perfil-usuario="proprio"` (o `<a>` apontava para `#` e não tinha função).
- `public/assets/js/mentora.js` — registra `getUsuarioId` como resolvedor do usuário logado; saudação/avatar/nome de monitores com apelido; listener que atualiza a tela após salvar.
- `public/dm.html` e `public/assets/js/dm.js` — gatilhos de perfil do contato; nome exibido com apelido; recarrega o cabeçalho se o apelido do contato mudar.
- `public/disciplina.html` — `<link>`/`<script>` e gatilhos nos links "Perfil".

**Não modificados:** `db/db.json`, `package.json`, `style.css`, `dm.css`, `disciplina.css`, `disciplina.js`, `login`, etc.

## 4. Como executar e verificar

```bash
npm install
npm start            # json-server em http://localhost:3000
```

1. Abra `http://localhost:3000/index.html` e clique no avatar redondo no canto superior esquerdo → "Meu perfil".
2. Clique em ✎, digite um apelido, **Salvar**. Confira em `codigo/db/db.json` o campo `"apelido"` no usuário.
3. Chat: `http://localhost:3000/dm.html` (usuário simulado conforme `TESTE_CHAT.md`), clique no avatar do contato → perfil somente leitura.
4. Trocar de usuário: `localStorage.setItem("usuarioId", 3)` (home) ou `sessionStorage.setItem("usuarioCorrente", JSON.stringify({id: 2}))` (chat); recarregue.

> Para ver todos os campos preenchidos, o banco precisa tê-los. Eles não existem hoje; sem eles o pop-up mostra "Não informado". Exemplo de usuário completo:
> `{ "id": 1, ..., "apelido": "Ju", "matricula": "000000", "curso": "...", "campus": "...", "disciplinas": ["CODIGO-01"], "data_cadastro": "2025-02-10T12:00:00Z" }`

## 5. Resultado dos testes

Verificados com um script Playwright (Chromium) contra um json-server real, em **cópia** do projeto com dados de teste adicionais (o `db.json` entregue **não** foi alterado). **38 de 38 verificações passaram**, sem erros de JavaScript no console.

| # | Cenário | Resultado |
|---|---|---|
| 1 | Abrir perfil próprio (modal, fundo escurecido, página/URL/rolagem intactas) | Aprovado |
| 2 | Fechar pelo × | Aprovado |
| 3 | Fechar com Escape (e Esc fecha só o perfil quando está sobre as notificações) | Aprovado |
| 4 | Fechar clicando fora; clicar dentro não fecha; arrastar seleção de dentro para fora não fecha | Aprovado |
| 5 | Avatar com iniciais (nome com espaços duplicados) | Aprovado |
| 6 | Exibição dos dados (próprio, monitor via card, usuário sem dados) | Aprovado |
| 7 | Apelido válido habilita Salvar | Aprovado |
| 8 | Vazio / só espaços | Aprovado |
| 9 | Menos de 2 caracteres | Aprovado |
| 10 | Mais de 30 (30 aceito, 31 rejeitado) | Aprovado |
| 11 | Caracteres inválidos rejeitados (`<script>`, `@`, `$`, emoji, `--`, `/`); válidos aceitos (`Zé`, `João`, `Çaça Ñandú`, `D'Ávila`, `Maria-Clara`…) | Aprovado |
| 12 | Contador (`3/30`, `9/30`, destaque ao exceder) | Aprovado |
| 13 | Salvar: `PATCH` real, valor gravado em `db.json`, nome/cargo/e-mail intactos, mensagem de sucesso | Aprovado |
| 14 | Cancelar: texto digitado descartado, nada gravado | Aprovado |
| 15 | Perfil de outro usuário sem ✎/campo/Salvar/Cancelar; forçar o formulário pelo DOM não grava | Aprovado |
| 16 | Perfil de outro usuário sem e-mail/matrícula (nem no HTML) | Aprovado |
| 17 | Apelido refletido na saudação da home (sem recarregar e após recarregar) e no chat do outro usuário | Aprovado |
| 18 | Campos ausentes → "Não informado", sem `undefined`/`null` | Aprovado |
| 19 | Falha de salvamento (HTTP 500, rede caída, resposta 200 sem o apelido) → erro mostrado, sem falso sucesso, nada gravado | Aprovado |
| 20 | Responsividade em 360, 768 e 1440 px (sem rolagem horizontal, dentro da tela) | Aprovado |
| 21 | Reabrir 7 vezes: um único `<dialog>`, 1 `PATCH` por salvamento, foco volta ao botão de origem | Aprovado |
| 22 | Compatibilidade: lembretes, notificações e tema da home; pop-up de evento da disciplina | Aprovado |
| — | Acessibilidade: `aria-modal` nativo, nome acessível do ×/✎, `label for`, `aria-invalid`, `role="alert"`, foco preso | Aprovado |

**Não executados:** não há testes automatizados no projeto (nada a rodar); não testado em Firefox/Safari; leitor de tela real não utilizado; nenhum teste de carga/segurança do servidor.

Durante os testes foi encontrado e corrigido um defeito da própria implementação (mensagem de erro de salvamento sendo apagada logo após aparecer).

## 6. Limitações e pendências

- **Autenticação inexistente.** `login.js` não está no projeto. Enquanto o login da equipe não gravar o usuário, o pop-up usa `sessionStorage.usuarioCorrente.id` → `localStorage.usuarioId` → **id 1** (o mesmo fallback "TEMPORÁRIO" que `mentora.js` já tinha). Quando o login existir, basta ele gravar uma dessas chaves, ou chamar `Perfil.definirResolvedorUsuario(fn)`.
- **O servidor não faz controle de acesso.** O json-server aceita `PATCH /usuarios/:id` de qualquer cliente e devolve e-mail, matrícula e **senha em texto puro** em `GET /usuarios/:id`. A privacidade e a regra "só edita o próprio perfil" estão garantidas **somente no front end**; um back end real precisa repetir essas regras (e nunca expor `senha`). Isso já era assim antes desta entrega.
- **Dados ausentes no banco.** `matricula, curso, campus, disciplinas, data_cadastro, apelido` não existem em `db.json` (o pop-up mostra "Não informado"). Não foram inventados dados. `apelido` é criado no primeiro salvamento. As disciplinas de **monitores** são lidas de `/monitorias` quando o usuário não tem o campo `disciplinas`; para os demais cargos não há relação no banco.
- **Cards de monitor da disciplina são estáticos** ("Nome do Monitor 1/2"). Liguei o Monitor 1 ao usuário 3 (único monitor cadastrado); o Monitor 2 não tem usuário vinculado e o botão mostra "Não foi possível identificar o usuário deste perfil". Quando o card for gerado a partir da API, basta emitir `data-perfil-usuario="<id>"`.
- **Chat:** só abre o perfil do contato do chat atual (o chat do projeto exibe um único chat por usuário). Não há botão de perfil próprio na tela do chat (a barra `navbar`/`header` é um placeholder da equipe).
- Os cards de monitor da home (`index.html`) mostram nome, não são clicáveis; não foi alterado o layout deles.
- Nomes: o documento usa `classe` e `id_usuario`; o projeto usa `cargo` e `id`. Foi preservado o do projeto (`obterClasse()` aceita os dois).
- Avatar do pop-up segue o do chat (iniciais das duas primeiras palavras do nome).

## 7. Conferência com os requisitos acadêmicos

| Requisito | Implementado? | Evidência ou observação |
|---|---|---|
| Abertura do pop-up | Sim | Teste 1; avatar da home, link da disciplina, avatar/botão do chat |
| Fechamento por botão, Escape e clique externo | Sim | Testes 2, 3, 4 |
| Avatar com iniciais | Sim | Teste 5 (cálculo dinâmico; "?" neutro sem nome) |
| Nome completo somente leitura | Sim | Texto, não campo; vem da API (Teste 6/6b) |
| Exibição do apelido | Sim | Fallback = primeiro nome (Testes 5b, 6) |
| Edição do apelido | Sim | ✎ → campo, contador, Salvar/Cancelar (Testes 7, 12, 14) |
| Validação entre 2 e 30 caracteres | Sim | Testes 8–10 |
| Mensagens de validação | Sim | As 4 mensagens do documento (Testes 8–11) |
| Salvamento do apelido | Sim | `PATCH /usuarios/:id` gravado em `db.json` (Teste 13) |
| Mensagem de sucesso | Sim | "Apelido atualizado com sucesso"; não aparece em falha (Teste 19) |
| Cancelamento da edição | Sim | Teste 14 |
| Exibição da classe | Sim | Selo por cargo; somente leitura |
| Exibição dos dados pessoais | Parcial | Implementado e testado; **o banco ainda não tem** a maioria dos campos (mostra "Não informado") |
| Perfil de outro usuário em modo somente leitura | Sim | Testes 15, 15b |
| Ocultação de e-mail e matrícula de terceiros | Sim (só front end) | Teste 16; o servidor continua devolvendo esses campos |
| Atualização do apelido nas demais telas | Sim | Saudação e cards da home, título do chat (Teste 17); entre abas via `BroadcastChannel` (implementado, não testado entre abas) |
| Persistência dos dados | Sim | json-server real; sem controle de acesso no servidor |
| Responsividade e acessibilidade | Sim | Testes 20 e de acessibilidade; sem leitor de tela real |
