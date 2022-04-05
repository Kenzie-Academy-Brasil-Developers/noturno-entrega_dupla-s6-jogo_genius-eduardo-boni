let ordem =  [];
let ordemClick = [];
let pontuacao = 0;

function criarBotao() {
    const main = document.getElementById('main');
    const box = document.createElement('div');
    box.classList.add('container');
    box.innerHTML = `
        <div>
            <div class="btnGreen"></div>
            <div class="btnYellow"></div>
        </div>
        <div>
            <div class="btnRed"></div>
            <div class="btnBlue"></div>
        </div>
        <div class="infos"></div>
    `
    main.appendChild(box);
}
criarBotao();

const green = document.querySelector('.btnGreen');
const yellow = document.querySelector('.btnYellow');
const red = document.querySelector('.btnRed');
const blue = document.querySelector('.btnBlue');

let sequenciaAleatoria = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    ordem[ordem.length] = colorOrder;
    ordemClick = [];

    for (let i in ordem) {
        let elementColor = criaCorElemento(ordem[i]);
        ascendeLuz(elementColor, Number(i) + 1);
    }
}

let ascendeLuz = (elemento, number) => {
    number = number * 500;
    setTimeout(() => {
        elemento.classList.add('selected');

    }, number - 200);

    setTimeout(() => {
        elemento.classList.remove('selected');
    }, number);
}

let checarOrdem = () => {
    for (let i in ordemClick) {
        if (ordemClick[i] != ordem[i]) {
            fimDeJogo();
            break;
        }
    }
    if (ordemClick.length == ordem.length) {
        alert(`Pontuação: ${pontuacao} Você acertou! Próximo nível.`);
        proximaFase();
    }
}

let click = (cor) => {
  ordemClick[ordemClick.length] = cor;
  criaCorElemento(cor).classList.add('selected');

    setTimeout(() => {
        criaCorElemento(cor).classList.remove('selected');
        checarOrdem();
    }, 350);
}

let criaCorElemento = (cor) => {
    if (cor == 0) {
        return green;
    } else if (cor == 1) {
        return yellow;
    } else if (cor == 2) {
        return red;
    } else {
        return blue;
    }
}

let proximaFase = () => {
  pontuacao++;
  sequenciaAleatoria();
}

let fimDeJogo = () => {
    alert(`Pontuação: ${pontuacao} Você perdeu!`);
    alert('Jogar Novamente!');
    ordem = [];
    ordemClick = [];
    iniciarJogo();
}

let iniciarJogo = (restart) => {
    alert('Tente acertar as cores!');
    pontuacao = 0;
    proximaFase();
}

green.onclick = () => click(0);
yellow.onclick = () => click(1);
red.onclick = () => click(2);
blue.onclick = () => click(3);

iniciarJogo();