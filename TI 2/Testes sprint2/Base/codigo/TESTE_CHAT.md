# Instruções para teste do chat

Este guia explica como testar a tela de mensagens sem utilizar a página de
login. O usuário será simulado pelo `sessionStorage` do navegador.

## 1. Iniciar o servidor

Na raiz do repositório, no mesmo nível da pasta `codigo`, execute:

```bash
npm start
```

O servidor utiliza como padrão os caminhos:

- Banco de dados: `codigo/db/db.json`
- Arquivos estáticos: `codigo/public/`
- Porta: `3000`

O comando usa o [package.json](../package.json) padrão da raiz, com caminhos
relativos às pastas `codigo/db/` e `codigo/public/`.

## 2. Abrir a tela do chat

Acesse diretamente:

```text
http://localhost:3000/dm.html
```

Não abra o arquivo diretamente com `file://`, pois a API e os arquivos
estáticos precisam ser carregados pelo JSON Server.

## 3. Usuários de teste

Os usuários já estão cadastrados diretamente na coleção `usuarios` do arquivo
`db/db.json`. Não é necessário criá-los pelo Console.

| Perfil | Login | Senha | ID |
|---|---|---|---:|
| Aluno | `aluno1` | `123456` | 1 |
| Professor | `professor1` | `123456` | 2 |
| Monitor | `monitor1` | `123456` | 3 |
| Administrador | `admin1` | `123456` | 4 |

O chat configurado para os testes relaciona os usuários `1` e `2`.

## 4. Simular o usuário logado

O chat procura o usuário atual em:

```text
sessionStorage.usuarioCorrente
```

### Testar como aluno

Execute no Console:

```javascript
sessionStorage.setItem(
  "usuarioCorrente",
  JSON.stringify({
    id: 1,
    login: "aluno1",
    nome: "Aluno Teste",
    email: "aluno@teste.com",
    cargo: "aluno"
  })
);

location.reload();
```

### Testar como professor

Execute no Console:

```javascript
sessionStorage.setItem(
  "usuarioCorrente",
  JSON.stringify({
    id: 2,
    login: "professor1",
    nome: "Professor Teste",
    email: "professor@teste.com",
    cargo: "professor"
  })
);

location.reload();
```

O chat existente no banco relaciona os usuários `1` e `2`. Por isso, esses
dois usuários podem ser usados para testar as duas perspectivas da conversa.

Para conferir o usuário configurado:

```javascript
JSON.parse(sessionStorage.getItem("usuarioCorrente"));
```

## 5. Testar a conversa

Na tela do chat, verifique:

1. O nome, cargo, avatar, e-mail e telefone do contato são carregados.
2. As mensagens existentes aparecem na área da conversa.
3. As mensagens do usuário atual ficam alinhadas à direita.
4. As mensagens do outro usuário ficam alinhadas à esquerda.
5. Mensagens com mais de 400 caracteres exibem o botão **Mostrar mais**.
6. O painel **Informações** pode ser aberto e fechado.
7. As perguntas frequentes exibem seus popups.

## 6. Enviar uma mensagem pela tela

Digite uma mensagem no campo inferior e clique em **Enviar**.

O JavaScript do chat enviará a mensagem para:

```text
http://localhost:3000/mensagens
```

A mensagem também será adicionada ao arquivo `db/db.json`.

## 7. Criar uma mensagem pelo Console

Para testar o envio sem utilizar o formulário, execute:

```javascript
fetch("/mensagens", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    id_chat: 1,
    id_remetente: 1,
    id_destinatario: 2,
    texto: "Mensagem criada pelo teste.",
    tag: null,
    resposta_de: null,
    data_hora: new Date().toISOString(),
    status: "Enviada"
  })
})
  .then((resposta) => {
    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    return resposta.json();
  })
  .then((mensagem) => {
    console.log("Mensagem criada:", mensagem);
    location.reload();
  })
  .catch((erro) => {
    console.error("Erro ao criar mensagem:", erro);
  });
```

## 8. Consultar os dados da API

### Usuários

```javascript
fetch("/usuarios")
  .then((resposta) => resposta.json())
  .then((usuarios) => console.table(usuarios));
```

### Chats

```javascript
fetch("/chats")
  .then((resposta) => resposta.json())
  .then((chats) => console.table(chats));
```

### Mensagens

```javascript
fetch("/mensagens")
  .then((resposta) => resposta.json())
  .then((mensagens) => console.table(mensagens));
```

## 9. Alternar entre usuários

Para trocar a perspectiva da conversa, substitua o conteúdo da sessão:

```javascript
sessionStorage.setItem(
  "usuarioCorrente",
  JSON.stringify({
    id: 2,
    login: "professor1",
    nome: "Professor Teste",
    email: "professor@teste.com",
    cargo: "professor"
  })
);

location.reload();
```

Use `id: 1` para o aluno ou `id: 2` para o professor.

## 10. Limpar a sessão de teste

Para remover o usuário simulado:

```javascript
sessionStorage.removeItem("usuarioCorrente");
location.reload();
```

Isso remove apenas a sessão do navegador; os dados persistidos no
`db/db.json` permanecem no banco.

## Endpoints utilizados

| Recurso | Endpoint |
|---|---|
| Usuários | `http://localhost:3000/usuarios` |
| Chats | `http://localhost:3000/chats` |
| Mensagens | `http://localhost:3000/mensagens` |
| Tela do chat | `http://localhost:3000/dm.html` |
