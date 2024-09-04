document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventoId = urlParams.get('eventoId');
    const eventoContent = document.getElementById('eventoContent');

    if (!eventoContent) {
        console.error('Elemento com id "eventoContent" não encontrado.');
        return;
    }

    // Definições de coordenadas e descrições para cada evento
    const eventos = {
        tatus: {
            title: "5º Encontro de Trilheiros Tatus na Lama",
            detalhes: "Dias 21 e 22 de setembro",
            description: "Venha participar do maior encontro de trilheiros da região! Aventura, diversão e muita lama aguardam por você. O encontro será realizado nos dias 21 e 22 de novembro no munícipio de Arroio do Padre com trilhas para todos os tipos de pilotos, contando com desafios e muita emoção.",
            images: ["img/tatus1.jpg", "img/tatus.jpg", "img/tatus3.jpg"],
            lat: -31.43901,
            lng: -52.41506
        },
        colono: {
            title: "8ª Trilha do Colono",
            detalhes: "Dia 29 de Setembro",
            description: "Uma trilha emocionante com belas paisagens e desafios para todos os níveis. Não perca essa experiência incrível. A trilha do colono se realizara nos dias 07 e 08 de setembro na cidade de Sertão Santana, venha e divirta-se",
            images: ["img/trilha_colono.jpg", "img/trilha_colono.jpg", "img/trilha_colono_insc.jpg"],
            lat: -30.462707,
            lng: -51.603977
        },
        cora: {
            title: "Competição para motos acima de 300cc",
            detalhes: "Dia 15 de Setembro",
            description: "A competiçãos realizara-se no dia 15 de setembro de 2024 no autódromo nacional de Cascavel/PR, com categorias acima de 300cc, venha se diverir e competir, sentindo toda a emoção de pilotar em alta velocidade em pistas desafiadoras.",
            images: ["img/guapore.webp", "img/autódromo1.jpg", "img/autodromo2.jpg"],
            lat: -24.978149526967844,
            lng:  -53.38423536138158
        },
        corb: {
            title: "Competições Para Motos Esportivas",
            detalhes: "Dia 15 de Setembro",
            description: "A competiçãos realizara-se no dia 15 de setembro de 2024 no autódromo nacional de Guaporé, com categorias acima de 600cc, venha se diverir e competir, sentindo toda a emoção de pilotar em alta velocidade em pistas desafiadoras.",
            images: ["img/guapore.webp", "img/autódromo1.jpg", "img/autodromo2.jpg"],
            lat: -28.844172437390117,
            lng: -51.85203306885826
        },
        enduro: {
            title: "Campeonato Gaucho de Enduro",
            detalhes: "Dia 17 de Novembro",
            description: "Vem ai mais uma etapa do campeonato gaucho de enduro, desta vez na cidade de São Marcos/RS, venha correr e se divertir, contamos com espaço kids e área de acampamento.",
            images: ["img/endur.png", "img/end2.png", "img/end1.png"],
            lat: -28.982646514326756,
            lng:  -51.06682520033999
        },
        cross: {
            title: "8ª Etapa Do campeonato Zona Sul",
            detalhes: "Dia 15 de Setembro",
            description: "Vem ai mais uma etapa do campeonato zona sul de cross country, desta vez na cidade de São Lourenço do Sul/RS, venha correr e se divertir, contamos com várias categorias, almoço e área de acampamento.",
            images: ["img/cross.jpg", "img/moto2.jpg", "img/cross1.jpg"],
            lat: -31.313784338732304,
            lng: -52.23352980013781
        },
        serraa: {
            title: "Serra do Rio Do Rastro",
            detalhes: "Dia 25 de Dezembro",
            description: "Expeição para conhecer a famosa Serra do Rio do Rastro, o sonho de qualquer motociclista aventureiro, junte-se a nós nesta incrivel viajem com saída no dia 25 de Dezembro, viajem para todos os tipos de motos com paradas para gasolina e descanço. Vem com a gente.",
            images: ["img/serra1.jpeg", "img/serra2.jpg", "img/serra3.webp"],
            lat: -28.40637222002411, 
            lng: -49.54602516930922
        },
        serrab: {
            title: "Serra do Corvo Branco",
            detalhes: "Dia 15 de Dezembro",
            description: "Expeição para conhecer a famosa Serra do Corvo Branco, o sonho de qualquer motociclista aventureiro, junte-se a nós nesta incrivel viajem com lindas paisagens e perigos do caminho com curvas sinuosas e escorregadias, tendo saída no dia 15 de Dezembro, viajem para todos os tipos de motos com paradas para gasolina e descanço. Vem com a gente.",
            images: ["img/serrab.jpeg", "img/serrab2.jpg", "img/serrab1.jpg"],
            lat: -28.056264513123413, 
            lng: -49.36699569030557
        }

    };

    const evento = eventos[eventoId];

    if (evento) {
        eventoContent.innerHTML = `
            <h2>${evento.title}</h2>
            <p>${evento.detalhes}</p>
            <div class="eventimg">
                ${evento.images.map(img => `<img src="${img}" alt="${evento.title}">`).join('')}
            </div>
            <div class="central-box">
                <p>${evento.description}</p>
            </div>
            <div id="map" class="map-container"></div>

            <!-- Formulário de inscrição -->
            <form id="inscricaoForm">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required><br><br>

                <label for="cidade">Cidade:</label>
                <input type="text" id="cidade" name="cidade" required><br><br>

                <label for="telefone">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" required><br><br>

                <label for="grupo">Grupo:</label>
                <input type="text" id="grupo" name="grupo"><br><br>

                <label for="tamanho">Tamanho da Camiseta:</label>
                <select id="tamanho" name="tamanho" required>
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                </select><br><br>

                <input type="submit" value="Inscrever-se">
            </form>
        `;

        // Inicializar o mapa
        const map = L.map('map').setView([evento.lat, evento.lng], 13);

        // Adicionar camada de mapa OSM
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Adicionar marcador
        L.marker([evento.lat, evento.lng]).addTo(map)
            .bindPopup(evento.title)
            .openPopup();
    } else {
        eventoContent.innerHTML = `
            <h2>Evento não encontrado</h2>
            <p>Desculpe, não foi possível encontrar detalhes sobre o evento selecionado.</p>
        `;
    }

    // Adicionar o evento de submissão do formulário
    document.getElementById('inscricaoForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const telefone = document.getElementById('telefone').value;
        
        // Validação do telefone (apenas exemplo, ajuste conforme necessário)
        if (telefone.length < 10) {
            alert('O número de telefone deve ter pelo menos 10 caracteres.');
            return;
        }
        
        alert('Inscrição realizada com sucesso!');
        
        // Limpar o formulário após o envio
        this.reset();
    });
});
