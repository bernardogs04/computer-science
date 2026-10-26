document.addEventListener("DOMContentLoaded", () => {
    carregarEventos();
    configurarPopUp();
});

let idEventoEditando = null;
const API_EVENTOS = "http://localhost:3000/eventos";

function configurarPopUp() {
    const popUp = document.getElementById("PopUp");
    const btnAbrir = document.getElementById("btn-adicionar-evento");
    const btnFechar = document.getElementById("btn-fechar-PopUp");
    const btnCancelar = document.getElementById("btn-cancelar");
    const form = document.getElementById("form-novo-evento");

    if (btnAbrir) {
        
        btnAbrir.addEventListener("click", () => {
            popUp.style.display = "flex";
            const tituloPopUp = document.querySelector(".PopUp-header h3");
            if (tituloPopUp) tituloPopUp.textContent = "Novo Evento";
            idEventoEditando = null;
        });
    }

    const fecharPopUp = () => {
        
        popUp.style.display = "none";
        form.reset();
        idEventoEditando = null;
        const tituloPopUp = document.querySelector(".PopUp-header h3");
        if (tituloPopUp) tituloPopUp.textContent = "Novo Evento";
    };

    if (btnFechar) btnFechar.addEventListener("click", fecharPopUp);
    if (btnCancelar) btnCancelar.addEventListener("click", fecharPopUp);

    window.addEventListener("click", (e) => {
        if (e.target === popUp) {
            fecharPopUp();
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const titulo = document.getElementById("input-titulo").value;
        const mensagem = document.getElementById("input-mensagem").value;
        const dataInput = document.getElementById("input-data").value;

        const dataHoraISO = new Date(dataInput).toISOString();

        const dadosEvento = {
            id_usuario: 1,
            titulo: titulo,
            mensagem: mensagem,
            data_hora: dataHoraISO,
            tag: "aviso"
        };

        try {

            let resposta;

            if (idEventoEditando) {

                resposta = await fetch(`${API_EVENTOS}/${idEventoEditando}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dadosEvento)
                });
            } else {

                resposta = await fetch(API_EVENTOS, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dadosEvento)
                });
            }

            if (!resposta.ok) {
                throw new Error("Erro ao cadastrar evento.");
            }

            fecharPopUp();
            carregarEventos();
        } catch (erro) {
            console.error("Erro ao salvar:", erro);
            alert("Não foi possível salvar o evento.");
        }
    });
}

async function carregarEventos() {
    const container = document.getElementById("eventos-container");

    try {
        const resposta = await fetch(API_EVENTOS);

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const eventos = await resposta.json();
        container.innerHTML = "";

        if (eventos.length === 0) {
            container.innerHTML = "<p>Nenhum evento encontrado.</p>";
            return;
        }

        eventos.forEach(evento => {
            const card = document.createElement("div");
            card.classList.add("card-evento");

            const dataObj = new Date(evento.data_hora);
            const dataFormatada = dataObj.toLocaleDateString("pt-BR");
            const horaFormatada = dataObj.toLocaleTimeString("pt-BR", {
                hour: '2-digit',
                minute: '2-digit'
            });

            card.innerHTML = `
                <div class="card-header">
                    <div class="titulo-area">
                        <h3>${evento.titulo}</h3>
                        <span class="data-evento">${dataFormatada} ${horaFormatada ? 'às ' + horaFormatada : ''}</span>
                    </div>
                    <div class="acoes-card">
                        <button type="button" class="btn-editar" data-id="${evento.id}" title="Editar evento">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button type="button" class="btn-deletar" data-id="${evento.id}" title="Deletar evento">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
                <p class="descricao-evento">${evento.mensagem}</p>
            `;

            container.appendChild(card);
        });

        document.querySelectorAll(".btn-deletar").forEach(botao => {
            botao.addEventListener("click", (e) => {
                const id = e.currentTarget.getAttribute("data-id");
                deletarEvento(id);
            });
        });

        document.querySelectorAll(".btn-editar").forEach(botao => {
            botao.addEventListener("click", async (e) => {
                const id = e.currentTarget.getAttribute("data-id");
                await abrirEdicaoEvento(id);
            });
        });

    } catch (erro) {
        console.error("Erro ao carregar eventos:", erro);
        container.innerHTML = "<p>Erro ao carregar os eventos. Verifique se o JSON Server está rodando.</p>";
    }
}

async function abrirEdicaoEvento(id) {
    try {
        const resposta = await fetch(`${API_EVENTOS}/${id}`);
        if (!resposta.ok) throw new Error("Erro ao buscar dados do evento.");
        const evento = await resposta.json();

        document.getElementById("input-titulo").value = evento.titulo;
        document.getElementById("input-mensagem").value = evento.mensagem;

        if (evento.data_hora) {
            const dataLocal = new Date(evento.data_hora).toISOString().slice(0, 16);
            document.getElementById("input-data").value = dataLocal;
        }

        idEventoEditando = id;

        const tituloPopUp = document.querySelector(".PopUp-header h3");
        if (tituloPopUp) tituloPopUp.textContent = "Editar Evento";

        const popUp = document.getElementById("PopUp");
        if (popUp) popUp.style.display = "flex";


    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar os dados para edição.");
    }
}

async function deletarEvento(id) {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;

    try {
        const resposta = await fetch(`${API_EVENTOS}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao deletar o evento.");
        }

        carregarEventos();
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível excluir o evento.");
    }
}