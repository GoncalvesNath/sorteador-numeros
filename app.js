function sortear(){
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let de = parseInt(document.getElementById('de').value);
    let ate = parseInt(document.getElementById('ate').value);

    if (de >= ate) {
        alert('Campo "Do número" deve ser inferior ao campo "Até o número". Verifique!');
        return;
    }

    if (quantidade > (ate - de + 1)) {
        alert('Campo "Quantidade" deve ser menor ou igual ao intervalo informado no campo "Do número" até o campo "Até o número". Verifique!');
        return;
    }

    let sorteados = [];
    let numero;

    for (let i = 0; i < quantidade; i++) {
        numero = obterNumeroAleatorio(de, ate);

        while (sorteados.includes(numero)) {
            numero = obterNumeroAleatorio(de, ate);
        }

        sorteados.push(numero);
    }

    mostrarResultado(sorteados);
    alterarStatusBotao();
}

function mostrarResultado(sorteados) {
    let resultado = document.getElementById('resultado');
    let copiarContainer = document.getElementById('copiarContainer');

    let limite = 6;
    let numerosExibidos = sorteados.slice(0, limite).join(", ");
    let textoCompleto = sorteados.join(", ");
    
    if (sorteados.length > limite) {
        numerosExibidos += "...";
        copiarContainer.innerHTML = `<button onclick="copiarNumeros('${textoCompleto}')" class="container__botao-copiar">Copiar Números</button>`;
    } else {
        copiarContainer.innerHTML = "";  // Remove o botão se não houver números ocultados
    }

    resultado.innerHTML = `<label class="texto__paragrafo texto__sorteados">Números sorteados: <span id="numeros__sorteados">${numerosExibidos}</span></label>`;
}

function copiarNumeros(textoCompleto) {
    navigator.clipboard.writeText(textoCompleto)
        .then(() => alert("Números copiados com sucesso!"))
        .catch(err => alert("Erro ao copiar os números: " + err));
}

function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function alterarStatusBotao() {
    let botao = document.getElementById('btn-reiniciar');
    if (botao.classList.contains('container__botao-desabilitado')) {
        botao.classList.remove('container__botao-desabilitado');
        botao.classList.add('container__botao');
    } else {
        botao.classList.remove('container__botao');
        botao.classList.add('container__botao-desabilitado');
    }
}

function reiniciar() {
    document.getElementById('quantidade').value = '';
    document.getElementById('ate').value = '';
    document.getElementById('de').value = '';
    document.getElementById('resultado').innerHTML = '<label class="texto__paragrafo">Números sorteados: nenhum até agora</label>';
    document.getElementById('copiarContainer').innerHTML = '';  // Remove o botão de copiar
    alterarStatusBotao();
}
