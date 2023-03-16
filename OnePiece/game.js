const characters = [
  {
    name: "Luffy",
    description:
      "El capitán de los Piratas del Sombrero de Paja y come la Gomu Gomu no Mi",
  },
  {
    name: "Zoro",
    description: "El espadachín de tres katanas y cazador de piratas",
  },
  {
    name: "Nami",
    description: "La navegante y ladrona del grupo, amante de las naranjas",
  },
  {
    name: "Usopp",
    description: "El francotirador y cuentacuentos, hijo de Yasopp",
  },
  {
    name: "Sanji",
    description: "El cocinero y caballero, nacido en el North Blue",
  },
  {
    name: "Chopper",
    description: "El médico y reno que come la Hito Hito no Mi",
  },
  { name: "Robin", description: "La arqueóloga y superviviente de Ohara" },
  {
    name: "Franky",
    description: "El carpintero y cyborg que construye el Thousand Sunny",
  },
  {
    name: "Brook",
    description: "El músico esquelético que come la Yomi Yomi no Mi",
  },
  {
    name: "Jinbe",
    description: "El timonel y ex-shichibukai, un hombre-pez tiburón ballena",
  },
];

let currentCharacter;

function getRandomCharacter() {
  return characters[Math.floor(Math.random() * characters.length)];
}

function newCharacter() {
  reproducirMusica();
  currentCharacter = getRandomCharacter();
  document.getElementById("description").innerText =
    currentCharacter.description;
  document.getElementById("guess").value = "";
  document.getElementById("result").innerText = "";
}

function checkGuess() {
  reproducirMusica();
  const guess = document.getElementById("guess").value.trim();
  if (guess.toLowerCase() === currentCharacter.name.toLowerCase()) {
    document.getElementById("result").innerText =
      "¡Correcto! El personaje es " + currentCharacter.name + ".";
  } else {
    document.getElementById("result").innerText =
      "Incorrecto. ¡Inténtalo de nuevo!";
  }
}

// Inicializando el primer personaje al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  newCharacter();
});

function reproducirMusica() {
  const backgroundMusic = document.getElementById("background-music");
  backgroundMusic.volume = 0.3; // Ajustar el volumen
  backgroundMusic.play();
}
