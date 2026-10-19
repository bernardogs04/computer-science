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
      emEstoque: true,
      destaque: true
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
      emEstoque: true,
      destaque: true
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
      emEstoque: true,
      destaque: true
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
  ],

  // ===== COMENTÁRIOS DOS CLIENTES (exibidos no carrossel do rodapé) =====
  comentarios: [
    { id: 1, estrelas: 5, cliente: "Rafael Mendes", comentario: "A picanha chegou no ponto exato que pedi. Suculenta, macia e muito bem servida. Voltarei com certeza!" },
    { id: 2, estrelas: 5, cliente: "Camila Rocha", comentario: "Melhor hambúrguer da região! A cebola caramelizada com o molho da casa faz toda a diferença." },
    { id: 3, estrelas: 4, cliente: "João Pedro Alves", comentario: "Costela assada desmanchando de tão macia. Só achei a espera um pouco longa num sábado cheio." },
    { id: 4, estrelas: 5, cliente: "Fernanda Lima", comentario: "Atendimento atencioso e ambiente aconchegante. O petit gâteau é de outro mundo!" },
    { id: 5, estrelas: 5, cliente: "Lucas Barbosa", comentario: "Cortes nobres e porções fartas, como prometido. Deu para dividir em dois sem passar fome." },
    { id: 6, estrelas: 4, cliente: "Beatriz Nogueira", comentario: "O ancho grelhado estava delicioso e as batatas rústicas, crocantes. Preço justo pela qualidade." },
    { id: 7, estrelas: 5, cliente: "Thiago Ferreira", comentario: "O sanduíche de picanha é viciante. Já virou o meu almoço de toda sexta-feira." },
    { id: 8, estrelas: 3, cliente: "Juliana Martins", comentario: "A comida é boa, mas o salão estava barulhento e demorei a ser atendida. Espero que melhorem." },
    { id: 9, estrelas: 5, cliente: "Gustavo Ribeiro", comentario: "Pedi pelo cardápio virtual e personalizei o lanche do jeito que eu queria. Muito prático!" },
    { id: 10, estrelas: 5, cliente: "Aline Teixeira", comentario: "Fraldinha com alho perfeita! Tempero na medida e arroz soltinho." },
    { id: 11, estrelas: 4, cliente: "Marcelo Duarte", comentario: "Ótima opção para ir em família. As crianças adoraram o pudim de leite." },
    { id: 12, estrelas: 5, cliente: "Patrícia Gomes", comentario: "A cerveja vem estupidamente gelada, como diz o cardápio, e combina demais com a carne." },
    { id: 13, estrelas: 4, cliente: "Diego Carvalho", comentario: "Sanduíche de costela desfiada muito saboroso, com cheddar cremoso. Só faltou um pouco mais de cebola crispy." },
    { id: 14, estrelas: 5, cliente: "Larissa Pinto", comentario: "Comemoramos meu aniversário aqui e a equipe tratou a gente super bem. Recomendo demais!" },
    { id: 15, estrelas: 5, cliente: "Rodrigo Azevedo", comentario: "O ponto da carne é impecável. Dá para sentir o cuidado no fogo e na brasa." },
    { id: 16, estrelas: 3, cliente: "Vanessa Moreira", comentario: "O prato estava gostoso, mas chegou um pouco morno. Em compensação, a equipe foi muito simpática." },
    { id: 17, estrelas: 5, cliente: "Felipe Castro", comentario: "Brownie quentinho com sorvete e calda de chocolate na medida. Sobremesa nota dez." },
    { id: 18, estrelas: 4, cliente: "Renata Souza", comentario: "Suco natural feito na hora, bem fresquinho. A picanha também estava ótima." },
    { id: 19, estrelas: 5, cliente: "André Silveira", comentario: "Custo-benefício excelente. Carne de qualidade, porção generosa e atendimento rápido." },
    { id: 20, estrelas: 5, cliente: "Carolina Freitas", comentario: "Já virei cliente fiel! Sempre que bate vontade de carne de verdade, é aqui que eu venho." }
  ],

  // Preencha os dados pessoais do responsável pelo site.
  autor: {
    nome: "",
    turma: "",
    redesSociais: []
  }
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
const listaDestaques = document.getElementById("destaques-lista");
const detalheProduto = document.getElementById("detalhes-produto");

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
const modalCaixa = modal?.querySelector(".modal__caixa");
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

if (modal) {
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
}

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
  const linkImagem = criarElemento("a", "card-image-link");
  linkImagem.href = `detalhes.html?id=${encodeURIComponent(produto.id)}`;
  linkImagem.setAttribute("aria-label", `Ver detalhes de ${produto.nome}`);
  const imagem = document.createElement("img");
  imagem.setAttribute("src", produto.imagem);
  imagem.setAttribute("alt", produto.nome);
  imagem.setAttribute("loading", "lazy");
  imagem.addEventListener("error", () => {
    imagem.remove();
    caixaImagem.classList.add("card-image--missing");
    caixaImagem.appendChild(criarElemento("span", "", "Foto não disponível"));
  }, { once: true });
  caixaImagem.appendChild(imagem);
  linkImagem.appendChild(caixaImagem);

  // Informações
  const info = criarElemento("div", "card-info");
  const categoria = criarElemento("span", "card-category", produto.categoria);
  const titulo = criarElemento("h2", "card-title", produto.nome);
  const linkTitulo = criarElemento("a", "card-title-link", produto.nome);
  linkTitulo.href = `detalhes.html?id=${encodeURIComponent(produto.id)}`;
  titulo.replaceChildren(linkTitulo);
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
  card.append(linkImagem, info);

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

function criarLinkDetalhe(produto, classes = "", texto = "Ver detalhes") {
  const link = criarElemento("a", classes, texto);
  link.href = `detalhes.html?id=${encodeURIComponent(produto.id)}`;
  return link;
}

function iniciarCarrosselDestaques() {
  if (!listaDestaques) return;

  const destaques = data.produtos.filter(produto => produto.destaque);
  const botaoAnterior = document.getElementById("destaque-anterior");
  const botaoProximo = document.getElementById("destaque-proximo");
  const controles = document.querySelector(".destaques__controles");

  if (destaques.length === 0) {
    listaDestaques.closest(".destaques").hidden = true;
    return;
  }

  let indice = 0;

  function renderizarDestaque() {
    const produto = destaques[indice];
    const cartao = criarElemento("article", "destaque-card");
    const linkImagem = document.createElement("a");
    linkImagem.href = `detalhes.html?id=${encodeURIComponent(produto.id)}`;
    linkImagem.setAttribute("aria-label", `Ver detalhes de ${produto.nome}`);
    const imagem = document.createElement("img");
    imagem.src = produto.imagem;
    imagem.alt = produto.nome;
    imagem.addEventListener("error", () => {
      imagem.remove();
      linkImagem.classList.add("destaque-card__imagem--missing");
      linkImagem.appendChild(criarElemento("span", "", "Foto não disponível"));
    }, { once: true });
    linkImagem.appendChild(imagem);

    const informacoes = criarElemento("div", "destaque-card__info");
    informacoes.append(
      criarElemento("span", "card-category", produto.categoria),
      criarElemento("h3", "", produto.nome),
      criarElemento("p", "", produto.descricao)
    );
    informacoes.appendChild(criarLinkDetalhe(produto, "btn btn-destaque-detalhes"));
    cartao.append(linkImagem, informacoes);
    listaDestaques.replaceChildren(cartao);

      const posicao = document.getElementById("destaques-posicao");
      if (posicao) posicao.textContent = `${indice + 1} / ${destaques.length}`;
  }

  botaoAnterior.hidden = destaques.length < 2;
  botaoProximo.hidden = destaques.length < 2;
  if (controles) controles.hidden = destaques.length < 2;

  botaoAnterior.addEventListener("click", () => {
    indice = (indice - 1 + destaques.length) % destaques.length;
    renderizarDestaque();
  });

  botaoProximo.addEventListener("click", () => {
    indice = (indice + 1) % destaques.length;
    renderizarDestaque();
  });

  renderizarDestaque();
}

function renderizarAutoria() {
  const container = document.getElementById("autoria-conteudo");
  if (!container) return;

  const autor = data.autor || {};
  const informacoes = [
    ["Nome", autor.nome],
    ["Turma", autor.turma]
  ];

  container.replaceChildren();
  informacoes.forEach(([rotulo, valor]) => {
    const paragrafo = criarElemento("p", "", "");
    paragrafo.append(criarElemento("strong", "", `${rotulo}:`), ` ${valor || "Configure em data.autor no script.js"}`);
    container.appendChild(paragrafo);
  });

  const redes = Array.isArray(autor.redesSociais) ? autor.redesSociais : [];
  if (redes.length > 0) {
    const nav = criarElemento("nav", "autoria__redes");
    nav.setAttribute("aria-label", "Redes sociais do autor");
    redes.forEach(rede => {
      if (!rede.nome || !rede.url) return;
      const link = criarElemento("a", "", rede.nome);
      link.href = rede.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      nav.appendChild(link);
    });
    if (nav.childElementCount > 0) container.appendChild(nav);
  } else {
    container.appendChild(criarElemento("p", "", "Adicione suas redes em data.autor.redesSociais no script.js."));
  }
}

function renderizarPaginaDetalhes() {
  if (!detalheProduto) return;

  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const produto = data.produtos.find(item => item.id === id);
  const breadcrumbNome = document.getElementById("detalhe-breadcrumb-nome");

  if (!produto) {
    document.title = "Produto não encontrado — Trio Parada Dura";
    breadcrumbNome.textContent = "Produto não encontrado";
    const voltar = criarElemento("a", "btn btn-detalhes-voltar", "Voltar ao cardápio");
    voltar.href = "index.html";
    detalheProduto.replaceChildren(
      criarElemento("h1", "", "Produto não encontrado"),
      criarElemento("p", "", "Confira o endereço e tente novamente."),
      voltar
    );
    return;
  }

  document.title = `${produto.nome} — Trio Parada Dura`;
  breadcrumbNome.textContent = produto.nome;

  const cabecalho = criarElemento("header", "produto-detalhe__cabecalho");
  cabecalho.append(
    criarElemento("span", "card-category", produto.categoria),
    criarElemento("h1", "", produto.nome),
    criarElemento("p", "produto-detalhe__descricao", produto.descricao)
  );

  const secaoInformacoes = criarElemento("section", "produto-detalhe__secao");
  secaoInformacoes.appendChild(criarElemento("h2", "", "Informações gerais"));
  const grade = criarElemento("dl", "produto-detalhe__grade");
  const campos = [
    ["Categoria", produto.categoria],
    ["Preço", formatPrice(produto.preco)],
    ["Disponibilidade", produto.emEstoque ? "Em estoque" : "Esgotado"],
    ["Ingredientes", produto.ingredientes.length ? produto.ingredientes.join(", ") : "Não informado"],
    ["Descrição", produto.descricao]
  ];
  if (produto.removiveis.length > 0) {
    campos.push(["Ingredientes removíveis", produto.removiveis.join(", ")]);
  }
  if (produto.opcoesProduto?.length) {
    campos.push(["Opções disponíveis", produto.opcoesProduto.join(", ")]);
  }
  if (produto.extras?.length) {
    campos.push([
      "Adicionais",
      produto.extras.map(extra => `${extra.nome} (${extra.preco === 0 ? "grátis" : formatPrice(extra.preco)})`).join(", ")
    ]);
  }

  campos.forEach(([rotulo, valor]) => {
    const item = criarElemento("div", "produto-detalhe__campo");
    item.append(criarElemento("dt", "", rotulo), criarElemento("dd", "", valor));
    grade.appendChild(item);
  });
  secaoInformacoes.appendChild(grade);

  const secaoFotos = criarElemento("section", "produto-detalhe__secao");
  secaoFotos.appendChild(criarElemento("h2", "", "Fotos do produto"));
  const galeria = criarElemento("div", "produto-detalhe__galeria");
  const fotos = produto.fotos?.length
    ? produto.fotos
    : [{ imagem: produto.imagem, titulo: produto.nome }];
  const semFotos = criarElemento("p", "produto-detalhe__sem-fotos", "Não há fotos disponíveis para este produto.");
  let fotosCarregadas = 0;

  fotos.forEach(foto => {
    const figura = criarElemento("figure", "produto-foto");
    const imagem = document.createElement("img");
    imagem.src = foto.imagem;
    imagem.alt = foto.titulo || produto.nome;
    imagem.loading = "lazy";
    imagem.addEventListener("load", () => {
      fotosCarregadas += 1;
      semFotos.hidden = true;
    }, { once: true });
    imagem.addEventListener("error", () => {
      figura.remove();
      semFotos.hidden = fotosCarregadas > 0 || galeria.childElementCount > 0;
    }, { once: true });
    figura.append(imagem, criarElemento("figcaption", "", foto.titulo || produto.nome));
    galeria.appendChild(figura);
  });

  semFotos.hidden = true;
  secaoFotos.append(galeria, semFotos);
  const linkInicio = criarElemento("a", "btn btn-detalhes-voltar", "Voltar ao cardápio");
  linkInicio.href = "index.html";
  detalheProduto.replaceChildren(cabecalho, secaoInformacoes, secaoFotos, linkInicio);
}

function ativarAba(categoria) {
  abas.forEach(aba => {
    const ativa = CATEGORIAS[aba.dataset.page] === categoria;
    if (ativa) aba.classList.add("active");
    else aba.classList.remove("active");
    aba.setAttribute("aria-selected", String(ativa));
  });
}

function iniciarPaginaInicial() {
  abas.forEach(aba => {
    aba.addEventListener("click", () => {
      categoriaAtiva = CATEGORIAS[aba.dataset.page];
      campoBusca.value = "";
      ativarAba(categoriaAtiva);
      renderizar();
    });
  });

  campoBusca.addEventListener("input", renderizar);

  document.getElementById("btn-exportar").addEventListener("click", () => {
    const json = JSON.stringify(gerarJSONVendas(), null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "vendas.json";
    link.click();
    URL.revokeObjectURL(link.href);
  });

  document.getElementById("btn-limpar").addEventListener("click", () => {
    pedido = [];
    salvarVendas();
    renderizar();
  });

  atualizarResumo();
  renderizar();
  iniciarCarrosselDestaques();
  iniciarCarrossel();
  renderizarAutoria();
}

/* =====================================================================
   CARROSSEL DE AVALIAÇÕES (rodapé)
   Mostra até 3 comentários por vez e desliza um por um, em loop infinito.
   Para o loop ser contínuo, os 3 primeiros comentários são clonados no
   final do trilho; ao chegar neles, o trilho volta ao início sem animação.
   ===================================================================== */

const CARROSSEL_POR_VEZ = 3;        // máximo de comentários visíveis
const CARROSSEL_INTERVALO = 7000;   // ms entre cada deslize
const CARROSSEL_DURACAO = 500;      // ms da animação do deslize

function criarEstrelas(quantidade) {
  const total = Math.max(0, Math.min(5, Math.round(quantidade)));
  const caixa = criarElemento("div", "avaliacao__estrelas");
  caixa.setAttribute("role", "img");
  caixa.setAttribute("aria-label", `${total} de 5 estrelas`);
  caixa.appendChild(criarElemento("span", "", "★".repeat(total)));
  caixa.appendChild(criarElemento("span", "avaliacao__estrelas-vazias", "★".repeat(5 - total)));
  return caixa;
}

function criarCartaoAvaliacao(comentario, ehClone) {
  const cartao = criarElemento("figure", "avaliacao");
  cartao.style.margin = "0";
  if (ehClone) cartao.setAttribute("aria-hidden", "true");

  cartao.append(
    criarEstrelas(comentario.estrelas),
    criarElemento("blockquote", "avaliacao__texto", comentario.comentario),
    criarElemento("figcaption", "avaliacao__cliente", `— ${comentario.cliente}`)
  );
  // blockquote traz margens do navegador; zera para manter o layout do card
  cartao.querySelector("blockquote").style.margin = "0";
  return cartao;
}

function iniciarCarrossel() {
  const secao = document.getElementById("avaliacoes");
  const trilho = document.getElementById("avaliacoes-trilho");
  const comentarios = data.comentarios || [];

  if (!secao || !trilho || comentarios.length === 0) {
    if (secao) secao.hidden = true;
    return;
  }

  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duracao = reduzirMovimento ? 0 : CARROSSEL_DURACAO;
  trilho.style.transitionDuration = `${duracao}ms`;

  // Comentários originais + clones dos primeiros (para fechar o loop)
  comentarios.forEach(c => trilho.appendChild(criarCartaoAvaliacao(c, false)));
  comentarios.slice(0, CARROSSEL_POR_VEZ).forEach(c => trilho.appendChild(criarCartaoAvaliacao(c, true)));

  let indice = 0;
  let timer = null;
  let pausadoTemporariamente = false;

  // Largura de um card + espaço entre cards (medido, pois muda com a tela)
  function larguraDoPasso() {
    const gap = parseFloat(getComputedStyle(trilho).columnGap) || 0;
    return trilho.firstElementChild.getBoundingClientRect().width + gap;
  }

  function posicionar(comAnimacao) {
    trilho.classList.toggle("sem-transicao", !comAnimacao);
    trilho.style.transform = `translateX(${-indice * larguraDoPasso()}px)`;
  }

  function avancar() {
    indice += 1;
    posicionar(true);

    // Chegou nos clones: após a animação, volta ao início sem ser notado
    if (indice >= comentarios.length) {
      setTimeout(() => {
        indice = 0;
        posicionar(false);
      }, duracao + 30);
    }
  }

  function parar() {
    clearInterval(timer);
    timer = null;
  }

  function atualizarTimer() {
    parar();
    if (!pausadoTemporariamente && !document.hidden) {
      timer = setInterval(avancar, CARROSSEL_INTERVALO);
    }
  }

  // Pausa enquanto o mouse ou o foco do teclado estão sobre o carrossel
  secao.addEventListener("mouseenter", () => { pausadoTemporariamente = true; atualizarTimer(); });
  secao.addEventListener("mouseleave", () => { pausadoTemporariamente = false; atualizarTimer(); });
  secao.addEventListener("focusin", () => { pausadoTemporariamente = true; atualizarTimer(); });
  secao.addEventListener("focusout", () => { pausadoTemporariamente = false; atualizarTimer(); });
  document.addEventListener("visibilitychange", atualizarTimer);

  // Reajusta a posição quando a janela muda de tamanho
  window.addEventListener("resize", () => posicionar(false));

  posicionar(false);
  atualizarTimer();
}

if (listaProdutos) iniciarPaginaInicial();
if (detalheProduto) {
  renderizarPaginaDetalhes();
  renderizarAutoria();
}
