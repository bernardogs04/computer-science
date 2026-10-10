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

const listaProdutos = document.getElementById("product-list");
const campoBusca = document.getElementById("search");

function mostrarProdutos(produtos) {
  listaProdutos.innerHTML = produtos.map(produto => `
    <article class="produto">
      <img class="produto__imagem" src="${produto.imagem}" alt="${produto.nome}">
      <div class="produto__info">
        <h2>${produto.nome}</h2>
        <p>${produto.descricao}</p>
        <p>${formatPrice(produto.preco)}</p>
      </div>
    </article>
  `).join("");
}
mostrarProdutos(data.produtos);

campoBusca.addEventListener("input", () => {
  const termo = campoBusca.value.trim().toLowerCase();

  const encontrados = data.produtos.filter(produto =>
    produto.nome.toLowerCase().includes(termo)
  );

  mostrarProdutos(encontrados);
});