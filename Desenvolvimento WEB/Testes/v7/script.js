const data = {
  produtos: [
    // ===== PRATOS PRINCIPAIS =====
    {
      id: 1,
      nome: "Picanha na Chapa",
      preco: 89.9,
      categoria: "Pratos Principais",
      imagem: "images/picanha-na-chapa.jpg",
      ingredientes: ["Picanha", "Arroz", "Farofa", "Vinagrete"],
      removiveis: ["Arroz", "Farofa", "Vinagrete"],
      extras: [
        { nome: "Ovo frito", preco: 3.0 },
        { nome: "Farofa extra", preco: 6.0 },
        { nome: "Molho chimichurri", preco: 2.5 },
        { nome: "Queijo coalho", preco: 10.0 },
        { nome: "Batata frita", preco: 15.0 }
      ],
      descricao: "Picanha suculenta grelhada no ponto certo, acompanhada de arroz, farofa e vinagrete.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Ancho Grelhado",
      preco: 84.9,
      categoria: "Pratos Principais",
      imagem: "images/ancho-grelhado.jpg",
      ingredientes: ["Ancho", "Batatas Rústicas"],
      removiveis: ["Batatas Rústicas"],
      extras: [
        { nome: "Molho chimichurri", preco: 2.5 },
        { nome: "Queijo coalho", preco: 10.0 },
        { nome: "Batata frita", preco: 15.0 }
      ],
      descricao: "Corte macio e marmorizado, grelhado na brasa e servido com batatas rústicas.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Costela Assada",
      preco: 79.9,
      categoria: "Pratos Principais",
      imagem: "images/costela-assada.jpg",
      ingredientes: ["Costela", "Mandioca Cozida", "Molho Especial"],
      removiveis: ["Mandioca Cozida", "Molho Especial"],
      extras: [
        { nome: "Molho chimichurri", preco: 2.5 },
        { nome: "Queijo coalho", preco: 10.0 },
        { nome: "Batata frita", preco: 15.0 }
      ],
      descricao: "Costela assada lentamente até desmanchar, servida com mandioca cozida e molho especial.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "Fraldinha com Alho",
      preco: 74.9,
      categoria: "Pratos Principais",
      imagem: "images/fraldinha-com-alho.jpg",
      ingredientes: ["Fraldinha", "Arroz", "Salada"],
      removiveis: ["Arroz", "Salada"],
      extras: [
        { nome: "Molho chimichurri", preco: 2.5 },
        { nome: "Queijo coalho", preco: 10.0 },
        { nome: "Batata frita", preco: 15.0 }
      ],
      descricao: "Fraldinha grelhada com alho dourado, acompanhada de arroz e salada.",
      emEstoque: true
    },

    // ===== LANCHES =====
    {
      id: 5,
      nome: "Burger Parada Dura",
      preco: 36.9,
      categoria: "Lanches",
      imagem: "images/burger-parada-dura.jpg",
      ingredientes: ["Hambúrguer de carne bovina", "Queijo derretido", "Cebola caramelizada", "Molho da casa"],
      removiveis: ["Queijo derretido", "Cebola caramelizada", "Molho da casa"],
      extras: [
        { nome: "Ovo frito", preco: 3.0 },
        { nome: "Bacon", preco: 6.0 },
        { nome: "Queijo derretido extra", preco: 2.0 },
        { nome: "Molho da casa extra", preco: 3.0 }
      ],
      descricao: "Hambúrguer de carne bovina, queijo derretido, cebola caramelizada e molho da casa no pão macio.",
      emEstoque: true,
      opcoesProduto: ["Mal passado", "Ao ponto", "Bem passado"]
    },
    {
      id: 6,
      nome: "Sanduíche de Picanha",
      preco: 42.9,
      categoria: "Lanches",
      imagem: "images/sanduiche-de-picanha.jpg",
      ingredientes: ["Picanha", "Queijo", "Rúcula", "Maionese Defumada"],
      removiveis: ["Queijo", "Rúcula", "Maionese Defumada"],
      extras: [
        { nome: "Ovo frito", preco: 3.0 },
        { nome: "Bacon", preco: 6.0 },
        { nome: "Queijo extra", preco: 2.0 },
        { nome: "Maionese Defumada extra", preco: 3.0 }
      ],
      descricao: "Fatias de picanha grelhada, queijo, rúcula e maionese defumada.",
      emEstoque: true,
      opcoesProduto: ["Mal passado", "Ao ponto", "Bem passado"]
    },
    {
      id: 7,
      nome: "Sanduíche de Costela Desfiada",
      preco: 39.9,
      categoria: "Lanches",
      imagem: "images/sanduiche-de-costela.jpg",
      ingredientes: ["Costela", "Cheddar", "Cebola Crispy", "Pão de Brioche"],
      removiveis: ["Cheddar", "Cebola Crispy"],
      extras: [
        { nome: "Ovo frito", preco: 3.0 },
        { nome: "Bacon", preco: 6.0 },
        { nome: "Cheddar extra", preco: 5.0 },
        { nome: "Molho da casa", preco: 3.0 }
      ],
      descricao: "Costela desfiada e macia, cheddar cremoso e cebola crispy no pão de brioche.",
      emEstoque: true,      
      opcoesProduto: ["Mal passado", "Ao ponto", "Bem passado"]

    },

    // ===== SOBREMESAS =====
    {
      id: 8,
      nome: "Petit Gâteau",
      preco: 24.9,
      categoria: "Sobremesas",
      imagem: "images/petit-gateau.jpg",
      ingredientes: ["Chocolate", "Creme"],
      removiveis: [],
      extras: [
        { nome: "Bola de sorvete extra", preco: 6.0 },
        { nome: "Calda extra", preco: 3.0 },
        { nome: "Chantilly", preco: 4.0 }
      ],
      descricao: "Bolinho de chocolate com centro cremoso, servido com sorvete.",
      emEstoque: true,
      opcoesProduto: ["Sorvete de Creme", "Sorvete de Chocolate", "Sorvete de Morango"]
    },
    {
      id: 9,
      nome: "Pudim de Leite",
      preco: 16.9,
      categoria: "Sobremesas",
      imagem: "images/pudim-de-leite.jpg",
      ingredientes: ["Leite", "Creme"],
      removiveis: [],
      extras: [
        { nome: "Chantilly", preco: 4.0 }
      ],
      descricao: "Pudim tradicional, cremoso e com calda de caramelo.",
      emEstoque: true,
    },
    {
      id: 10,
      nome: "Brownie com Sorvete",
      preco: 22.9,
      categoria: "Sobremesas",
      imagem: "images/brownie-com-sorvete.jpg",
      ingredientes: ["Chocolate", "Sorvete", "Calda de Chocolate"],
      removiveis: [],
      extras: [
        { nome: "Bola de sorvete extra", preco: 6.0 },
        { nome: "Calda extra", preco: 3.0 },
        { nome: "Chantilly", preco: 4.0 }
      ],
      descricao: "Brownie de chocolate quentinho com bola de sorvete e calda de chocolate.",
      emEstoque: true,
      opcoesProduto: ["Sorvete de Creme", "Sorvete de Chocolate", "Sorvete de Morango"]
    },

    // ===== BEBIDAS =====
    {
      id: 11,
      nome: "Refrigerante Lata",
      preco: 7.5,
      categoria: "Bebidas",
      imagem: "images/refrigerante-lata.jpg",
      ingredientes: [],
      removiveis: [],
      extras: [
        { nome: "Limão", preco: 0 },
        { nome: "Gelo", preco: 0 }
      ],
      descricao: "Lata 350 ml, diversos sabores, servida gelada.",
      emEstoque: true,
      opcoesProduto: ["Coca-Cola", "Guaraná", "Fanta Laranja", "Fanta Uva", "Sprite", "Pepsi"]
    },
    {
      id: 12,
      nome: "Suco Natural",
      preco: 12.0,
      categoria: "Bebidas",
      imagem: "images/suco-natural.jpg",
      ingredientes: ["Frutas Frescas"],
      removiveis: [],
      extras: [
        { nome: "Limão", preco: 0 },
        { nome: "Gelo", preco: 0 }
      ],
      descricao: "Suco feito na hora com frutas frescas. Pergunte pelos sabores do dia.",
      emEstoque: true,
      opcoesProduto: ["Laranja", "Abacaxi", "Manga", "Morango", "Maracujá", "Uva"]
    },
    {
      id: 13,
      nome: "Cerveja Long Neck",
      preco: 12.9,
      categoria: "Bebidas",
      imagem: "images/cerveja-long-neck.jpg",
      ingredientes: [],
      removiveis: [],
      extras: [
        { nome: "Limão", preco: 0 },
        { nome: "Gelo", preco: 0 }
      ],
      descricao: "Long neck 330 ml, estupidamente gelada, ideal para acompanhar a carne.",
      emEstoque: true,
      opcoesProduto: ["Heineken", "Budweiser", "Stella Artois", "Eisenbahn", "Brahma", "Skol"]
    },
    {
      id: 14,
      nome: "Água Mineral",
      preco: 5.0,
      categoria: "Bebidas",
      imagem: "images/agua-mineral.jpg",
      ingredientes: [],
      removiveis: [],
      extras: [
        { nome: "Limão", preco: 0 },
        { nome: "Gelo", preco: 0 }
      ],
      descricao: "Garrafa 500 ml, com ou sem gás.",
      emEstoque: true,
      opcoesProduto: ["Com Gás", "Sem Gás"]
    }
  ]
};

const MAX_QUANTIDADE = 99;

const listaProdutos = document.getElementById("product-list");
const elTotalItens = document.getElementById("total-itens");
const elVendaTotal = document.getElementById("venda-total");

const campoBusca = document.querySelector("#search");

const abas = document.querySelectorAll(".nav-item");

const CATEGORIAS = {
  pratos: "Pratos Principais",
  lanches: "Lanches",
  sobremesas: "Sobremesas",
  bebidas: "Bebidas"
};
let categoriaAtiva = CATEGORIAS.pratos;

const STORAGE_KEY = "trio-parada-dura:vendas";

const destacados = new Set();

function formatPrice(preco) {
  return "R$ " + preco.toFixed(2).replace(".", ",");
}

// Remove acentos e deixa minúsculo ("Sanduíche" -> "sanduiche")
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

// Cria um elemento com classes e texto (atalho para createElement)
function criarElemento(tag, classes, texto) {
  const el = document.createElement(tag);
  if (classes) el.classList.add(...classes.split(" "));
  if (texto !== undefined) el.textContent = texto;
  return el;
}

/* =====================================================================
   PEDIDO
   O pedido é uma lista de "linhas". Cada linha é um produto com uma
   combinação específica de extras/ingredientes removidos e a quantidade.
   Ex.: 2x Burger sem cebola + bacon  e  1x Burger puro = 2 linhas.
   ===================================================================== */

function produtoPorId(id) {
  return data.produtos.find(p => p.id === id);
}

function extrasDoProduto(produto) {
  return produto.extras || [];
}

function precoDoExtra(produto, nomeExtra) {
  const extra = extrasDoProduto(produto).find(e => e.nome === nomeExtra);
  return extra ? extra.preco : 0;
}

function precoUnitario(produto, extras) {
  const soma = extras.reduce((total, nome) => total + precoDoExtra(produto, nome), 0);
  return Number((produto.preco + soma).toFixed(2));
}

// Identifica linhas iguais (mesmo produto, extras, remoções e ponto da carne)
function chaveLinha(id, extras, removidos, opcoesProduto) {
  return [id, [...extras].sort().join("+"), [...removidos].sort().join("+"), opcoesProduto || ""].join("|");
}

let pedido = carregarPedido();

function carregarPedido() {
  try {
    const salvo = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const linhas = [];

    (salvo?.itens || []).forEach(item => {
      const produto = produtoPorId(item.id);
      if (!produto || !(item.quantidade > 0)) return;

      const nomesExtras = extrasDoProduto(produto).map(e => e.nome);
      const extras = (item.extras || [])
        .map(e => (typeof e === "string" ? e : e.nome))
        .filter(nome => nomesExtras.includes(nome));
      const removidos = (item.removidos || []).filter(nome => produto.removiveis.includes(nome));
      const opcoesProduto = produto.opcoesProduto?.includes(item.opcoesProduto) ? item.opcoesProduto : null;

      linhas.push({
        chave: chaveLinha(produto.id, extras, removidos, opcoesProduto),
        id: produto.id,
        extras,
        removidos,
        opcoesProduto,
        quantidade: item.quantidade
      });
    });

    return linhas;
  } catch {
    return [];
  }
}

function quantidadeDoProduto(id) {
  return pedido
    .filter(linha => linha.id === id)
    .reduce((soma, linha) => soma + linha.quantidade, 0);
}

function gerarJSONVendas() {
  const itens = pedido.map(linha => {
    const produto = produtoPorId(linha.id);
    const unitario = precoUnitario(produto, linha.extras);
    return {
      id: produto.id,
      nome: produto.nome,
      categoria: produto.categoria,
      precoBase: produto.preco,
      extras: linha.extras.map(nome => ({ nome, preco: precoDoExtra(produto, nome) })),
      removidos: linha.removidos,
      opcoesProduto: linha.opcoesProduto,
      precoUnitario: unitario,
      quantidade: linha.quantidade,
      subtotal: Number((unitario * linha.quantidade).toFixed(2))
    };
  });

  return {
    itens,
    totalItens: itens.reduce((soma, i) => soma + i.quantidade, 0),
    vendaTotal: Number(itens.reduce((soma, i) => soma + i.subtotal, 0).toFixed(2)),
    atualizadoEm: new Date().toISOString()
  };
}

function salvarVendas() {
  const vendas = gerarJSONVendas();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vendas));
  } catch { /* storage indisponível: segue só em memória */ }
  atualizarResumo(vendas);
}

function atualizarResumo(vendas = gerarJSONVendas()) {
  elTotalItens.textContent = `${vendas.totalItens} ${vendas.totalItens === 1 ? "item" : "itens"}`;
  elVendaTotal.textContent = formatPrice(vendas.vendaTotal);
}

function adicionarAoPedido(produto, quantidade, extras, removidos, opcoesProduto) {
  const chave = chaveLinha(produto.id, extras, removidos, opcoesProduto);
  const existente = pedido.find(linha => linha.chave === chave);

  if (existente) {
    existente.quantidade = Math.min(MAX_QUANTIDADE, existente.quantidade + quantidade);
  } else {
    pedido.push({
      chave,
      id: produto.id,
      extras: [...extras],
      removidos: [...removidos],
      opcoesProduto,
      quantidade
    });
  }

  salvarVendas();
  renderizar();
}

/* =====================================================================
   POP-UP DO PRODUTO (quantidade, extras e remoção de ingredientes)
   ===================================================================== */

const modal = document.getElementById("modal-produto");
const modalCaixa = modal.querySelector(".modal__caixa");
const modalTitulo = document.getElementById("modal-titulo");
const modalPreco = document.getElementById("modal-preco");
const modalDescricao = document.getElementById("modal-descricao");
const modalSecaoOpcoesProduto = document.getElementById("modal-secao-opcoes-produto");
const modalOpcoesProduto = document.getElementById("modal-opcoes-produto");
const modalSecaoRemoviveis = document.getElementById("modal-secao-removiveis");
const modalSecaoExtras = document.getElementById("modal-secao-extras");
const modalRemoviveis = document.getElementById("modal-removiveis");
const modalExtras = document.getElementById("modal-extras");
const modalMenos = document.getElementById("modal-menos");
const modalMais = document.getElementById("modal-mais");
const modalQtd = document.getElementById("modal-qtd");
const modalConfirmar = document.getElementById("modal-confirmar");

// Estado do pop-up aberto (null = fechado)
let modalEstado = null;

function criarOpcao(texto, textoPreco, aoMudar) {
  const rotulo = criarElemento("label", "opcao");
  const caixa = document.createElement("input");
  caixa.setAttribute("type", "checkbox");
  rotulo.append(caixa, criarElemento("span", "opcao__nome", texto));
  if (textoPreco) rotulo.appendChild(criarElemento("span", "opcao__preco", textoPreco));
  caixa.addEventListener("change", () => aoMudar(caixa.checked));
  return rotulo;
}

function criarOpcaoProduto(texto) {
  const rotulo = criarElemento("label", "opcao");
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "opcoes-produto";
  radio.value = texto;
  radio.addEventListener("change", () => {
    if (radio.checked) modalEstado.opcoesProduto = texto;
  });
  rotulo.append(radio, criarElemento("span", "opcao__nome", texto));
  return rotulo;
}

function atualizarModal() {
  const { produto, quantidade, extras } = modalEstado;
  const total = precoUnitario(produto, [...extras]) * quantidade;

  modalQtd.textContent = String(quantidade);
  modalMenos.disabled = quantidade <= 1;
  modalMais.disabled = quantidade >= MAX_QUANTIDADE;
  modalConfirmar.textContent = `Adicionar · ${formatPrice(total)}`;
}

function abrirModal(produto, gatilho) {
  modalEstado = {
    produto,
    gatilho,
    quantidade: 1,
    extras: new Set(),
    removidos: new Set(),
    opcoesProduto: null
  };

  modalTitulo.textContent = produto.nome;
  modalPreco.textContent = formatPrice(produto.preco);
  modalDescricao.textContent = produto.descricao;

  // Opções específicas disponíveis para este produto
  const opcoesDisponiveis = produto.opcoesProduto || [];
  modalOpcoesProduto.replaceChildren();
  modalSecaoOpcoesProduto.hidden = opcoesDisponiveis.length === 0;
  opcoesDisponiveis.forEach(opcao => {
    modalOpcoesProduto.appendChild(criarOpcaoProduto(opcao));
  });

  // Ingredientes que podem ser retirados
  modalRemoviveis.replaceChildren();
  modalSecaoRemoviveis.hidden = produto.removiveis.length === 0;
  produto.removiveis.forEach(nome => {
    modalRemoviveis.appendChild(criarOpcao(`Sem ${nome}`, "", marcado => {
      if (marcado) modalEstado.removidos.add(nome);
      else modalEstado.removidos.delete(nome);
    }));
  });

  // Extras que podem ser adicionados
  const extrasDisponiveis = extrasDoProduto(produto);
  modalExtras.replaceChildren();
  modalSecaoExtras.hidden = extrasDisponiveis.length === 0;
  extrasDisponiveis.forEach(extra => {
    const textoPreco = extra.preco > 0 ? `+ ${formatPrice(extra.preco)}` : "Grátis";
    modalExtras.appendChild(criarOpcao(extra.nome, textoPreco, marcado => {
      if (marcado) modalEstado.extras.add(extra.nome);
      else modalEstado.extras.delete(extra.nome);
      atualizarModal();
    }));
  });

  modal.querySelector(".modal__corpo").scrollTop = 0;
  atualizarModal();

  modal.hidden = false;
  document.body.classList.add("modal-aberto");
  document.getElementById("modal-fechar").focus();
}

function fecharModal() {
  if (!modalEstado) return;
  const { gatilho } = modalEstado;
  modal.hidden = true;
  document.body.classList.remove("modal-aberto");
  modalEstado = null;
  if (gatilho && gatilho.isConnected) gatilho.focus();
}

function confirmarModal() {
  if (!modalEstado) return;
  const { produto, quantidade, extras, removidos, opcoesProduto } = modalEstado;

  adicionarAoPedido(produto, quantidade, extras, removidos, opcoesProduto);
  fecharModal();

  // O card foi redesenhado: devolve o foco ao botão do produto adicionado
  const novoBotao = listaProdutos.querySelector(`[data-id="${produto.id}"] .btn-adicionar`);
  if (novoBotao) novoBotao.focus();
}

modalMenos.addEventListener("click", () => {
  if (!modalEstado) return;
  modalEstado.quantidade = Math.max(1, modalEstado.quantidade - 1);
  atualizarModal();
});

modalMais.addEventListener("click", () => {
  if (!modalEstado) return;
  modalEstado.quantidade = Math.min(MAX_QUANTIDADE, modalEstado.quantidade + 1);
  atualizarModal();
});

modalConfirmar.addEventListener("click", confirmarModal);
document.getElementById("modal-fechar").addEventListener("click", fecharModal);
document.getElementById("modal-fundo").addEventListener("click", fecharModal);

document.addEventListener("keydown", evento => {
  if (!modalEstado) return;

  if (evento.key === "Escape") {
    fecharModal();
    return;
  }

  // Mantém o foco do teclado dentro do pop-up
  if (evento.key === "Tab") {
    const focaveis = [...modalCaixa.querySelectorAll("button:not(:disabled), input:not(:disabled)")]
      .filter(el => el.offsetParent !== null);
    if (focaveis.length === 0) return;
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  }
});

/* ===================================================================== */

function filterProducts() {
  const termo = normalizar(campoBusca.value);

  return data.produtos.filter(produto => {
    const categoriaOk = produto.categoria === categoriaAtiva;
    const textoOk = !termo ||
      normalizar(produto.nome).includes(termo) ||
      normalizar(produto.descricao).includes(termo);
    return categoriaOk && textoOk;
  });
}

// B.3.5 — Mostra os detalhes do produto
function showProductDetails(produto, infoCard) {
  const estoque = produto.emEstoque ? "Em estoque" : "Esgotado";
  const card = infoCard.closest(".card");
  const conteudoOriginal = document.createDocumentFragment();
  while (infoCard.firstChild) {
    conteudoOriginal.appendChild(infoCard.firstChild);
  }

  const detalhes = criarElemento("div", "detalhes");
  const informacoes = criarElemento("div", "detalhes__info");
  const titulo = criarElemento("h2", "", produto.nome);
  const preco = criarElemento("p", "price", formatPrice(produto.preco));
  const categoria = criarElemento("p", "");
  const categoriaRotulo = criarElemento("strong", "", "Categoria:");
  categoria.append(categoriaRotulo, ` ${produto.categoria}`);
  const estadoEstoque = criarElemento("p", "");
  const estoqueRotulo = criarElemento("strong", "", "Estoque:");
  estadoEstoque.append(estoqueRotulo, ` ${estoque}`);
  const ingredientes = criarElemento("p", "");
  const ingredientesRotulo = criarElemento("strong", "", "Ingredientes:");
  ingredientes.append(ingredientesRotulo, ` ${produto.ingredientes.join(", ")}`);
  const btnFechar = criarElemento("button", "btn btn-fechar", "Fechar");
  btnFechar.setAttribute("type", "button");
  const acoesDetalhes = criarElemento("div", "card-purchase-actions");
  acoesDetalhes.appendChild(btnFechar);

  informacoes.append(titulo, preco, categoria, estadoEstoque, ingredientes, acoesDetalhes);
  detalhes.append(informacoes);
  infoCard.appendChild(detalhes);
  card.classList.add("card--details");

  btnFechar.addEventListener("click", () => {
    infoCard.replaceChildren(conteudoOriginal);
    card.classList.remove("card--details");
  });

}

// B.3.2 — Cria um card de produto e devolve o elemento pronto
function createProductCard(produto) {
  const noPedido = quantidadeDoProduto(produto.id);
  const destacado = destacados.has(produto.id);

  // Card
  const card = criarElemento("article", "card");
  card.setAttribute("data-id", produto.id);
  card.setAttribute("data-categoria", produto.categoria);
  if (destacado) card.classList.add("highlight");

  // Ajuste visual via style: faixa lateral muda conforme o estoque
  card.style.borderLeft = `4px solid ${produto.emEstoque ? "var(--fogo)" : "var(--creme-fraca)"}`;
  card.style.transition = "box-shadow 0.2s ease, background-color 0.2s ease";

  // Imagem
  const caixaImagem = criarElemento("div", "card-image");
  const imagem = document.createElement("img");
  imagem.setAttribute("src", produto.imagem);
  imagem.setAttribute("alt", produto.nome);
  imagem.setAttribute("loading", "lazy");
  caixaImagem.appendChild(imagem);

  // Informações
  const info = criarElemento("div", "card-info");
  const categoria = criarElemento("span", "card-category", produto.categoria);
  const titulo = criarElemento("h2", "card-title", produto.nome);
  const descricao = criarElemento("p", "desc", produto.descricao);
  const preco = criarElemento("p", "price", formatPrice(produto.preco));
  const estoque = criarElemento("p", "stock", produto.emEstoque ? "Em estoque" : "Esgotado");
  if (!produto.emEstoque) estoque.classList.add("stock--out");

  // Ações do card: adicionar (abre o pop-up), detalhes e destaque
  const acoesCompra = criarElemento("div", "card-purchase-actions");

  const btnAdicionar = criarElemento("button", "btn btn-adicionar", "Adicionar");
  btnAdicionar.setAttribute("type", "button");
  btnAdicionar.setAttribute("aria-label", `Adicionar ${produto.nome} ao pedido`);
  btnAdicionar.setAttribute("aria-haspopup", "dialog");
  if (!produto.emEstoque) btnAdicionar.disabled = true;

  const btnDetalhes = criarElemento("button", "btn btn-detalhes", "Ver detalhes");
  btnDetalhes.setAttribute("type", "button");
  const btnDestacar = criarElemento("button", "btn btn-destacar", destacado ? "Destacado ✓" : "Destacar");
  btnDestacar.setAttribute("type", "button");
  btnDestacar.setAttribute("aria-pressed", String(destacado));

  acoesCompra.append(btnAdicionar, btnDetalhes, btnDestacar);
  if (noPedido > 0) {
    acoesCompra.appendChild(criarElemento("span", "card-badge", `${noPedido} no pedido`));
  }

  info.append(categoria, titulo, descricao, preco, estoque, acoesCompra);
  card.append(caixaImagem, info);

  // ----- Eventos dos botões do card (B.4) -----
  btnAdicionar.addEventListener("click", () => abrirModal(produto, btnAdicionar));

  btnDetalhes.addEventListener("click", () => showProductDetails(produto, info));

  btnDestacar.addEventListener("click", () => {
    const ativar = !destacados.has(produto.id);
    if (ativar) {
      destacados.add(produto.id);
      card.classList.add("highlight");
    } else {
      destacados.delete(produto.id);
      card.classList.remove("highlight");
    }
    btnDestacar.textContent = ativar ? "Destacado ✓" : "Destacar";
    btnDestacar.setAttribute("aria-pressed", String(ativar));
  });

  return card;
}

// B.5 — Depois de renderizar, percorre todos os cards com querySelectorAll
function processarCards() {
  const cards = document.querySelectorAll(".card");
  console.log(`Cards renderizados: ${cards.length}`);

  cards.forEach(card => {
    console.log("data-id:", card.getAttribute("data-id"));

    // Efeito simples via style: itens esgotados ficam mais apagados
    const produto = data.produtos.find(p => p.id === Number(card.dataset.id));
    if (produto && !produto.emEstoque) card.style.opacity = "0.6";
  });
}

// B.3.3 — Limpa a lista e adiciona todos os cards com appendChild
function renderProducts(produtos) {
  listaProdutos.innerHTML = "";

  if (produtos.length === 0) {
    listaProdutos.appendChild(criarElemento("p", "vazio", "Nenhum produto encontrado."));
    return;
  }

  produtos.forEach(produto => {
    listaProdutos.appendChild(createProductCard(produto));
  });

  processarCards();
}

// Atalho: filtra e desenha
function renderizar() {
  renderProducts(filterProducts());
}

function ativarAba(categoria) {
  abas.forEach(aba => {
    const ativa = CATEGORIAS[aba.dataset.page] === categoria;
    if (ativa) aba.classList.add("active");
    else aba.classList.remove("active");
    aba.setAttribute("aria-selected", String(ativa));
  });
}

abas.forEach(aba => {
  aba.addEventListener("click", () => {
    categoriaAtiva = CATEGORIAS[aba.dataset.page];
    campoBusca.value = "";
    ativarAba(categoriaAtiva);
    renderizar();
  });
});

// Digitação no campo de busca
campoBusca.addEventListener("input", renderizar);

// Baixar o JSON das vendas
document.getElementById("btn-exportar").addEventListener("click", () => {
  const json = JSON.stringify(gerarJSONVendas(), null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "vendas.json";
  link.click();
  URL.revokeObjectURL(link.href);
});

// Zerar o pedido
document.getElementById("btn-limpar").addEventListener("click", () => {
  pedido = [];
  salvarVendas();
  renderizar();
});

atualizarResumo();
renderizar();
