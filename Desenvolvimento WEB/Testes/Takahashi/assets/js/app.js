const dados = {
  "restaurantes": [
    {
      "id": 1,
      "nome": "Pipa! Cozinha Boêmia",
      "descricao": "Um bar de petiscos incrível no Santo Antônio com clima super aconchegante.",
      "conteudo": "Localizado na charmosa rua Teixeira de Freitas, o Pipa! oferece uma experiência única de culinária de boteco criativa, com ótimo atendimento e cerveja sempre trincando.",
      "tipo": "Bar de Petisco",
      "destaque": true,
      "imagemPrincipal": "assets/imagens/pipa.jpeg",
      "endereco": "Rua Teixeira de Freitas, 123 - Santo Antônio, Belo Horizonte - MG"
    },
    {
      "id": 2,
      "nome": "Sal 15",
      "descricao": "Hamburgueria artesanal imperdível localizada no coração do Prado.",
      "conteudo": "Ambiente moderno e urbano, especializado em hambúrgueres artesanais feitos na brasa com blends exclusivos de carne e molhos da casa.",
      "tipo": "Hamburgueria",
      "destaque": true,
      "imagemPrincipal": "assets/imagens/sal15.jpeg",
      "endereco": "Rua da Paz, 456 - Prado, Belo Horizonte - MG"
    },
    {
      "id": 3,
      "nome": "Cantina da Esquina",
      "descricao": "Tradição italiana com massas frescas e receitas de família.",
      "conteudo": "Um pedacinho da Itália bem no centro da cidade. Salão acolhedor ideal para jantares em família e comemorações especiais.",
      "tipo": "Italiano",
      "destaque": false,
      "imagemPrincipal": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Capri_Italian_Restaurant_-_June_2022_-_Sarah_Stierch_03.jpg/960px-Capri_Italian_Restaurant_-_June_2022_-_Sarah_Stierch_03.jpg",
      "endereco": "Endereço de teste"
    },
    {
      "id": 4,
      "nome": "Café Pão de Mel",
      "descricao": "Cafeteria aconchegante com bolos caseiros e cafés especiais.",
      "conteudo": "O lugar perfeito para relaxar à tarde, ler um bom livro ou encontrar amigos para um café acompanhado de quitutes fresquinhos.",
      "tipo": "Cafeteria",
      "destaque": false,
      "imagemPrincipal": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/TchoupPJSInsideCase.jpg/960px-TchoupPJSInsideCase.jpg",
      "endereco": "Endereço de teste"
    },
    {
      "id": 5,
      "nome": "Boteco do Zé",
      "descricao": "Boteco tradicional de calçada com petiscos clássicos e cerveja gelada.",
      "conteudo": "Famoso pela hospitalidade e pelo melhor fígado com jiló da região. Um ponto de encontro boêmio indispensável.",
      "tipo": "Boteco",
      "destaque": false,
      "imagemPrincipal": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Boteco.jpg/960px-Boteco.jpg",
      "endereco": "Endereço de teste"
    }
  ],
  // Entidades Secundárias dos Restaurantes 
  "pratos": [
    // Pratos do Restaurante 1 
    {
      "id": 1,
      "restauranteId": 1,
      "nome": "Bolinho de Arroz com Queijo",
      "descricao": "Crocante por fora, cremoso por dentro, recheado com queijo minas.",
      "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Bolinho_de_arroz_05.jpg/960px-Bolinho_de_arroz_05.jpg"
    },
    {
      "id": 2,
      "restauranteId": 1,
      "nome": "Isca de Tilápia Frita",
      "descricao": "Acompanha molho tártaro especial da casa e limão siciliano.",
      "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Fried_Tilapia_Fish.jpg/960px-Fried_Tilapia_Fish.jpg"
    },
    {
      "id": 3,
      "restauranteId": 1,
      "nome": "Dadinhos de Tapioca",
      "descricao": "Servidos com geleia de pimenta agridoce.",
      "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Dadinhos_de_tapioca_com_geleia_de_pimenta.jpg/960px-Dadinhos_de_tapioca_com_geleia_de_pimenta.jpg"
    },

    // Pratos do Restaurante 2 
    {
      "id": 4,
      "restauranteId": 2,
      "nome": "Burger Bacon Smash",
      "descricao": "Dois smash burgers, cheddar duplo, bacon crocante e molho especial.",
      "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Sriracha_Double_Smash_Burger.jpg/960px-Sriracha_Double_Smash_Burger.jpg"
    },
    {
      "id": 5,
      "restauranteId": 2,
      "nome": "Burger Gorgonzola Crispy",
      "descricao": "Blend bovino, creme de gorgonzola e cebola crispy.",
      "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Blue_Cheese_Burger_%40_Burger_Mania_%40_Hiroo_%2813406862465%29.jpg/960px-Blue_Cheese_Burger_%40_Burger_Mania_%40_Hiroo_%2813406862465%29.jpg"
    },
    {
      "id": 6,
      "restauranteId": 2,
      "nome": "Batata rústica com cheddar e bacon",
      "descricao": "Porção generosa de batatas temperadas com ervas finas.",
      "imagem": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Wedges_with_cheese_and_bacon.jpg"
    },

    // Pratos do Restaurante 3
    {
      "id": 7,
      "restauranteId": 3,
      "nome": "Spaghetti Carbonara",
      "descricao": "Massa fresca artesanal com guanciale e pecorino.",
      "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Spaghetti_alla_Carbonara_%28Madrid%29.JPG/960px-Spaghetti_alla_Carbonara_%28Madrid%29.JPG"
    },
    {
      "id": 8,
      "restauranteId": 3,
      "nome": "Ravioli de Abóbora",
      "descricao": "Recheado com abóbora assada ao molho de manteiga e sálvia.",
      "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Ravioli_me_gjalpe%2C_sherebele_dhe_grana_%E2%99%A7.jpg/960px-Ravioli_me_gjalpe%2C_sherebele_dhe_grana_%E2%99%A7.jpg"
    },
    {
      "id": 9,
      "restauranteId": 3,
      "nome": "Tiramisu Clássico",
      "descricao": "Sobremesa tradicional italiana com café e cacau.",
      "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Classic_Italian_Tiramisu-3_%2829989504485%29.jpg/960px-Classic_Italian_Tiramisu-3_%2829989504485%29.jpg"
    },

    // Pratos do Restaurante 4
    {
      "id": 10,
      "restauranteId": 4,
      "nome": "Bolo de Cenoura com Chocolate",
      "descricao": "Fofinho, com cobertura generosa de chocolate belga.",
      "imagem": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Peda%C3%A7o_de_Bolo_de_Cenoura%2C_08-12-2020.jpg"
    },
    {
      "id": 11,
      "restauranteId": 4,
      "nome": "Cappuccino Cremoso",
      "descricao": "Café expresso, leite vaporizado, cacau e canela.",
      "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Latte_art_on_cappuccino_%28Unsplash%29.jpg/960px-Latte_art_on_cappuccino_%28Unsplash%29.jpg"
    },
    {
      "id": 12,
      "restauranteId": 4,
      "nome": "Pão de Queijo Artesanal",
      "descricao": "Feito com queijo minas curado, quentinho.",
      "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Pao_de_queijo_brasil.jpg/960px-Pao_de_queijo_brasil.jpg"
    },

    // Pratos do Restaurante 5 
    {
      "id": 13,
      "restauranteId": 5,
      "nome": "Fígado com Jiló",
      "descricao": "O clássico petisco de boteco acebolado.",
      "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/Liver_and_Onions_at_the_Rathauskeller.jpg/960px-Liver_and_Onions_at_the_Rathauskeller.jpg"
    },
    {
      "id": 14,
      "restauranteId": 5,
      "nome": "Torresmo de Rolo",
      "descricao": "Crocante por fora e suculento por dentro.",
      "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Pork_prrr.jpg/960px-Pork_prrr.jpg"
    },
    {
      "id": 15,
      "restauranteId": 5,
      "nome": "Cerveja de Garrafa 600ml",
      "descricao": "Sempre trincando de gelada.",
      "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/11/Beer_bottles_2018_G1.jpg/960px-Beer_bottles_2018_G1.jpg"
    }
  ],

  "receitas": [
    {
      "id": 101,
      "nome": "Massa Carbonara",
      "tipo": "Prato Principal",
      "descricao": "Receita clássica com guanciale, queijo pecorino e gemas frescas.",
      "conteudo": "A verdadeira carbonara não leva creme de leite. O segredo da cremosidade está na emulsão perfeita do queijo pecorino ralado fino com a água do cozimento da massa e as gemas.",
      "destaque": true,
      "tempoPreparo": "30 minutos",
      "rendimento": "2 porções",
      "dificuldade": "Média",
      "calorias": "650 kcal",
      "imagemPrincipal": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Spaghetti_Carbonara_von_Unico_Tauberbischofsheim_2.jpg/960px-Spaghetti_Carbonara_von_Unico_Tauberbischofsheim_2.jpg"
    },
    {
      "id": 102,
      "nome": "Risoto de Cogumelos",
      "tipo": "Prato Principal",
      "descricao": "Risoto cremoso com mix de cogumelos frescos e vinho branco.",
      "conteudo": "Preparado com arroz arbório, caldo vegetal caseiro e finalizado com manteiga e parmesão para obter uma textura perfeitamente cremosa.",
      "destaque": false,
      "tempoPreparo": "45 minutos",
      "rendimento": "4 porções",
      "dificuldade": "Avançada",
      "calorias": "520 kcal",
      "imagemPrincipal": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Mushroom_and_Leek_Risotto_%2849535206656%29.jpg/960px-Mushroom_and_Leek_Risotto_%2849535206656%29.jpg"
    },
    {
      "id": 103,
      "nome": "Torta de Maçã",
      "tipo": "Sobremesa",
      "descricao": "Massa amanteigada com recheio de maçãs caramelizadas e canela.",
      "conteudo": "Uma sobremesa reconfortante e aromática. As fatias de maçã são levemente cozidas com açúcar mascavo e canela antes de irem ao forno na massa podre.",
      "destaque": false,
      "tempoPreparo": "60 minutos",
      "rendimento": "8 fatias",
      "dificuldade": "Fácil",
      "calorias": "380 kcal",
      "imagemPrincipal": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/11/Apple_pie_7.jpg/960px-Apple_pie_7.jpg"
    },
    {
      "id": 104,
      "nome": "Salada Caesar",
      "tipo": "Entrada / Leve",
      "descricao": "Alface romana crocante, croutons temperados e molho caesar especial.",
      "conteudo": "Leve, refrescante e cheia de texturas. O molho leva anchovas, alho, mostarda dijon e azeite, garantindo um sabor marcante.",
      "destaque": false,
      "tempoPreparo": "15 minutos",
      "rendimento": "2 porções",
      "dificuldade": "Fácil",
      "calorias": "290 kcal",
      "imagemPrincipal": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Caesar_salad_%282%29.jpg/960px-Caesar_salad_%282%29.jpg"
    },
    {
      "id": 105,
      "nome": "Panqueca Americana",
      "tipo": "Café da Manhã",
      "descricao": "Fofinhas e douradas, perfeitas para acompanhar com mel ou frutas.",
      "conteudo": "A rainha do café da manhã americano. Massa leve batida com um toque de essência de baunilha e fermento para garantir a altura ideal.",
      "destaque": true,
      "tempoPreparo": "20 minutos",
      "rendimento": "4 porções",
      "dificuldade": "Fácil",
      "calorias": "410 kcal",
      "imagemPrincipal": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Slicing_Pancakes_with_Fork_374819.jpg/960px-Slicing_Pancakes_with_Fork_374819.jpg"
    }
  ],

  // Entidades Secundárias das Receitas
  "detalhesReceitas": [
    { "id": 1, "receitaId": 101, "nome": "Fervendo a massa", "descricao": "Cozinhe o spaghetti em água generosamente salgada.", "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Spaghetti_boiling.jpg/960px-Spaghetti_boiling.jpg" },
    { "id": 2, "receitaId": 101, "nome": "Dourando o Guanciale", "descricao": "Frite em fogo baixo até ficar crocante.", "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Guanciale_di_Norcia.jpg/960px-Guanciale_di_Norcia.jpg" },
    { "id": 3, "receitaId": 101, "nome": "Mistura de Gemas e Pecorino", "descricao": "Bata as gemas com o queijo ralado.", "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Yolk.jpg/960px-Yolk.jpg" },
    { "id": 4, "receitaId": 102, "nome": "Refogando os cogumelos", "descricao": "Utilize shimeji e Paris frescos.", "imagem": "https://upload.wikimedia.org/wikipedia/commons/5/59/Baby_bella_mushrooms_being_saut%C3%A9ed.jpg" },
    { "id": 5, "receitaId": 102, "nome": "Adicionando o vinho branco", "descricao": "Deixe o álcool evaporar completamente.", "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/A_hand_pours_white_wine_from_a_bottle_into_a_glass%2C_capturing_the_festive_spirit_of_a_gathering_in_a_garden.jpg/960px-A_hand_pours_white_wine_from_a_bottle_into_a_glass%2C_capturing_the_festive_spirit_of_a_gathering_in_a_garden.jpg" },
    { "id": 6, "receitaId": 103, "nome": "Massa amanteigada", "descricao": "Misture farinha e manteiga gelada.", "imagem": "https://upload.wikimedia.org/wikipedia/commons/8/81/16-crust_in_dish.jpg" },
    { "id": 7, "receitaId": 104, "nome": "Montagem das folhas", "descricao": "Utilize alface romana bem higienizada.", "imagem": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/Romaine_lettuce.jpg/960px-Romaine_lettuce.jpg" },
    { "id": 8, "receitaId": 105, "nome": "Derramando a massa na chapa", "descricao": "Forme discos uniformes em fogo baixo.", "imagem": "https://upload.wikimedia.org/wikipedia/commons/3/34/Make_a_pancake.jpg" }
  ]
};

function carregarReceitas() {
    const container = document.getElementById('lista-receitas');
    if (!container) return;

    let htmlCards = '';

    dados.receitas.forEach(receita => {
        htmlCards += `
            <article class="col">
                <div class="card card-item h-100">
                    <div class="card-img-wrap">
                        <img src="${receita.imagemPrincipal}" alt="${receita.nome}" loading="lazy">
                        <span class="badge badge-tipo">${receita.tipo}</span>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">
                            <a href="detalhes.html?tipo=receita&id=${receita.id}" class="stretched-link text-reset">${receita.nome}</a>
                        </h3>
                        <p class="card-text">${receita.descricao}</p>
                    </div>
                </div>
            </article>
        `;
    });

    container.innerHTML = htmlCards;
}

function carregarRestaurantes() {
    const container = document.getElementById('lista-restaurantes');
    if (!container) return;

    let htmlCards = '';

    dados.restaurantes.forEach(restaurante => {
        htmlCards += `
            <article class="col">
                <div class="card card-item h-100">
                    <div class="card-img-wrap">
                        <img src="${restaurante.imagemPrincipal}" alt="${restaurante.nome}" loading="lazy">
                        <span class="badge badge-tipo">${restaurante.tipo}</span>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">
                            <a href="detalhes.html?tipo=restaurante&id=${restaurante.id}" class="stretched-link text-reset">${restaurante.nome}</a>
                        </h3>
                        <p class="card-text"><i class="fa-solid fa-location-dot"></i>${restaurante.endereco}</p>
                    </div>
                </div>
            </article>
        `;
    });

    container.innerHTML = htmlCards;
}

function carregarCarrosselDestaques() {
    const containerInner = document.getElementById('carousel-inner');
    const containerIndicators = document.getElementById('carousel-indicators');

    if (!containerInner || !containerIndicators) return;

    const receitasDestaque = dados.receitas.filter(item => item.destaque);
    const restaurantesDestaque = dados.restaurantes.filter(item => item.destaque);

    const listaDestaques = [...receitasDestaque, ...restaurantesDestaque];

    let htmlInner = '';
    let htmlIndicators = '';

    listaDestaques.forEach((item, index) => {
        const isActive = index === 0 ? 'active' : '';
        const tipoItem = item.endereco ? 'restaurante' : 'receita';
        const rotulo = tipoItem === 'restaurante' ? 'Restaurante' : 'Receita';

        htmlIndicators += `
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${isActive}" aria-current="${index === 0 ? 'true' : 'false'}" aria-label="Slide ${index + 1}"></button>
        `;

        htmlInner += `
            <div class="carousel-item ${isActive}">
                <a href="detalhes.html?tipo=${tipoItem}&id=${item.id}">
                    <img src="${item.imagemPrincipal}" class="d-block w-100" alt="${item.nome}">
                    <div class="carousel-caption">
                        <span class="badge rounded-pill text-bg-light">${rotulo} · ${item.tipo}</span>
                        <h5>${item.nome}</h5>
                        <p>${item.descricao}</p>
                    </div>
                </a>
            </div>
        `;
    });

    containerInner.innerHTML = htmlInner;
    containerIndicators.innerHTML = htmlIndicators;
}

function infoBloco(icone, rotulo, valor) {
    return `
        <div class="col-6 col-lg-3">
            <div class="info-bloco">
                <i class="fa-solid ${icone}"></i>
                <div><small>${rotulo}</small><strong>${valor}</strong></div>
            </div>
        </div>
    `;
}

function carregarDetalhesPagina() {
    const containerGerais = document.getElementById('detalhes-gerais');
    const containerVinculados = document.getElementById('lista-vinculados');
    if (!containerGerais || !containerVinculados) return;

    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo');
    const id = Number(urlParams.get('id'));

    let itemPrincipal = null;
    let listaSecundaria = [];

    if (tipo === 'receita') {
        itemPrincipal = dados.receitas.find(r => Number(r.id) === id);
        listaSecundaria = dados.detalhesReceitas.filter(d => Number(d.receitaId) === id);
    } else if (tipo === 'restaurante') {
        itemPrincipal = dados.restaurantes.find(r => Number(r.id) === id);
        listaSecundaria = dados.pratos.filter(p => Number(p.restauranteId) === id);
    }

    if (!itemPrincipal) {
        containerGerais.innerHTML = `
            <div class="col-12 p-4 text-center">
                <p class="text-danger mb-2"><i class="fa-solid fa-circle-exclamation"></i> Item não encontrado.</p>
                <a href="index.html" class="btn btn-sm btn-tema">Voltar ao início</a>
            </div>`;
        return;
    }

    document.title = `${itemPrincipal.nome} - Meu Caderno`;
    const migalha = document.getElementById('migalha-atual');
    if (migalha) migalha.textContent = itemPrincipal.nome;

    const badgeDestaque = itemPrincipal.destaque
        ? `<span class="badge badge-destaque"><i class="fa-solid fa-star"></i> Destaque</span>`
        : '';

    // Renderiza as informações gerais (5+ itens obrigatórios)
    if (tipo === 'receita') {
        containerGerais.innerHTML = `
            <div class="col-md-5 img-detalhes-wrap">
                <img src="${itemPrincipal.imagemPrincipal}" class="img-detalhes" alt="${itemPrincipal.nome}">
            </div>
            <div class="col-md-7">
                <div class="info-detalhes">
                    <div class="d-flex flex-wrap gap-2 mb-2">
                        <span class="badge badge-tema"><i class="fa-solid fa-bowl-food"></i> ${itemPrincipal.tipo}</span>
                        ${badgeDestaque}
                    </div>
                    <h1>${itemPrincipal.nome}</h1>
                    <p class="conteudo">${itemPrincipal.conteudo}</p>
                    <div class="row g-2">
                        ${infoBloco('fa-clock', 'Preparo', itemPrincipal.tempoPreparo)}
                        ${infoBloco('fa-users', 'Rendimento', itemPrincipal.rendimento)}
                        ${infoBloco('fa-signal', 'Dificuldade', itemPrincipal.dificuldade)}
                        ${infoBloco('fa-fire', 'Calorias', itemPrincipal.calorias)}
                    </div>
                </div>
            </div>
        `;
    } else {
        containerGerais.innerHTML = `
            <div class="col-md-5 img-detalhes-wrap">
                <img src="${itemPrincipal.imagemPrincipal}" class="img-detalhes" alt="${itemPrincipal.nome}">
            </div>
            <div class="col-md-7">
                <div class="info-detalhes">
                    <div class="d-flex flex-wrap gap-2 mb-2">
                        <span class="badge badge-tema"><i class="fa-solid fa-store"></i> ${itemPrincipal.tipo}</span>
                        ${badgeDestaque}
                    </div>
                    <h1>${itemPrincipal.nome}</h1>
                    <p class="conteudo">${itemPrincipal.conteudo}</p>
                    <div class="row g-2">
                        <div class="col-12">
                            <div class="info-bloco">
                                <i class="fa-solid fa-location-dot"></i>
                                <div><small>Endereço</small><strong>${itemPrincipal.endereco}</strong></div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="info-bloco">
                                <i class="fa-solid fa-comment-dots"></i>
                                <div><small>Descrição</small><strong>${itemPrincipal.descricao}</strong></div>
                            </div>
                        </div>
                        ${infoBloco('fa-tag', 'Tipo', itemPrincipal.tipo)}
                        ${infoBloco('fa-star', 'Destaque', itemPrincipal.destaque ? 'Sim' : 'Não')}
                    </div>
                </div>
            </div>
        `;
    }

    // Título da seção secundária
    const tituloVinculados = document.getElementById('titulo-vinculados');
    if (tituloVinculados) {
        tituloVinculados.innerHTML = tipo === 'receita'
            ? `<i class="fa-solid fa-list-ol"></i> Passo a passo`
            : `<i class="fa-solid fa-utensils"></i> Pratos`;
    }

    // Renderiza os itens/fotos vinculadas (Entidade Secundária)
    let htmlSecundario = '';
    if (listaSecundaria.length > 0) {
        listaSecundaria.forEach((sec, index) => {
            const numero = tipo === 'receita' ? `<span class="card-numero">${index + 1}</span>` : '';
            htmlSecundario += `
                <div class="col">
                    <div class="card card-item h-100">
                        <div class="card-img-wrap">
                            <img src="${sec.imagem}" alt="${sec.nome}" loading="lazy">
                            ${numero}
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${sec.nome}</h5>
                            <p class="card-text">${sec.descricao}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        htmlSecundario = `<p class="text-muted">Nenhum item ou foto adicional cadastrada para este item.</p>`;
    }

    containerVinculados.innerHTML = htmlSecundario;
}

document.addEventListener('DOMContentLoaded', () => {
    carregarReceitas();
    carregarRestaurantes();
    carregarCarrosselDestaques();
    carregarDetalhesPagina();
});
