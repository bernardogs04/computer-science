(function (global) {
  "use strict";

  const APELIDO_MIN = 2;
  const APELIDO_MAX = 30;
  const NAO_INFORMADO = "Não informado";
  const MENSAGEM_SUCESSO = "Apelido atualizado com sucesso";
  const EVENTO_APELIDO = "perfil:apelido-atualizado";

  const CLASSES = {
    aluno: "Aluno",
    monitor: "Monitor",
    professor: "Professor",
    administrador: "Administrador",
  };

  const CARACTERES_VALIDOS = /^[\p{L}\p{M}\p{N} ._'’-]+$/u;
  const TEM_LETRA_OU_NUMERO = /[\p{L}\p{N}]/u;

  let resolvedorUsuario = function () {
    try {
      const sessao = JSON.parse(sessionStorage.getItem("usuarioCorrente"));
      if (sessao && Number(sessao.id)) return Number(sessao.id);
    } catch (e) {}
    try {
      const id = Number(localStorage.getItem("usuarioId"));
      if (id) return id;
    } catch (e) {}
    return 1;
  };

  function obterIdUsuarioLogado() {
    const id = Number(resolvedorUsuario());
    return Number.isFinite(id) && id > 0 ? id : null;
  }

  function baseApi() {
    if (typeof global.PERFIL_API_URL === "string") return global.PERFIL_API_URL;
    return global.location && global.location.port === "3000" ? "" : "http://localhost:3000";
  }

  async function requisitar(caminho, opcoes) {
    const resposta = await fetch(baseApi() + caminho, opcoes);
    if (!resposta.ok) {
      const erro = new Error("Erro HTTP " + resposta.status);
      erro.status = resposta.status;
      throw erro;
    }
    return resposta.json();
  }

  function textoOuNulo(valor) {
    if (valor === undefined || valor === null) return null;
    const texto = String(valor).trim();
    return texto === "" ? null : texto;
  }

  function primeiroNome(nome) {
    const texto = textoOuNulo(nome);
    return texto ? texto.split(/\s+/)[0] : "";
  }

  function obterIniciais(nome) {
    const partes = String(nome == null ? "" : nome).trim().split(/\s+/).filter(Boolean);
    return partes
      .slice(0, 2)
      .map((parte) => Array.from(parte)[0].toLocaleUpperCase("pt-BR"))
      .join("");
  }

  function apelidoExibicao(usuario) {
    if (!usuario) return "";
    return textoOuNulo(usuario.apelido) || primeiroNome(usuario.nome);
  }

  function nomeExibicao(usuario) {
    if (!usuario) return "";
    return textoOuNulo(usuario.apelido) || textoOuNulo(usuario.nome) || "";
  }

  function normalizarApelido(valor) {
    return String(valor == null ? "" : valor).replace(/\s+/g, " ").trim();
  }

  function validarApelido(valor) {
    const normalizado = normalizarApelido(valor);
    const tamanho = Array.from(normalizado).length;
    let mensagem = "";

    if (normalizado === "") {
      mensagem = "Digite um apelido.";
    } else if (!CARACTERES_VALIDOS.test(normalizado) || !TEM_LETRA_OU_NUMERO.test(normalizado)) {
      mensagem = "O apelido contém caracteres inválidos.";
    } else if (tamanho < APELIDO_MIN) {
      mensagem = `O apelido deve ter pelo menos ${APELIDO_MIN} caracteres.`;
    } else if (tamanho > APELIDO_MAX) {
      mensagem = `O apelido deve ter no máximo ${APELIDO_MAX} caracteres.`;
    }
    return { valido: mensagem === "", mensagem, normalizado, tamanho };
  }

  function obterClasse(usuario) {
    const bruto = textoOuNulo(usuario.cargo) || textoOuNulo(usuario.classe);
    if (!bruto) return null;
    const chave = bruto.toLocaleLowerCase("pt-BR");
    return { chave, rotulo: CLASSES[chave] || bruto.charAt(0).toLocaleUpperCase("pt-BR") + bruto.slice(1) };
  }

  function el(tag, props, ...filhos) {
    const no = document.createElement(tag);
    Object.entries(props || {}).forEach(([chave, valor]) => {
      if (valor === undefined || valor === null || valor === false) return;
      if (chave === "class") no.className = valor;
      else if (chave === "text") no.textContent = valor;
      else no.setAttribute(chave, valor === true ? "" : valor);
    });
    filhos.flat().forEach((f) => {
      if (f != null) no.append(f);
    });
    return no;
  }

  let ui = null;
  let estado = {
    usuario: null,
    proprio: false,
    idLogado: null,
    editando: false,
    salvando: false,
    disciplinas: [],
    pedido: 0,
    abertoPor: null,
    timerSucesso: null,
  };

  function construirModal() {
    if (ui) return ui;

    const titulo = el("h2", { id: "perfil-titulo", class: "perfil-titulo", text: "Meu perfil" });
    const fechar = el("button", {
      class: "perfil-fechar", type: "button", "aria-label": "Fechar perfil", text: "×",
    });

    const estadoMsg = el("p", { class: "perfil-estado", role: "status", "aria-live": "polite" });

    const avatar = el("div", { class: "perfil-avatar", "aria-hidden": "true" });
    const nomeCompleto = el("p", { class: "perfil-nome", id: "perfil-nome-completo" });
    const rotuloNome = el("span", { class: "perfil-rotulo", text: "Nome completo" });

    const apelidoTexto = el("span", { class: "perfil-apelido", id: "perfil-apelido-texto" });
    const editar = el("button", {
      class: "perfil-editar", type: "button", "aria-label": "Editar apelido", title: "Editar apelido", text: "✎",
    });
    const apelidoVisualizacao = el("div", { class: "perfil-apelido-linha" }, apelidoTexto, editar);

    const campo = el("input", {
      class: "perfil-campo", id: "perfil-apelido-campo", type: "text", autocomplete: "off",
      "aria-describedby": "perfil-contador perfil-erro", "aria-invalid": "false", spellcheck: "false",
    });
    const rotuloCampo = el("label", { class: "perfil-rotulo", for: "perfil-apelido-campo", text: "Apelido" });
    const contador = el("span", { class: "perfil-contador", id: "perfil-contador" });
    const erro = el("p", { class: "perfil-erro", id: "perfil-erro", role: "alert" });
    const salvar = el("button", { class: "perfil-btn perfil-btn--primario", type: "submit", text: "Salvar" });
    const cancelar = el("button", { class: "perfil-btn", type: "button", text: "Cancelar" });
    const formulario = el(
      "form", { class: "perfil-form", novalidate: true, autocomplete: "off" },
      rotuloCampo,
      campo,
      el("div", { class: "perfil-form-meta" }, erro, contador),
      el("div", { class: "perfil-acoes" }, cancelar, salvar),
    );

    const rotuloApelido = el("span", { class: "perfil-rotulo", text: "Apelido" });
    const blocoApelido = el("div", { class: "perfil-bloco" }, rotuloApelido, apelidoVisualizacao, formulario);

    const badge = el("span", { class: "perfil-badge" });
    const sucesso = el("p", { class: "perfil-sucesso", role: "status", "aria-live": "polite" });

    const tituloDados = el("h3", { class: "perfil-secao", text: "Dados pessoais" });
    const lista = el("dl", { class: "perfil-dados" });

    const conteudo = el(
      "div", { class: "perfil-conteudo", hidden: true },
      avatar,
      el("div", { class: "perfil-bloco" }, rotuloNome, nomeCompleto),
      blocoApelido,
      el("div", { class: "perfil-bloco" }, el("span", {class: "perfil-rotulo"}), badge),
      sucesso,
      tituloDados,
      lista,
    );

    const cartao = el(
      "div", { class: "perfil-cartao" },
      el("header", { class: "perfil-cabecalho" }, titulo, fechar),
      el("div", { class: "perfil-corpo" }, estadoMsg, conteudo),
    );

    const dialogo = el("dialog", {
      class: "perfil-dialog", id: "dialog-perfil", "aria-labelledby": "perfil-titulo",
    }, cartao);
    document.body.appendChild(dialogo);

    ui = {
      dialogo, titulo, fechar, estadoMsg, conteudo, avatar, nomeCompleto, apelidoTexto, editar,
      apelidoVisualizacao, rotuloApelido, formulario, campo, contador, erro, salvar, cancelar,
      badge, sucesso, lista, tituloDados,
    };
    ligarEventos();
    return ui;
  }

  function ligarEventos() {
    ui.fechar.addEventListener("click", fechar);

    let pressionouNoFundo = false;
    ui.dialogo.addEventListener("pointerdown", (e) => { pressionouNoFundo = e.target === ui.dialogo; });
    ui.dialogo.addEventListener("click", (e) => {
      if (e.target === ui.dialogo && pressionouNoFundo) fechar();
      pressionouNoFundo = false;
    });

    ui.dialogo.addEventListener("close", aoFechar);

    ui.editar.addEventListener("click", entrarEdicao);
    ui.cancelar.addEventListener("click", cancelarEdicao);
    ui.campo.addEventListener("input", atualizarValidacao);
    ui.formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      salvarApelido();
    });
  }

  function mostrarEstado(texto, ehErro) {
    ui.estadoMsg.textContent = texto || "";
    ui.estadoMsg.classList.toggle("perfil-estado--erro", Boolean(ehErro));
    ui.estadoMsg.hidden = !texto;
    ui.conteudo.hidden = Boolean(texto);
    ui.dialogo.setAttribute("aria-busy", texto && !ehErro ? "true" : "false");
  }

  function linha(rotulo, valor) {
    const dd = el("dd", { class: "perfil-valor" });
    if (Array.isArray(valor)) {
      if (valor.length === 0) {
        dd.textContent = NAO_INFORMADO;
        dd.classList.add("perfil-valor--vazio");
      } else {
        const ul = el("ul", { class: "perfil-chips" });
        valor.forEach((item) => ul.appendChild(el("li", { class: "perfil-chip", text: item })));
        dd.appendChild(ul);
      }
    } else {
      const texto = textoOuNulo(valor);
      dd.textContent = texto || NAO_INFORMADO;
      if (!texto || texto === NAO_INFORMADO) dd.classList.add("perfil-valor--vazio");
    }
    return [el("dt", { class: "perfil-chave", text: rotulo }), dd];
  }

  function adicionarLinhaSeTemValor(itens, rotulo, valor) {
    if (Array.isArray(valor)) {
      if (valor.length === 0) return;
    } else if (textoOuNulo(valor) == null) {
      return;
    }
    itens.push(...linha(rotulo, valor));
  }

  function renderizar() {
    const { usuario, proprio } = estado;

    ui.titulo.textContent = proprio ? "Meu perfil" : "Perfil";

    const nome = textoOuNulo(usuario.nome);
    ui.avatar.textContent = obterIniciais(nome) || "?";
    ui.avatar.classList.toggle("perfil-avatar--neutro", !nome);
    ui.nomeCompleto.textContent = nome || NAO_INFORMADO;

    renderizarApelido();

    const classe = obterClasse(usuario);
    ui.badge.textContent = classe ? classe.rotulo : NAO_INFORMADO;
    ui.badge.className = "perfil-badge" + (classe && CLASSES[classe.chave] ? ` perfil-badge--${classe.chave}` : " perfil-badge--neutro");

    const itens = [];
    if (proprio) {
      adicionarLinhaSeTemValor(itens, "E-mail institucional:", usuario.email);
      adicionarLinhaSeTemValor(itens, "Matrícula:", usuario.matricula);
    }
    adicionarLinhaSeTemValor(itens, "Curso:", usuario.curso);
    adicionarLinhaSeTemValor(itens, "Campus:", usuario.campus);
    adicionarLinhaSeTemValor(itens, "Disciplinas cursadas:", estado.disciplinas);
    adicionarLinhaSeTemValor(itens, "Disciplinas ensinadas:", estado.disciplinasEnsinadas);

    ui.lista.replaceChildren(...itens);
  }

  function renderizarApelido() {
    const { proprio, editando } = estado;
    const exibicao = apelidoExibicao(estado.usuario);

    ui.apelidoTexto.textContent = exibicao || NAO_INFORMADO;
    ui.editar.hidden = !proprio;
    ui.apelidoVisualizacao.hidden = editando;
    ui.rotuloApelido.hidden = editando;
    ui.formulario.hidden = !(proprio && editando);
    ui.campo.disabled = !proprio;
  }

  function entrarEdicao() {
    if (!estado.proprio || estado.salvando) return;
    limparSucesso();
    estado.editando = true;
    ui.campo.value = apelidoExibicao(estado.usuario);
    renderizarApelido();
    atualizarValidacao();
    ui.campo.focus();
    ui.campo.select();
  }

  function sairEdicao(devolverFoco) {
    estado.editando = false;
    estado.salvando = false;
    ui.campo.value = "";
    ui.erro.textContent = "";
    renderizarApelido();
    if (devolverFoco && !ui.editar.hidden) ui.editar.focus();
  }

  function cancelarEdicao() {
    if (estado.salvando) return;
    sairEdicao(true);
  }

  function atualizarValidacao() {
    const resultado = validarApelido(ui.campo.value);
    ui.contador.textContent = `${resultado.tamanho}/${APELIDO_MAX}`;
    ui.contador.classList.toggle("perfil-contador--excedido", resultado.tamanho > APELIDO_MAX);
    ui.erro.textContent = resultado.mensagem;
    ui.campo.setAttribute("aria-invalid", String(!resultado.valido));
    ui.campo.classList.toggle("perfil-campo--invalido", !resultado.valido);
    ui.salvar.disabled = !resultado.valido || estado.salvando;
    return resultado;
  }

  function mostrarSucesso(texto) {
    limparSucesso();
    ui.sucesso.textContent = texto;
    estado.timerSucesso = setTimeout(limparSucesso, 6000);
  }

  function limparSucesso() {
    clearTimeout(estado.timerSucesso);
    estado.timerSucesso = null;
    if (ui) ui.sucesso.textContent = "";
  }

  async function salvarApelido() {
    if (!estado.proprio || estado.salvando) return;

    const resultado = atualizarValidacao();
    if (!resultado.valido) {
      ui.campo.focus();
      return;
    }

    const idAlvo = Number(estado.usuario.id);
    if (idAlvo !== Number(estado.idLogado)) return;

    estado.salvando = true;
    ui.salvar.disabled = true;
    ui.cancelar.disabled = true;
    ui.campo.readOnly = true;
    ui.salvar.textContent = "Salvando...";
    ui.formulario.setAttribute("aria-busy", "true");
    ui.erro.textContent = "";

    try {
      const atualizado = await requisitar(`/usuarios/${encodeURIComponent(idAlvo)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apelido: resultado.normalizado }),
      });

      if (textoOuNulo(atualizado && atualizado.apelido) !== resultado.normalizado) {
        throw new Error("Resposta do servidor não confirma o apelido gravado.");
      }

      estado.usuario.apelido = atualizado.apelido;
      estado.salvando = false;
      sairEdicao(true);
      mostrarSucesso(MENSAGEM_SUCESSO);
      anunciarApelido(estado.usuario.id, atualizado.apelido);
    } catch (e) {
      console.error("Não foi possível salvar o apelido:", e.message || e);
      estado.salvando = false;
      ui.erro.textContent = "Não foi possível salvar o apelido. Verifique se o servidor está ativo e tente novamente.";
      ui.cancelar.disabled = false;
      ui.campo.readOnly = false;
      ui.campo.focus();
    } finally {
      ui.salvar.textContent = "Salvar";
      ui.cancelar.disabled = false;
      ui.campo.readOnly = false;
      ui.formulario.removeAttribute("aria-busy");
      if (estado.editando) ui.salvar.disabled = !validarApelido(ui.campo.value).valido;
    }
  }

  let canal = null;
  try {
    if (typeof BroadcastChannel === "function") {
      canal = new BroadcastChannel("mentora-perfil");
      canal.addEventListener("message", (m) => {
        if (m.data && m.data.tipo === EVENTO_APELIDO) {
          document.dispatchEvent(new CustomEvent(EVENTO_APELIDO, { detail: m.data.detalhe }));
        }
      });
    }
  } catch (e) { canal = null; }

  function anunciarApelido(id, apelido) {
    const detalhe = { id: Number(id), apelido };
    document.dispatchEvent(new CustomEvent(EVENTO_APELIDO, { detail: detalhe }));
    if (canal) canal.postMessage({ tipo: EVENTO_APELIDO, detalhe });
  }

  function listaDisciplinas(valor) {
    const itens = Array.isArray(valor) ? valor : typeof valor === "string" ? valor.split(",") : [];
    return itens.map(textoOuNulo).filter(Boolean);
  }

  function listarDisciplinasDeCampo(valor) {
    const codigos = listaDisciplinas(valor);
    return [...new Set(codigos.map((item) => String(item).trim()).filter(Boolean))];
  }

  async function carregarDisciplinasDeCampo(valor, usuario) {
    let codigos = listarDisciplinasDeCampo(valor);
    const classe = obterClasse(usuario);

    try {
      if (codigos.length === 0 && classe && classe.chave === "monitor") {
        const monitorias = await requisitar(`/monitorias?id_monitor=${encodeURIComponent(usuario.id)}`);
        codigos = monitorias.map((m) => textoOuNulo(m.codigo_disciplina)).filter(Boolean);
      }
      if (codigos.length === 0) return [];
      const todas = await requisitar("/disciplinas");
      const porCodigo = new Map(todas.map((d) => [String(d.codigo), d.nome]));
      return [...new Set(codigos)].map((codigo) => {
        const nome = textoOuNulo(porCodigo.get(codigo));
        return nome ? `${codigo} — ${nome}` : codigo;
      });
    } catch (e) {
      return [...new Set(codigos)];
    }
  }

  async function abrir(idUsuario, opcoes) {
    construirModal();
    const pedido = ++estado.pedido;
    const idAlvo = Number(idUsuario);
    const idLogado = Number((opcoes && opcoes.idLogado) ?? obterIdUsuarioLogado()) || null;

    if (!ui.dialogo.open) {
      estado.abertoPor = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      estado.usuario = null;
      ui.conteudo.hidden = true;
      ui.titulo.textContent = idAlvo && idAlvo === idLogado ? "Meu perfil" : "Perfil";
      ui.dialogo.showModal();
    }
    estado.editando = false;
    estado.salvando = false;
    limparSucesso();

    if (!idAlvo) {
      mostrarEstado("Não foi possível identificar o usuário deste perfil.", true);
      return;
    }
    mostrarEstado("Carregando perfil...", false);

    try {
      const bruto = await requisitar(`/usuarios/${encodeURIComponent(idAlvo)}`);
      if (pedido !== estado.pedido) return;

      const proprio = Number(bruto.id) === idLogado;
      const { email, matricula, senha, ...publico } = bruto;
      estado.usuario = proprio ? (({ senha: _s, ...resto }) => resto)(bruto) : publico;
      estado.proprio = proprio;
      estado.idLogado = idLogado;

      const campoCursadas = estado.usuario.disciplinasCursadas ?? estado.usuario.disciplinas;
      const campoEnsinadas = estado.usuario.disciplinasEnsinadas ?? estado.usuario.disciplinas;

      estado.disciplinas = await carregarDisciplinasDeCampo(campoCursadas, estado.usuario);
      estado.disciplinasEnsinadas = await carregarDisciplinasDeCampo(campoEnsinadas, estado.usuario);
      if (pedido !== estado.pedido) return;

      mostrarEstado("", false);
      renderizar();
    } catch (e) {
      if (pedido !== estado.pedido) return;
      console.error("Não foi possível carregar o perfil:", e.message || e);
      estado.usuario = null;
      mostrarEstado(
        e.status === 404
          ? "Usuário não encontrado."
          : "Não foi possível carregar o perfil. Verifique se o servidor está ativo e tente novamente.",
        true,
      );
    }
  }

  function fechar() {
    if (ui && ui.dialogo.open) ui.dialogo.close();
  }

  function aoFechar() {
    estado.pedido++;
    estado.editando = false;
    estado.salvando = false;
    estado.usuario = null;
    estado.disciplinas = [];
    estado.disciplinasEnsinadas = [];
    limparSucesso();
    ui.campo.value = "";
    ui.erro.textContent = "";
    ui.conteudo.hidden = true;
    ui.lista.replaceChildren();
    const origem = estado.abertoPor;
    estado.abertoPor = null;
    if (origem && document.contains(origem)) origem.focus();
  }

  function aoAcionar(gatilho) {
    const valor = String(gatilho.getAttribute("data-perfil-usuario") || "").trim();
    const id = valor === "proprio" ? obterIdUsuarioLogado() : Number(valor);
    abrir(id, { idLogado: obterIdUsuarioLogado() });
  }

  document.addEventListener("click", (e) => {
    const gatilho = e.target instanceof Element ? e.target.closest("[data-perfil-usuario]") : null;
    if (!gatilho) return;
    e.preventDefault();
    aoAcionar(gatilho);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const gatilho = e.target instanceof Element ? e.target.closest("[data-perfil-usuario]") : null;
    if (!gatilho || gatilho.matches("button, a[href], input, select, textarea")) return;
    e.preventDefault();
    aoAcionar(gatilho);
  });

  global.Perfil = {
    abrir,
    fechar,
    obterIdUsuarioLogado,
    definirResolvedorUsuario(funcao) {
      if (typeof funcao === "function") resolvedorUsuario = funcao;
    },
    obterIniciais,
    apelidoExibicao,
    nomeExibicao,
    validarApelido,
    EVENTO_APELIDO,
  };
})(window);
