const data = {
  produtos: [
    // ===== PRATOS PRINCIPAIS =====
    {
      id: 1,
      nome: "Picanha na Chapa",
      preco: 89.9,
      categoria: "Pratos Principais",
      imagem: "images/picanha-na-chapa.jpg",
      descricao: "Picanha suculenta grelhada no ponto certo, acompanhada de arroz, farofa e vinagrete.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Ancho Grelhado",
      preco: 84.9,
      categoria: "Pratos Principais",
      imagem: "images/ancho-grelhado.jpg",
      descricao: "Corte macio e marmorizado, grelhado na brasa e servido com batatas rústicas.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Costela Assada",
      preco: 79.9,
      categoria: "Pratos Principais",
      imagem: "images/costela-assada.jpg",
      descricao: "Costela assada lentamente até desmanchar, servida com mandioca cozida e molho especial.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "Fraldinha com Alho",
      preco: 74.9,
      categoria: "Pratos Principais",
      imagem: "images/fraldinha-com-alho.jpg",
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
      descricao: "Hambúrguer de carne bovina, queijo derretido, cebola caramelizada e molho da casa no pão macio.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Sanduíche de Picanha",
      preco: 42.9,
      categoria: "Lanches",
      imagem: "images/sanduiche-de-picanha.jpg",
      descricao: "Fatias de picanha grelhada, queijo, rúcula e maionese defumada.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "Sanduíche de Costela Desfiada",
      preco: 39.9,
      categoria: "Lanches",
      imagem: "images/sanduiche-de-costela.jpg",
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
      descricao: "Bolinho de chocolate com centro cremoso, servido com sorvete de creme.",
      emEstoque: true
    },
    {
      id: 9,
      nome: "Pudim de Leite",
      preco: 16.9,
      categoria: "Sobremesas",
      imagem: "images/pudim-de-leite.jpg",
      descricao: "Pudim tradicional, cremoso e com calda de caramelo.",
      emEstoque: true
    },
    {
      id: 10,
      nome: "Brownie com Sorvete",
      preco: 22.9,
      categoria: "Sobremesas",
      imagem: "images/brownie-com-sorvete.jpg",
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
      descricao: "Lata 350 ml, diversos sabores, servida gelada.",
      emEstoque: true
    },
    {
      id: 12,
      nome: "Suco Natural",
      preco: 12.0,
      categoria: "Bebidas",
      imagem: "images/suco-natural.jpg",
      descricao: "Suco feito na hora com frutas frescas. Pergunte pelos sabores do dia.",
      emEstoque: true
    },
    {
      id: 13,
      nome: "Cerveja Long Neck",
      preco: 12.9,
      categoria: "Bebidas",
      imagem: "images/cerveja-long-neck.jpg",
      descricao: "Long neck 330 ml, estupidamente gelada, ideal para acompanhar a carne.",
      emEstoque: true
    },
    {
      id: 14,
      nome: "Água Mineral",
      preco: 5.0,
      categoria: "Bebidas",
      imagem: "images/agua-mineral.jpg",
      descricao: "Garrafa 500 ml, com ou sem gás.",
      emEstoque: true
    }
  ]
};

function formatPrice(v) {
  return 'R$ ' + v.toFixed(2).replace('.', ',');
}

// Remove acentos e deixa minúsculo ("Sanduíche" -> "sanduiche")
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

// data-page da aba -> categoria do produto
const CATEGORIAS = {
  pratos: "Pratos Principais",
  lanches: "Lanches",
  sobremesas: "Sobremesas",
  bebidas: "Bebidas"
};

const STORAGE_KEY = "trio-parada-dura:vendas";

const listaProdutos = document.getElementById("product-list");
const campoBusca = document.getElementById("search");
const abas = document.querySelectorAll(".nav-item");
const elTotalItens = document.getElementById("total-itens");
const elVendaTotal = document.getElementById("venda-total");

let categoriaAtiva = "pratos";

// ===== Contador (quantidade por id de produto) =====
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

// Monta o JSON com cada produto vendido, quantidade, subtotal e venda total
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

// ===== Listagem / filtro =====
function mostrarProdutos(produtos) {
  if (produtos.length === 0) {
    listaProdutos.innerHTML = `<p class="vazio">Nenhum produto encontrado.</p>`;
    return;
  }

  listaProdutos.innerHTML = produtos.map(produto => {
    const qtd = quantidades[produto.id] || 0;
    return `
    <article class="produto">
      <img class="produto__imagem" src="${produto.imagem}" alt="${produto.nome}">
      <div class="produto__info">
        <h2>${produto.nome}</h2>
        <p>${produto.descricao}</p>
        <p class="produto__preco">${formatPrice(produto.preco)}</p>
        <div class="contador">
          <button type="button" data-acao="menos" data-id="${produto.id}" aria-label="Remover ${produto.nome}" ${qtd === 0 ? "disabled" : ""}>−</button>
          <span class="contador__qtd">${qtd}</span>
          <button type="button" data-acao="mais" data-id="${produto.id}" aria-label="Adicionar ${produto.nome}">+</button>
          ${qtd > 0 ? `<span class="contador__subtotal">${formatPrice(produto.preco * qtd)}</span>` : ""}
        </div>
      </div>
    </article>`;
  }).join("");
}

function renderizar() {
  const termo = normalizar(campoBusca.value);

  const encontrados = data.produtos.filter(produto => {
    // Com busca digitada, procura no cardápio inteiro; sem busca, mostra só a aba ativa
    if (termo) {
      return normalizar(produto.nome).includes(termo) ||
             normalizar(produto.descricao).includes(termo);
    }
    return produto.categoria === CATEGORIAS[categoriaAtiva];
  });

  mostrarProdutos(encontrados);
}

// Abas
abas.forEach(aba => {
  aba.addEventListener("click", () => {
    abas.forEach(a => {
      a.classList.remove("active");
      a.setAttribute("aria-selected", "false");
    });
    aba.classList.add("active");
    aba.setAttribute("aria-selected", "true");
    categoriaAtiva = aba.dataset.page;
    campoBusca.value = "";
    renderizar();
  });
});

// Busca
campoBusca.addEventListener("input", renderizar);

// Botões + / − (delegação, pois a lista é re-renderizada)
listaProdutos.addEventListener("click", e => {
  const botao = e.target.closest("button[data-acao]");
  if (!botao) return;
  alterarQuantidade(Number(botao.dataset.id), botao.dataset.acao === "mais" ? 1 : -1);
});

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
