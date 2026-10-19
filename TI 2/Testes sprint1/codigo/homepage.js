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
async function api(caminho) {
  const resposta = await fetch(`${API}${caminho}`);
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

  return { usuario, cards, tarefas, naoLidas: naoLidas.length };
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

function atualizarNotificacoes(qtd) {
  const el = document.getElementById("notif-contador");
  el.textContent = qtd;
  el.hidden = qtd === 0;
}

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
    lista.innerHTML = `<li class="tarefas__vazio">Nenhuma tarefa por enquanto. Use "Novo agendamento" para marcar uma monitoria.</li>`;
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
        <span class="tarefa__data"></span>
      </div>`;
    li.title = t.detalhe || "";
    li.querySelector(".tarefa__icone").textContent = ICONES[t.tipo] || "📌";
    li.querySelector(".tarefa__descricao").textContent = t.descricao;
    li.querySelector(".tarefa__data").textContent =
      `${formatarData(t.data)}${t.modalidade ? " - " + t.modalidade : ""}`;
    lista.appendChild(li);
  });
}

function mostrarErro() {
  const msg = `Não foi possível carregar os dados. Verifique se o servidor (json-server) está rodando em ${API}.`;
  document.getElementById("lista-disciplinas").innerHTML = `<p class="estado-vazio">${msg}</p>`;
  document.getElementById("lista-tarefas").innerHTML = `<li class="tarefas__vazio">${msg}</li>`;
}

/* =====================================================================
   AÇÕES RÁPIDAS (ainda provisórias)
   ===================================================================== */
const acoes = {
  "novo-agendamento":        () => alert("Abrir tela de novo agendamento"),
  "novo-lembrete":           () => alert("Abrir formulário de novo lembrete"),
  "add-evento":              () => alert("Abrir formulário de novo evento"),
  "disciplinas-disponiveis": () => alert("Ir para a lista de disciplinas disponíveis"),
};

function iniciarAcoes() {
  document.querySelectorAll(".acao").forEach(btn => {
    btn.addEventListener("click", () => acoes[btn.dataset.acao]?.());
  });
  document.getElementById("btn-notif").addEventListener("click", () => alert("Abrir painel de notificações"));
}

/* =====================================================================
   INICIALIZAÇÃO
   ===================================================================== */
document.addEventListener("DOMContentLoaded", async () => {
  iniciarAcoes();
  try {
    const { usuario, cards, tarefas, naoLidas } = await carregarDados();
    renderCabecalho(usuario);
    renderDisciplinas(cards);
    renderTarefas(tarefas);
    atualizarNotificacoes(naoLidas);
  } catch (erro) {
    console.error(erro);
    mostrarErro();
  }
});
