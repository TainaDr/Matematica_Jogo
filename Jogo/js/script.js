const cartas = [
    { nome: "Matriz Antissimétrica", img: "../img/Matriz Antissimétrica.png", desc: "Espelhada com sinais opostos." },
    { nome: "Matriz Coluna", img: "../img/Matriz Coluna.png", desc: "Possui apenas uma coluna." },
    { nome: "Matriz Diagonal", img: "../img/Matriz Diagonal.png", desc: "Zeros fora da diagonal principal." },
    { nome: "Matriz Escalar", img: "../img/Matriz Escalar.png", desc: "Diagonal com valores iguais." },
    { nome: "Matriz Identidade", img: "../img/Matriz Identidade.png", desc: "Diagonal com 1, zeros fora." },
    { nome: "Matriz Linha", img: "../img/Matriz Linha.png", desc: "Possui apenas uma linha." },
    { nome: "Matriz Normal", img: "../img/Matriz Normal.png", desc: "Multiplicada pela transposta mantém estrutura." },
    { nome: "Matriz Nula ou Zero", img: "../img/Matriz Nula ou Zero.png", desc: "Todos os elementos são zero." },
    { nome: "Matriz Quadrada", img: "../img/Matriz Quadrada.png", desc: "Tem o mesmo número de linhas e colunas." },
    { nome: "Matriz Retangular", img: "../img/Matriz Retangular.png", desc: "Linhas e colunas diferentes." },
    { nome: "Matriz Simétrica", img: "../img/Matriz Simétrica.png", desc: "Igual à transposta." },
    { nome: "Matriz Transposta", img: "../img/Matriz Transposta.png", desc: "Troca linhas por colunas." },
    { nome: "Matriz Triângulo Inferior", img: "../img/Matriz Triângulo Inferior.png", desc: "Zeros acima da diagonal." },
    { nome: "Matriz Triângulo Superior", img: "../img/Matriz Triângulo Superior.png", desc: "Zeros abaixo da diagonal." },
    { nome: "Matriz Unidade", img: "../img/Matriz Unidade.png", desc: "Outro nome para identidade." }
];

const pares = [];
cartas.forEach((carta, index) => {
    pares.push({ id: index, tipo: "img", conteudo: `Cartas/${carta.img}` });
    pares.push({ id: index, tipo: "txt", conteudo: carta.desc });
});

// Embaralha os pares
pares.sort(() => Math.random() - 0.5);

const game = document.getElementById('game');
let flipped = [];
let lock = false;
let score1 = 0;
let score2 = 0;
let jogador = 1;

const updatePlacar = () => {
    document.getElementById('score1').textContent = score1;
    document.getElementById('score2').textContent = score2;
    document.getElementById('jogador-vez').textContent = `Vez de: Player ${jogador}`;
};

updatePlacar();

pares.forEach(carta => {
    const div = document.createElement('div');
    div.className = 'card';
    div.dataset.id = carta.id;
    div.dataset.tipo = carta.tipo;

    div.innerHTML = `
    <div class="card-inner">
        <div class="card-back">?</div>
        <div class="card-front">
        ${carta.tipo === 'img'
            ? `<img src="${carta.conteudo}" alt="Imagem">`
            : `<span>${carta.conteudo}</span>`}
        </div>
    </div>
    `;

    div.addEventListener('click', () => {
    if (lock || div.classList.contains('matched') || div.classList.contains('flipped')) return;

    div.classList.add('flipped');
    flipped.push(div);

    if (flipped.length === 2) {
        lock = true;
        const [a, b] = flipped;

        if (a.dataset.id === b.dataset.id && a.dataset.tipo !== b.dataset.tipo) {
        a.classList.add('matched');
        b.classList.add('matched');

        setTimeout(() => {
            a.classList.add('invisivel');
            b.classList.add('invisivel');
            if (jogador === 1) score1++; else score2++;
            updatePlacar();
            flipped = [];
            lock = false;
        }, 600);
        } else {
        setTimeout(() => {
            a.classList.remove('flipped');
            b.classList.remove('flipped');
            jogador = jogador === 1 ? 2 : 1;
            updatePlacar();
            flipped = [];
            lock = false;
        }, 1000);
        }
    }
    });

    game.appendChild(div);
});