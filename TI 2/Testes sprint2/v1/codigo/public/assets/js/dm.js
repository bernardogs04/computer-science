const chat = document.querySelector(".chat");
const formularioChat = document.querySelector(".chatinput");
const campoMensagem = document.querySelector("#message");
const LIMITE_MENSAGEM = 400; // define limite de caracteres para mensagens longas. quantidade > limite mostra botão "mostrar mais" para expandir a mensagem.
const API_URL = "";
let chatAtual = null;
let destinatarioAtual = null;
let assinaturaMensagens = "";
let perfilContatoCarregado = null;

function obterIdUsuarioLogado() { // obtem o id do usuário logado para alterar a perspectiva.
	try {
		const usuario = JSON.parse(sessionStorage.getItem("usuarioCorrente"));
		return Number(usuario?.id) || null;
	} catch {
		return null;
	}
}

function aplicarPerspectiva() { // altera a visão para usuário logado  (destinatário ou remetente)
	const idUsuarioLogado = obterIdUsuarioLogado();
	if (!idUsuarioLogado) {
		return;
	}

	document.querySelectorAll(".message[data-remetente-id]").forEach((mensagem) => {
		const foiEnviada = Number(mensagem.dataset.remetenteId) === idUsuarioLogado;
		mensagem.classList.toggle("message-sent", foiEnviada);
		mensagem.classList.toggle("message-received", !foiEnviada);
	});
}

function formatarHorario(dataHora) {
	// formata a data e hora para exibição
	const data = new Date(dataHora);
	if (Number.isNaN(data.getTime())) {
		return "--:--";
	}

	return new Intl.DateTimeFormat("pt-BR", {
		hour: "2-digit",
		minute: "2-digit"
	}).format(data);
}

function obterIniciais(nome) { // aplica as iniciais para o avatar
	return nome
		.split(" ")
	.filter(Boolean)
	.slice(0, 2)
	.map((parte) => parte[0].toUpperCase())
	.join("");
}

function formatarCargo(cargo) {
	if (!cargo) {
		return "Usuário";
	}

	return cargo.charAt(0).toUpperCase() + cargo.slice(1);
}

async function carregarPerfilContato() { // informa os contatos do usuário logado
	if (!destinatarioAtual) {
		return;
	}

	const resposta = await fetch(`${API_URL}/usuarios/${destinatarioAtual}`);
	if (!resposta.ok) {
		throw new Error(`Falha ao carregar contato (${resposta.status}).`);
	}

	const contato = await resposta.json();
	const nome = contato.nome || "Usuário";
	const cargo = formatarCargo(contato.cargo);
	const iniciais = obterIniciais(nome);

	// o contato é exibido pelo apelido, quando ele tiver definido um; senão, pelo nome completo
	const nomeExibido = window.Perfil ? Perfil.nomeExibicao(contato) || nome : nome;

	document.querySelector(".chat-title h1").textContent = nomeExibido;
	document.querySelector(".chat-title p").textContent = cargo;
	document.querySelector(".chat-avatar").textContent = iniciais;
	document.querySelector(".usrinfo h2").textContent = nomeExibido;
	document.querySelector(".usrinfo p").textContent = cargo;
	document.querySelector(".usrimg").textContent = iniciais;
	document.querySelector(".contact-copy p:nth-child(1) span").textContent = contato.email || "Não informado";
	document.querySelector(".contact-copy p:nth-child(2) span").textContent = contato.telefone || "Não informado";
	document.querySelector(".next-class-value").textContent = `Acompanhamento com ${nomeExibido}`;
	document.querySelector(".next-class-meta").textContent = `Contato vinculado ao usuário ${contato.id}`;

	// aponta os gatilhos de perfil do chat para o contato atual (o pop-up em si fica em perfil.js)
	document.querySelectorAll("[data-perfil-contato]").forEach((gatilho) => {
		gatilho.setAttribute("data-perfil-usuario", String(contato.id));
	});
}

// Apelido do contato alterado (nesta aba ou em outra): recarrega o cabeçalho na próxima verificação.
document.addEventListener("perfil:apelido-atualizado", (evento) => {
	if (evento.detail && Number(evento.detail.id) === destinatarioAtual) {
		perfilContatoCarregado = null;
	}
});

function toggle(elemento) {  // toggle element para o i de informações do chat e mostrar mais/menos das mensagens
	if (!elemento) {
		return;
	}

	elemento.open = !elemento.open; //abre o elemento se estiver fechado e fecha se estiver aberto
}

function abrirPopup(popup) { //exibição do popup
	if (!popup) {
		return;
	}

	popup.style.display = "flex";
	popup.setAttribute("aria-hidden", "false");
}

function fecharPopup(popup) {  //fechamento do popup
	if (!popup) {
		return;
	}

	popup.style.display = "none";
	popup.setAttribute("aria-hidden", "true");
}

function configurarToggleMensagem(mensagem) {
	const bolha = mensagem.querySelector(".message-bubble");
	const conteudo = bolha?.querySelector("p");
	if (!conteudo || conteudo.textContent.length <= LIMITE_MENSAGEM) {
		return;
	}

	const textoCompleto = conteudo.textContent;
	const textoResumido = `${textoCompleto.slice(0, LIMITE_MENSAGEM).trimEnd()}...`;
	const botaoToggle = document.createElement("button");

	conteudo.textContent = textoResumido;
	botaoToggle.className = "message-toggle";
	botaoToggle.type = "button";
	botaoToggle.textContent = "Mostrar mais";
	botaoToggle.setAttribute("aria-expanded", "false");

	botaoToggle.addEventListener("click", () => {
		const expandida = botaoToggle.getAttribute("aria-expanded") === "true";
		conteudo.textContent = expandida ? textoResumido : textoCompleto;
		botaoToggle.textContent = expandida ? "Mostrar mais" : "Mostrar menos";
		botaoToggle.setAttribute("aria-expanded", String(!expandida));
	});

	bolha.appendChild(botaoToggle);
}

function configurarMensagensLongas() {
	document.querySelectorAll(".message").forEach(configurarToggleMensagem);
}

function configurarToggleInformacoes() {
	const controle = document.querySelector(".info-toggle");
	const painel = document.getElementById("conversation-info");
	if (!controle || !painel) {
		return;
	}

	const sincronizarEstado = () => {
		const aberto = painel.open;
		controle.setAttribute("aria-expanded", String(aberto));
		controle.setAttribute("aria-label", `${aberto ? "Ocultar" : "Mostrar"} informações da conversa`);
	};

	controle.addEventListener("click", () => {
		painel.open = !painel.open;
		sincronizarEstado();
	});
	painel.addEventListener("toggle", sincronizarEstado);
	sincronizarEstado();
}

function criarMensagem(texto, dados = {}) { //criação de uma nova mensagem
	const mensagem = document.createElement("article");
	const idRemetente = Number(dados.id_remetente || obterIdUsuarioLogado() || 1);
	const foiEnviada = idRemetente === obterIdUsuarioLogado();
	mensagem.className = `message ${foiEnviada ? "message-sent" : "message-received"}`;
	mensagem.dataset.remetenteId = String(idRemetente);

	const bolha = document.createElement("div");
	bolha.className = "message-bubble";

	const conteudo = document.createElement("p");
	conteudo.textContent = texto;
	bolha.appendChild(conteudo);

	const horario = document.createElement("time");
	horario.dateTime = dados.data_hora || new Date().toISOString();
	horario.textContent = formatarHorario(horario.dateTime);

	const metadados = document.createElement("div");
	metadados.className = "message-meta";
	metadados.appendChild(horario);
	if (foiEnviada) {
		const status = document.createElement("span");
		status.className = "message-status";
		status.textContent = dados.status || "Enviada";
		metadados.appendChild(status);
	}

	mensagem.append(bolha, metadados);
	configurarToggleMensagem(mensagem);
	return mensagem;
}

async function enviarMensagem(evento) { // método para o envio de mensagens, que envia para o backend e atualiza a tela.
	evento.preventDefault();

	const texto = campoMensagem.value.trim();
	if (!texto) {
		campoMensagem.focus();
		return;
	}

	const idRemetente = obterIdUsuarioLogado();
	if (!chatAtual || !destinatarioAtual || !idRemetente) {
		console.error("Não foi possível identificar o chat ou o usuário logado.");
		return;
	}

	try {
		const resposta = await fetch(`${API_URL}/mensagens`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id_chat: chatAtual.id,
				id_remetente: idRemetente,
				id_destinatario: destinatarioAtual,
				texto,
				tag: null,
				resposta_de: null,
				data_hora: new Date().toISOString(),
				status: "Enviada"
			})
		});

		if (!resposta.ok) {
			throw new Error(`Falha ao salvar mensagem (${resposta.status}).`);
		}

		chat.appendChild(criarMensagem(texto, await resposta.json()));
		campoMensagem.value = "";
		chat.scrollTop = chat.scrollHeight;
		campoMensagem.focus();
	} catch (erro) {
		console.error("Erro ao salvar mensagem:", erro);
	}
}

async function carregarMensagens() { // método para carregar as mensagens do backend e atualizar a tela.
	const idUsuarioLogado = obterIdUsuarioLogado();
	if (!idUsuarioLogado) {
		console.error("Não foi possível identificar o usuário logado.");
		return;
	}

	try {
		const respostaChats = await fetch(`${API_URL}/chats`);
		const chats = await respostaChats.json();
		chatAtual = chats.find((item) =>
			Number(item.id_usuario_1) === idUsuarioLogado || Number(item.id_usuario_2) === idUsuarioLogado
		);

		if (!chatAtual) {
			throw new Error("Nenhum chat encontrado para o usuário logado.");
		}

		destinatarioAtual = Number(chatAtual.id_usuario_1) === idUsuarioLogado
			? Number(chatAtual.id_usuario_2)
			: Number(chatAtual.id_usuario_1);
		if (perfilContatoCarregado !== destinatarioAtual) {
			await carregarPerfilContato();
			perfilContatoCarregado = destinatarioAtual;
		}

		const respostaMensagens = await fetch(`${API_URL}/mensagens?id_chat=${chatAtual.id}&_sort=data_hora&_order=asc`);
		const mensagens = await respostaMensagens.json();
		mensagens.sort((mensagemA, mensagemB) => {
			const dataA = Date.parse(mensagemA.data_hora);
			const dataB = Date.parse(mensagemB.data_hora);
			const dataInvalidaA = Number.isNaN(dataA);
			const dataInvalidaB = Number.isNaN(dataB);

			if (dataInvalidaA || dataInvalidaB) {
				if (dataInvalidaA !== dataInvalidaB) {
					return dataInvalidaA ? -1 : 1;
				}

				return Number(mensagemA.id) - Number(mensagemB.id);
			}

			return dataA - dataB;
		});
		const novaAssinatura = mensagens.map((mensagem) =>
			`${mensagem.id}:${mensagem.status}:${mensagem.texto}`
		).join("|");
		if (novaAssinatura === assinaturaMensagens) {
			return;
		}

		assinaturaMensagens = novaAssinatura;
		chat.querySelectorAll(".message").forEach((mensagem) => mensagem.remove());
		mensagens.forEach((mensagem) => chat.appendChild(criarMensagem(mensagem.texto, mensagem)));
		chat.scrollTop = chat.scrollHeight;
	} catch (erro) {
		console.error("Erro ao carregar mensagens:", erro);
	}
}

function configurarPopups() { // configuração de popups para FAQ e informações do chat
	document.querySelectorAll(".faq-popup").forEach((popup) => {
		popup.setAttribute("aria-hidden", "true");

		popup.addEventListener("click", (evento) => {
			if (evento.target === popup) {
				const controle = popup.previousElementSibling?.previousElementSibling;
				if (controle?.matches(".faq-toggle")) {
					controle.checked = false;
				}
				fecharPopup(popup);
			}
		});
	});

	document.querySelectorAll(".faq-toggle").forEach((controle) => {
		controle.addEventListener("change", () => {
			const popup = controle.nextElementSibling?.nextElementSibling;
			if (controle.checked) {
				abrirPopup(popup);
			} else {
				fecharPopup(popup);
			}
		});
	});

	document.querySelectorAll(".faq-close").forEach((botao) => {
		botao.addEventListener("click", (evento) => {
			evento.preventDefault();
			const controle = document.getElementById(botao.htmlFor);
			if (controle) {
				controle.checked = false;
				fecharPopup(controle.nextElementSibling?.nextElementSibling);
			}
		});
	});
}

if (formularioChat && campoMensagem && chat) { // adiciona o evento de envio de mensagem ao formulário
	formularioChat.addEventListener("submit", enviarMensagem);
}

configurarPopups();
configurarMensagensLongas();
configurarToggleInformacoes();
aplicarPerspectiva();
carregarMensagens();
setInterval(carregarMensagens, 2000);
