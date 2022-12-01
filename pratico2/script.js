
function Games() {
    fetch('https://api.rawg.io/api/games?key=31bafbd2df054faa9e54ad41a08efe77&dates=2022-01-01,2022-01-13')
        .then(resposta => resposta.json())
        .then(dados => {
            let str = '';
            for (let i = 8; i < 14; i++) {
                let lancamento = dados.results[i];

                str += `  <div class="col-12 col-md-6 col-xl-4 gamescard"> 
                             <div class="games">
                            <div class="gamesinformaçao">
                                    <div class="gamesinformaçaotitulo">
                                        <h5>${lancamento.name}</h5>
                                    </div>
                                <div class="gamesimagem">
                                    <img src="${lancamento.background_image}" alt="capa do jogo">
                                </div>
                                    <div class="gamesinformaçaotext">
                                        <div class="gamesinformaçaotexttitulo">
                                        <p>Disponivel em:</p>
                                        <p>Data de Lançamento:</p>                                              
                                        </div>
                                        <div class="gamesinformaçaotextadicionais">
                                        <p>${lancamento['stores'][0].store.name}</p>
                                            <p>${lancamento.released}</p>
                                            
                                        </div>
                                    </div>
                                        <div class="gamesinformaçaotextdetalhes">
                                            <a href="detalhes.html?id=${[i]}" target="_blank"><button>Detalhes</button></a>
                                        </div>
                                    </div>
                                </div>

                                
                            </div>
                        </div>`;
            }

            document.getElementById('partegames').innerHTML = str;
        })
}


function Lojas() {
    fetch('https://api.rawg.io/api/stores?key=31bafbd2df054faa9e54ad41a08efe77')

        .then(resposta => resposta.json())
        .then(dados => {
            let str = '';
            for (let i = 1; i < 4; i++) {
                let lojas = dados.results[i];
                str += `<div class="col-12 col-md-6 col-xl-3 lojascard">
                            <div class="lojas">
                                <div class="lojasimagem">
                                    <img src="${lojas.image_background}" alt="capa do jogo">
                                </div>

                                <div class="lojasnome">
                                    <h4>${lojas.name}</h4>
                                </div>
                                <div class="lojaslink">
                                            <a href="https://${lojas.domain}" target=""><button>Ver Mais</button></a>
                                        </div>
                                 
                                </div>
                            </div>
                        </div>`;
            }

            document.getElementById('partelojas').innerHTML = str;
        })
}

//////
function exibePaginaLancamento(it) {
    fetch('https://api.rawg.io/api/games?key=31bafbd2df054faa9e54ad41a08efe77&dates=2022-01-01,2022-11-13')
        .then(resposta => resposta.json())
        .then(dados => {
            let jogo = dados.results[it];


            let nome = '';
            let imagem = '';
            let titulo = '';
            let plataformas = '<b>Disponivel nas seguintes plataformas : </b>';
            let lancamento = '';
            let avaliacao = '';
            let generos = '<b>Gênero</b> :';
            


            nome = `Detalhes - ${jogo.name}`;

            imagem = `<img src="${jogo.background_image}" alt="Imagem do jogo">`;

            titulo = `<h1>${jogo.name}</h1>`;
            
          

            for (let i = 0; i < jogo.platforms.length; i++) {
                plataformas += `  ${jogo['platforms'][i].platform.name}</p>`;
            }

            lancamento = `<p><b>Lançamento</b>: ${jogo.released}</p>`;

            avaliacao = `<p><b>Avaliação</b>: ${jogo.rating} / 5</p>`;

            for (let i = 0; i < jogo.genres.length; i++) {
                generos += ` ${jogo['genres'][i].name}</h4>`;
            }


            document.querySelector('title').innerHTML = nome;

            document.getElementById('bannerImagem').innerHTML = imagem;
            document.getElementById('bannerTitulo').innerHTML = titulo;
            document.getElementById('bannerPlataformas').innerHTML = plataformas;
            document.getElementById('bannerLancamento').innerHTML = lancamento;
            document.getElementById('bannerAvaliacao').innerHTML = avaliacao;
            document.getElementById('bannerGeneros').innerHTML = generos;
            


        })
}



function Pesquisa(nomeGame) {
    Promise.all([
        fetch('https://api.rawg.io/api/games?key=31bafbd2df054faa9e54ad41a08efe77&page=1&page_size=100').then(resposta => resposta.json()),
        fetch('https://api.rawg.io/api/games?key=31bafbd2df054faa9e54ad41a08efe77&page=2&page_size=100').then(resposta => resposta.json()),
        fetch('https://api.rawg.io/api/games?key=31bafbd2df054faa9e54ad41a08efe77&page=3&page_size=100').then(resposta => resposta.json()),
    ])
        .then(dados => {
            let str = '';
            let strCabecalho = '';
            let filter = nomeGame.toUpperCase();

            let cont = 0;

            strCabecalho = `<h4>Achamos ${cont} resultados para: <span >"${nomeGame}"</span></h4>`;

            for (let j = 0; j < dados.length; j++) {
                for (let i = 0; i < dados[j].results.length; i++) {
                    let game = dados[j].results[i];
                    txtValue = game.name;

                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        cont++;

                        strCabecalho = `<h4>${cont} resultado(s) encontrado(s) para: <span >"${nomeGame}"</span></h4>`;

                        str += `<div class="col-12 col-md-6 col-xl-4 card">
                                    <div class="resultado">
                                        <div class="imagem">
                                            <img src="${game.background_image}" alt="Imagem do jogo">
                                        </div>

                                        <div class="descricao">
                                            <h5>${game.name}</h5>
                                            <div class="infos">
                                                <div class="infostitulos">
                                                    <p>Lançamento:</p>
                                                </div>

                                                <div class="dados">
                                                    <p>${game.released}</p>
                                                </div>
                                            </div>

                                                <div class="link">
                                                    <a href="detalhes.html?rd=${[j]}&cd=${[i]}" target="_blank"><button><p>Detalhes</p></button></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                    }
                }
            }

            document.getElementById('resultadoPesquisa').innerHTML = str;
            document.getElementById('cabecalhoPesquisa').innerHTML = strCabecalho;
        })
}

let barraPesquisaHeader = document.querySelector('.barra--pesquisa');

barraPesquisaHeader.addEventListener('submit', (event) => {
    if (document.querySelector('#input-pesquisa').value.length < 1) {
        event.preventDefault();
    }
});