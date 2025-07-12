let listaDeNumerosSortados = [];
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 0;

function falarTexto(texto) {
  responsiveVoice.cancel();
  responsiveVoice.speak(texto, "Brazilian Portuguese Female");
}

function exibirTextoNaTela(tag, texto) {
  const campo = document.querySelector(tag);
  campo.innerHTML = texto;

  // Fala apenas se for h1 ou parágrafo principal
  if (tag === "h1" || tag === "p.texto__paragrafo") {
    const textoLimpo = texto.replace(/<[^>]*>/g, "");
    falarTexto(textoLimpo);
  }
}

exibirTextoNaTela(
  "h1",
  'Adivinhe o <span class="container__texto-azul">número secreto</span>'
);
exibirTextoNaTela("p.texto__paragrafo", "Escolha um número entre 1 a 100");

function gerarNumeroAleatorio() {
  if (listaDeNumerosSortados.length >= 100) {
    exibirTextoNaTela("h1", "Jogo encerrado!");
    exibirTextoNaTela(
      "p.texto__paragrafo",
      "Todos os números entre 1 e 100 já foram escolhidos."
    );
    document.querySelector(".container__input").disabled = true;
    document.querySelector(".container__botao").disabled = true;
    document.querySelector("#reiniciar").disabled = false;
    return null;
  }

  let novoNumeroAleatorio = parseInt(Math.random() * 100) + 1;
  while (listaDeNumerosSortados.includes(novoNumeroAleatorio)) {
    novoNumeroAleatorio = parseInt(Math.random() * 100) + 1;
  }

  listaDeNumerosSortados.push(novoNumeroAleatorio);
  console.log("Número sorteado:", novoNumeroAleatorio); // Debug
  return novoNumeroAleatorio;
}

function verificarChute() {
  tentativas++;
  const palavra = tentativas > 1 ? "tentativas" : "tentativa";
  const campoInput = document.querySelector(".container__input");
  const chute = parseInt(campoInput.value);

  if (isNaN(chute) || chute < 1 || chute > 100) {
    exibirTextoNaTela(
      "p.texto__paragrafo",
      "Por favor, digite um número de 1 a 100."
    );
    return;
  }

  if (chute === numeroAleatorio) {
    exibirTextoNaTela(
      "h1",
      `Parabéns! <span class="container__texto-azul">Você acertou o número secreto!</span>`
    );
    exibirTextoNaTela(
      "p.texto__paragrafo",
      `O número secreto era ${numeroAleatorio} e você acertou em ${tentativas} ${palavra}.`
    );
    exibirTextoNaTela("#reiniciar", "Reiniciar Jogo");
    document.querySelector(".container__input").disabled = true;
    document.querySelector(".container__botao").disabled = true;
    document.querySelector("#reiniciar").disabled = false;
    document.querySelector(".container__input").value = "";
  } else if (chute < numeroAleatorio) {
    exibirTextoNaTela("h1", "Você errou...");
    exibirTextoNaTela(
      "p.texto__paragrafo",
      `O número secreto é maior que ${chute}.`
    );
  } else {
    exibirTextoNaTela("h1", "Você errou...");
    exibirTextoNaTela(
      "p.texto__paragrafo",
      `O número secreto é menor que ${chute}.`
    );
  }

  campoInput.value = "";
}

function reiniciarJogo() {
  tentativas = 0;
  listaDeNumerosSortados = [];
  numeroAleatorio = gerarNumeroAleatorio();

  if (numeroAleatorio === null) {
    return;
  }

  exibirTextoNaTela(
    "h1",
    'Adivinhe o <span class="container__texto-azul">número secreto</span>'
  );
  exibirTextoNaTela("p.texto__paragrafo", "Escolha um número entre 1 a 100");
  document.querySelector(".container__input").disabled = false;
  document.querySelector(".container__botao").disabled = false;
  document.querySelector("#reiniciar").disabled = true;
  document.querySelector(".container__input").value = "";
  exibirTextoNaTela("#reiniciar", "Novo jogo");
}
