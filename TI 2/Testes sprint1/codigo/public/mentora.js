/* =====================================================================
   CONFIGURAÇÃO
   ===================================================================== */
const API = "http://localhost:3000";            // endereço do json-server
const STATUS_OCULTOS = ["Cancelado", "Concluído", "Concluido"]; // agendamentos que não aparecem em "Próximas tarefas"
const PALETA = ["#7dd3c0", "#f2c14e", "#e07a8f", "#8aa8ff", "#b48ef0", "#f09a5a"];
const ICONES = { agendamento: "📅", lembrete: "⏰", evento: "🎉" };

/* =====================================================================
   ACESSO À API
   ===================================================================== */
async function api(caminho, opcoes) {
  const resposta = await fetch(`${API}${caminho}`, opcoes);
  if (!resposta.ok) throw new Error(`Erro ${resposta.status} ao acessar ${caminho}`);
  return resposta.json();
}

/* Usuário logado.
   TEMPORÁRIO: enquanto não existe tela de login, usa o id salvo no navegador
   (no console: localStorage.setItem("usuarioId", 3)) ou o usuário 1.
   Quando o login existir, ele só precisa gravar "usuarioId" aqui. */
function getUsuarioId() {
  return Number(localStorage.getItem("usuarioId")) || 1;
}

let usuarioAtual = null;
let tarefasAtuais = [];
let erroTagsNotificacao = null;
let lembreteEmEdicao = null;

/* =====================================================================
   REGRAS DE NEGÓCIO (o que cada cargo enxerga)
   ===================================================================== */
function consultaAgendamentos(usuario) {
  switch (usuario.cargo) {
    case "aluno":         return `/agendamentos?id_aluno=${usuario.id}`;
    case "monitor":       return `/agendamentos?id_monitor=${usuario.id}`;
    case "administrador": return `/agendamentos`;
    default:              return null; // professor: ainda não há relação com agendamentos no banco
  }
}

function codigosDasDisciplinas(usuario, { agendamentos, chats, monitorias, disciplinas }) {
  if (usuario.cargo === "administrador") return disciplinas.map(d => d.codigo);

  const codigos = new Set();
  // disciplinas em que é monitor
  monitorias
    .filter(m => m.id_monitor === usuario.id)
    .forEach(m => codigos.add(m.codigo_disciplina));
  // disciplinas dos agendamentos
  agendamentos.forEach(a => codigos.add(a.codigo_disciplina));
  // disciplinas dos chats (chats usam id_disciplina, não o código)
  chats.forEach(c => {
    const d = disciplinas.find(d => d.id === c.id_disciplina);
    if (d) codigos.add(d.codigo);
  });
  return [...codigos];
}

function corDaDisciplina(codigo) {
  // o banco não guarda cor: gera uma estável a partir do código
  let soma = 0;
  for (const c of String(codigo)) soma += c.charCodeAt(0);
  return PALETA[soma % PALETA.length];
}

/* =====================================================================
   CARREGAMENTO DOS DADOS
   ===================================================================== */
async function carregarDados() {
  const usuario = await api(`/usuarios/${getUsuarioId()}`);
  const consulta = consultaAgendamentos(usuario);

  const [agendamentos, chatsA, chatsB, monitorias, disciplinas, naoLidas] = await Promise.all([
    consulta ? api(consulta) : [],
    api(`/chats?id_usuario_1=${usuario.id}`),
    api(`/chats?id_usuario_2=${usuario.id}`),
    api("/monitorias"),
    api("/disciplinas"),
    api(`/notificacoes?id_usuario=${usuario.id}&status=${encodeURIComponent("Nao Lida")}`),
  ]);

  let lembretes = [];
  let erroLembretes = null;
  try {
    lembretes = await api(`/lembretes?id_usuario=${usuario.id}`);
  } catch (erro) {
    erroLembretes = erro;
    console.error("Não foi possível carregar os lembretes:", erro);
  }

  let tagsNotificacao = [];
  let erroTagsNotificacao = null;
  try {
    tagsNotificacao = await api("/tags_notificacao");
  } catch (erro) {
    erroTagsNotificacao = erro;
    console.error("Não foi possível carregar as categorias dos lembretes:", erro);
  }

  const chats = [...chatsA, ...chatsB];

  // nomes dos monitores (só precisamos do campo "nome")
  const idsMonitores = [...new Set(monitorias.map(m => m.id_monitor))];
  const monitores = idsMonitores.length
    ? await api("/usuarios?" + idsMonitores.map(id => `id=${id}`).join("&"))
    : [];
  const nomePorId = Object.fromEntries(monitores.map(m => [m.id, m.nome]));

  // cards de disciplinas
  const cards = codigosDasDisciplinas(usuario, { agendamentos, chats, monitorias, disciplinas })
    .map(codigo => disciplinas.find(d => d.codigo === codigo))
    .filter(Boolean)
    .map(d => ({
      id: d.id,
      nome: d.nome,
      cor: corDaDisciplina(d.codigo),
      monitores: monitorias
        .filter(m => m.codigo_disciplina === d.codigo)
        .map(m => nomePorId[m.id_monitor])
        .filter(Boolean),
    }));

  // tarefas = agendamentos ativos
  const tarefas = agendamentos
    .filter(a => !STATUS_OCULTOS.includes(a.status))
    .map(a => {
      const disc = disciplinas.find(d => d.codigo === a.codigo_disciplina);
      return {
        id: a.id,
        tipo: "agendamento",
        descricao: `Monitoria de ${disc ? disc.nome : a.codigo_disciplina}`,
        detalhe: a.descricao,
        modalidade: a.modalidade,
        data: `${a.data}T${a.horario}`,
        concluida: false,
      };
    });

  const tarefasLembretes = lembretes.map(lembrete => ({
    id: lembrete.id,
    tipo: "lembrete",
    descricao: lembrete.titulo,
    detalhe: lembrete.descricao,
    data: lembrete.data,
    tag: lembrete.tag || "",
    concluida: false,
  }));

  return {
    usuario,
    cards,
    tarefas: [...tarefas, ...tarefasLembretes],
    naoLidas: naoLidas.length,
    erroLembretes,
    tagsNotificacao,
    erroTagsNotificacao,
  };
}

/* =====================================================================
   RENDERIZAÇÃO
   ===================================================================== */
function saudacaoPorHorario() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

function renderCabecalho(usuario) {
  const primeiroNome = usuario.nome.split(" ")[0];
  document.getElementById("saudacao").textContent = `${saudacaoPorHorario()}, ${primeiroNome}!`;
  document.getElementById("perfil-inicial").textContent = usuario.nome.charAt(0).toUpperCase();
  if (usuario.foto) { // campo opcional: adicione "foto" em usuarios quando quiser
    const img = document.getElementById("perfil-foto");
    img.src = usuario.foto; img.alt = `Foto de ${usuario.nome}`; img.hidden = false;
    document.getElementById("perfil-inicial").hidden = true;
  }
}

// function atualizarNotificacoes(qtd) {
//   const el = document.getElementById("notif-contador");
//   if (!el) return; // se o elemento não existir no HTML, não derruba a página
//   el.textContent = qtd;
//   el.hidden = qtd === 0;
// }

function renderDisciplinas(cards) {
  const lista = document.getElementById("lista-disciplinas");
  lista.innerHTML = "";

  if (cards.length === 0) {
    lista.innerHTML = `<p class="estado-vazio">Você ainda não está em nenhuma disciplina.</p>`;
    return;
  }

  cards.forEach(d => {
    const a = document.createElement("a");
    a.href = `disciplina.html?id=${d.id}`;
    a.className = "disciplina";
    a.style.setProperty("--cor", d.cor);
    a.innerHTML = `<span class="disciplina__nome"></span><span class="disciplina__info"></span>`;
    a.querySelector(".disciplina__nome").textContent = d.nome;
    a.querySelector(".disciplina__info").textContent =
      d.monitores.length ? `Monitor: ${d.monitores.join(", ")}` : "Sem monitor";
    lista.appendChild(a);
  });
}

function formatarData(iso) {
  const data = new Date(iso);
  if (isNaN(data)) return "Data a definir";
  return data.toLocaleString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

function renderTarefas(tarefas) {
  const lista = document.getElementById("lista-tarefas");
  lista.innerHTML = "";

  if (tarefas.length === 0) {
    lista.innerHTML = `<li class="tarefas__vazio">Nenhuma tarefa por enquanto. Crie um lembrete ou agende uma monitoria.</li>`;
    return;
  }

  // datas válidas em ordem; datas inválidas/placeholder vão para o fim
  const valor = t => { const d = new Date(t.data); return isNaN(d) ? Infinity : d.getTime(); };
  [...tarefas].sort((a, b) => valor(a) - valor(b)).forEach(t => {
    const li = document.createElement("li");
    li.className = "tarefa" + (t.concluida ? " is-concluida" : "");
    li.innerHTML = `
      <span class="tarefa__icone"></span>
      <div class="tarefa__corpo">
        <p class="tarefa__descricao"></p>
        <p class="tarefa__detalhe"></p>
        <span class="tarefa__data"></span>
      </div>`;
    li.title = t.detalhe || "";
    li.querySelector(".tarefa__icone").textContent = ICONES[t.tipo] || "📌";
    li.querySelector(".tarefa__descricao").textContent = t.descricao;
    const detalhe = li.querySelector(".tarefa__detalhe");
    detalhe.textContent = t.detalhe || "";
    detalhe.hidden = !t.detalhe;
    li.querySelector(".tarefa__data").textContent =
      `${formatarData(t.data)}${t.modalidade ? " - " + t.modalidade : ""}`;

    if (t.tipo === "lembrete") {
      const excluir = document.createElement("button");
      excluir.className = "tarefa__excluir";
      excluir.type = "button";
      excluir.setAttribute("aria-label", `Excluir lembrete: ${t.descricao}`);
      excluir.title = "Excluir lembrete";
      excluir.innerHTML = '<i class="fa-solid fa-trash" aria-hidden="true"></i>';
      excluir.addEventListener("click", () => excluirLembrete(t.id, excluir));
      li.appendChild(excluir);
    }

    lista.appendChild(li);
  });
}

async function excluirLembrete(id, botao) {
  const lembrete = tarefasAtuais.find(t => t.tipo === "lembrete" && String(t.id) === String(id));
  if (!lembrete || !confirm(`Tem certeza que deseja excluir o lembrete "${lembrete.descricao}"?`)) return;

  botao.disabled = true;
  try {
    await api(`/lembretes/${encodeURIComponent(id)}`, { method: "DELETE" });
    tarefasAtuais = tarefasAtuais.filter(
      t => !(t.tipo === "lembrete" && String(t.id) === String(id)),
    );
    renderTarefas(tarefasAtuais);
  } catch (erro) {
    console.error("Não foi possível excluir o lembrete:", erro);
    botao.disabled = false;
    alert("Não foi possível excluir o lembrete. Verifique sua conexão e tente novamente.");
  }
}

function mostrarAvisoLembretes(erro) {
  console.warn("Os demais dados foram carregados, mas os lembretes estão indisponíveis.", erro);
  const aviso = document.createElement("li");
  aviso.className = "tarefas__aviso";
  aviso.textContent = "Não foi possível carregar os lembretes. Verifique o servidor e atualize a página.";
  document.getElementById("lista-tarefas").appendChild(aviso);
}

function mostrarErro() {
  const msg = `Não foi possível carregar os dados. Verifique se o servidor (json-server) está rodando em ${API}.`;
  document.getElementById("lista-disciplinas").innerHTML = `<p class="estado-vazio">${msg}</p>`;
  document.getElementById("lista-tarefas").innerHTML = `<li class="tarefas__vazio">${msg}</li>`;
}

function aplicarTema(tema, salvar = false) {
  const temaAtual = tema === "claro" ? "claro" : "escuro";
  document.documentElement.dataset.tema = temaAtual;

  const botao = document.getElementById("btn-tema");
  if (botao) {
    const modoClaroAtivo = temaAtual === "claro";
    botao.setAttribute("aria-pressed", String(modoClaroAtivo));
    botao.setAttribute("aria-label", `Ativar modo ${modoClaroAtivo ? "escuro" : "claro"}`);
    botao.innerHTML = modoClaroAtivo
      ? '<span class="tema-toggle__sol" aria-hidden="true">☀</span>'
      : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
  }

  if (salvar) localStorage.setItem("tema-interface", temaAtual);
}

/* =====================================================================
   AÇÕES RÁPIDAS (ainda provisórias)
   ===================================================================== */
const acoes = {
  "novo-agendamento":        () => alert("Abrir tela de novo agendamento"),
  "novo-lembrete":           abrirFormularioLembrete,
  "editar-lembretes":        abrirSelecaoLembrete,
  "disciplinas-disponiveis": () => alert("Ir para a lista de disciplinas disponíveis"),
};

function preencherCategoriasLembrete(tags) {
  const seletor = document.getElementById("lembrete-tag");
  seletor.replaceChildren();

  tags.forEach(tag => {
    const nomeExibido = tag.nome.charAt(0).toLocaleUpperCase("pt-BR") + tag.nome.slice(1);
    seletor.add(new Option(nomeExibido, tag.nome));
  });
  seletor.selectedIndex = -1;
  seletor.disabled = tags.length === 0;
}

function abrirFormularioLembrete() {
  lembreteEmEdicao = null;
  document.getElementById("form-lembrete").reset();
  document.getElementById("lembrete-tag").selectedIndex = -1;
  document.getElementById("titulo-dialog-lembrete").textContent = "Novo lembrete";
  document.getElementById("salvar-lembrete").textContent = "Salvar lembrete";
  const dialog = document.getElementById("dialog-lembrete");
  const mensagemErro = document.getElementById("erro-lembrete");
  mensagemErro.textContent = erroTagsNotificacao
    ? "Não foi possível carregar as categorias. Atualize a página e tente novamente."
    : "";
  if (!erroTagsNotificacao && document.getElementById("lembrete-tag").disabled) {
    mensagemErro.textContent = "Não há categorias disponíveis para selecionar.";
  }
  dialog.showModal();
  document.getElementById("lembrete-titulo").focus();
}

function valorDataLocal(data) {
  const dataLocal = new Date(data);
  if (Number.isNaN(dataLocal.getTime())) return "";
  const doisDigitos = numero => String(numero).padStart(2, "0");
  return `${dataLocal.getFullYear()}-${doisDigitos(dataLocal.getMonth() + 1)}-${doisDigitos(dataLocal.getDate())}T${doisDigitos(dataLocal.getHours())}:${doisDigitos(dataLocal.getMinutes())}`;
}

function abrirSelecaoLembrete() {
  const lembretes = tarefasAtuais.filter(tarefa => tarefa.tipo === "lembrete");
  const lista = document.getElementById("lista-edicao-lembretes");
  const vazio = document.getElementById("lembretes-sem-itens");
  lista.replaceChildren();
  vazio.hidden = lembretes.length > 0;

  lembretes
    .sort((a, b) => new Date(a.data) - new Date(b.data))
    .forEach(lembrete => {
      const botao = document.createElement("button");
      botao.className = "lembrete-selecao__item";
      botao.type = "button";

      const titulo = document.createElement("span");
      titulo.className = "lembrete-selecao__titulo";
      titulo.textContent = lembrete.descricao;

      const data = document.createElement("span");
      data.className = "lembrete-selecao__data";
      data.textContent = formatarData(lembrete.data);

      botao.append(titulo, data);
      botao.addEventListener("click", () => editarLembrete(lembrete.id));
      lista.appendChild(botao);
    });

  document.getElementById("dialog-selecionar-lembrete").showModal();
}

function editarLembrete(id) {
  const lembrete = tarefasAtuais.find(
    tarefa => tarefa.tipo === "lembrete" && String(tarefa.id) === String(id),
  );
  if (!lembrete) return;

  lembreteEmEdicao = lembrete;
  document.getElementById("form-lembrete").reset();
  document.getElementById("lembrete-titulo").value = lembrete.descricao;
  document.getElementById("lembrete-descricao").value = lembrete.detalhe || "";
  document.getElementById("lembrete-data").value = valorDataLocal(lembrete.data);
  document.getElementById("lembrete-tag").value = lembrete.tag || "";
  document.getElementById("titulo-dialog-lembrete").textContent = "Editar lembrete";
  document.getElementById("salvar-lembrete").textContent = "Salvar alterações";
  document.getElementById("erro-lembrete").textContent = "";
  document.getElementById("dialog-selecionar-lembrete").close();
  document.getElementById("dialog-lembrete").showModal();
  document.getElementById("lembrete-titulo").focus();
}

async function salvarLembrete(evento) {
  evento.preventDefault();
  const form = evento.currentTarget;
  const botaoSalvar = document.getElementById("salvar-lembrete");
  const mensagemErro = document.getElementById("erro-lembrete");
  const dados = new FormData(form);
  const titulo = String(dados.get("titulo") || "").trim();
  const descricao = String(dados.get("descricao") || "").trim();
  const data = String(dados.get("data") || "");
  const tag = String(dados.get("tag") || "");

  if (!usuarioAtual) {
    mensagemErro.textContent = "Os dados do usuário ainda estão carregando. Tente novamente em instantes.";
    return;
  }
  if (!titulo || !tag) {
    mensagemErro.textContent = "Preencha o título e selecione uma categoria.";
    return;
  }
  if (!data) {
    mensagemErro.textContent = "Informe a data e o horário do lembrete.";
    return;
  }

  botaoSalvar.disabled = true;
  botaoSalvar.textContent = "Salvando...";
  mensagemErro.textContent = "";

  try {
    const corpo = {
      id_usuario: usuarioAtual.id,
      titulo,
      descricao,
      data: new Date(data).toISOString(),
      tag,
    };
    const lembrete = await api(
      lembreteEmEdicao
        ? `/lembretes/${encodeURIComponent(lembreteEmEdicao.id)}`
        : "/lembretes",
      {
        method: lembreteEmEdicao ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
      },
    );
    const tarefaAtualizada = {
      id: lembrete.id,
      tipo: "lembrete",
      descricao: lembrete.titulo,
      detalhe: lembrete.descricao,
      data: lembrete.data,
      tag: lembrete.tag,
      concluida: false,
    };
    if (lembreteEmEdicao) {
      tarefasAtuais = tarefasAtuais.map(tarefa =>
        tarefa.tipo === "lembrete" && String(tarefa.id) === String(lembrete.id)
          ? tarefaAtualizada
          : tarefa,
      );
    } else {
      tarefasAtuais.push(tarefaAtualizada);
    }
    renderTarefas(tarefasAtuais);
    form.reset();
    document.getElementById("dialog-lembrete").close();
  } catch (erro) {
    console.error("Não foi possível salvar o lembrete:", erro);
    mensagemErro.textContent = "Não foi possível salvar. Verifique sua conexão e tente novamente.";
  } finally {
    botaoSalvar.disabled = false;
    botaoSalvar.textContent = "Salvar lembrete";
  }
}

function iniciarAcoes() {
  aplicarTema(localStorage.getItem("tema-interface") || "escuro");
  document.getElementById("btn-tema").addEventListener("click", () => {
    const proximoTema = document.documentElement.dataset.tema === "claro" ? "escuro" : "claro";
    aplicarTema(proximoTema, true);
  });
  document.querySelectorAll(".acao").forEach(btn => {
    btn.addEventListener("click", () => acoes[btn.dataset.acao]?.());
  });
  document.getElementById("btn-notif").addEventListener("click", () => alert("Abrir painel de notificações"));
  document.getElementById("form-lembrete").addEventListener("submit", salvarLembrete);
  document.getElementById("fechar-lembrete").addEventListener("click", () => {
    document.getElementById("dialog-lembrete").close();
  });
  document.getElementById("cancelar-lembrete").addEventListener("click", () => {
    document.getElementById("dialog-lembrete").close();
  });
  document.getElementById("dialog-lembrete").addEventListener("close", () => {
    document.getElementById("form-lembrete").reset();
    document.getElementById("lembrete-tag").selectedIndex = -1;
    document.getElementById("erro-lembrete").textContent = "";
    lembreteEmEdicao = null;
    document.getElementById("titulo-dialog-lembrete").textContent = "Novo lembrete";
    document.getElementById("salvar-lembrete").textContent = "Salvar lembrete";
  });
  document.getElementById("fechar-selecao-lembrete").addEventListener("click", () => {
    document.getElementById("dialog-selecionar-lembrete").close();
  });
  document.getElementById("cancelar-selecao-lembrete").addEventListener("click", () => {
    document.getElementById("dialog-selecionar-lembrete").close();
  });
}

/* =====================================================================
   INICIALIZAÇÃO
   ===================================================================== */
document.addEventListener("DOMContentLoaded", async () => {
  iniciarAcoes();
  try {
    const {
      usuario,
      cards,
      tarefas,
      naoLidas,
      erroLembretes,
      tagsNotificacao,
      erroTagsNotificacao: erroCategorias,
    } = await carregarDados();
    usuarioAtual = usuario;
    tarefasAtuais = tarefas;
    erroTagsNotificacao = erroCategorias;
    preencherCategoriasLembrete(tagsNotificacao);
    renderCabecalho(usuario);
    renderDisciplinas(cards);
    renderTarefas(tarefas);
    if (erroLembretes) mostrarAvisoLembretes(erroLembretes);
    // atualizarNotificacoes(naoLidas);
  } catch (erro) {
    console.error(erro);
    mostrarErro();
  }
});
