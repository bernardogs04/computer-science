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
      descricao: "Hambúrguer de carne bovina, queijo derretido, cebola caramelizada e molho da casa no pão macio.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Sanduíche de Picanha",
      preco: 42.9,
      categoria: "Lanches",
      imagem: "images/sanduiche-de-picanha.jpg",
      ingredientes: ["Picanha", "Queijo", "Rúcula", "Maionese Defumada"],
      descricao: "Fatias de picanha grelhada, queijo, rúcula e maionese defumada.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "Sanduíche de Costela Desfiada",
      preco: 39.9,
      categoria: "Lanches",
      imagem: "images/sanduiche-de-costela.jpg",
      ingredientes: ["Costela", "Cheddar", "Cebola Crispy", "Pão de Brioche"],
      descricao: "Costela desfiada e macia, cheddar cremoso e cebola crispy no pão de brioche.",
      emEstoque: true
    },

    // ===== SOBREMESAS =====
    {
      id: 8,
      nome: "Petit Gâteau",
      preco: 24.9,
      categoria: "Sobremesas",
      imagem: "images/petit-gateau.jpg",
      ingredientes: ["Chocolate", "Creme"],
      descricao: "Bolinho de chocolate com centro cremoso, servido com sorvete de creme.",
      emEstoque: true
    },
    {
      id: 9,
      nome: "Pudim de Leite",
      preco: 16.9,
      categoria: "Sobremesas",
      imagem: "images/pudim-de-leite.jpg",
      ingredientes: ["Leite", "Creme"],
      descricao: "Pudim tradicional, cremoso e com calda de caramelo.",
      emEstoque: true
    },
    {
      id: 10,
      nome: "Brownie com Sorvete",
      preco: 22.9,
      categoria: "Sobremesas",
      imagem: "images/brownie-com-sorvete.jpg",
      ingredientes: ["Chocolate", "Sorvete", "Calda de Chocolate"],
      descricao: "Brownie de chocolate quentinho com bola de sorvete e calda de chocolate.",
      emEstoque: true
    },

    // ===== BEBIDAS =====
    {
      id: 11,
      nome: "Refrigerante Lata",
      preco: 7.5,
      categoria: "Bebidas",
      imagem: "images/refrigerante-lata.jpg",
      ingredientes: ["Água", "Açúcar", "Corante", "Conservante"],
      descricao: "Lata 350 ml, diversos sabores, servida gelada.",
      emEstoque: true
    },
    {
      id: 12,
      nome: "Suco Natural",
      preco: 12.0,
      categoria: "Bebidas",
      imagem: "images/suco-natural.jpg",
      ingredientes: ["Frutas Frescas"],
      descricao: "Suco feito na hora com frutas frescas. Pergunte pelos sabores do dia.",
      emEstoque: true
    },
    {
      id: 13,
      nome: "Cerveja Long Neck",
      preco: 12.9,
      categoria: "Bebidas",
      imagem: "images/cerveja-long-neck.jpg",
      ingredientes: ["Cerveja"],
      descricao: "Long neck 330 ml, estupidamente gelada, ideal para acompanhar a carne.",
      emEstoque: true
    },
    {
      id: 14,
      nome: "Água Mineral",
      preco: 5.0,
      categoria: "Bebidas",
      imagem: "images/agua-mineral.jpg",
      ingredientes: ["Água"],
      descricao: "Garrafa 500 ml, com ou sem gás.",
      emEstoque: true
    }
  ]
};

  
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

let quantidades = carregarVendas();

function carregarVendas() {
  try {
    const salvo = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const q = {};
    (salvo?.itens || []).forEach(item => { q[item.id] = item.quantidade; });
    return q;
  } catch {
    return {};
  }
}

function gerarJSONVendas() {
  const itens = data.produtos
    .filter(p => quantidades[p.id] > 0)
    .map(p => ({
      id: p.id,
      nome: p.nome,
      categoria: p.categoria,
      precoUnitario: p.preco,
      quantidade: quantidades[p.id],
      subtotal: Number((p.preco * quantidades[p.id]).toFixed(2))
    }));

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

function alterarQuantidade(id, delta) {
  const atual = quantidades[id] || 0;
  const nova = Math.max(0, atual + delta);
  if (nova === 0) delete quantidades[id];
  else quantidades[id] = nova;
  salvarVendas();
  renderizar();
}

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

  informacoes.append(titulo, preco, categoria, estadoEstoque, ingredientes, btnFechar);
  detalhes.append(informacoes);
  infoCard.appendChild(detalhes);

  btnFechar.addEventListener("click", () => {
    infoCard.replaceChildren(conteudoOriginal);
  });

}

// B.3.2 — Cria um card de produto e devolve o elemento pronto
function createProductCard(produto) {
  const qtd = quantidades[produto.id] || 0;
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

  // Contador (+ / −)
  const contador = criarElemento("div", "contador");
  const btnMenos = criarElemento("button", "", "−");
  btnMenos.setAttribute("type", "button");
  btnMenos.setAttribute("aria-label", `Remover ${produto.nome}`);
  if (qtd === 0) btnMenos.disabled = true;

  const spanQtd = criarElemento("span", "contador__qtd", String(qtd));

  const btnMais = criarElemento("button", "", "+");
  btnMais.setAttribute("type", "button");
  btnMais.setAttribute("aria-label", `Adicionar ${produto.nome}`);
  if (!produto.emEstoque) btnMais.disabled = true;

  contador.append(btnMenos, spanQtd, btnMais);
  if (qtd > 0) {
    contador.appendChild(criarElemento("span", "contador__subtotal", formatPrice(produto.preco * qtd)));
  }

  // Ações do card: contador, detalhes e destaque na mesma linha
  const acoesCompra = criarElemento("div", "card-purchase-actions");
  const btnDetalhes = criarElemento("button", "btn btn-detalhes", "Ver detalhes");
  btnDetalhes.setAttribute("type", "button");
  const btnDestacar = criarElemento("button", "btn btn-destacar", destacado ? "Destacado ✓" : "Destacar");
  btnDestacar.setAttribute("type", "button");
  btnDestacar.setAttribute("aria-pressed", String(destacado));

  acoesCompra.append(contador, btnDetalhes, btnDestacar);
  info.append(categoria, titulo, descricao, preco, estoque, acoesCompra);
  card.append(caixaImagem, info);

  // ----- Eventos dos botões do card (B.4) -----
  btnMais.addEventListener("click", () => alterarQuantidade(produto.id, 1));
  btnMenos.addEventListener("click", () => alterarQuantidade(produto.id, -1));

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

// Zerar contadores
document.getElementById("btn-limpar").addEventListener("click", () => {
  quantidades = {};
  salvarVendas();
  renderizar();
});

atualizarResumo();
renderizar();