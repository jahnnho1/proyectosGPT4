const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const debugInfo = document.getElementById("debugInfo");

// Configuración del juego
const FPS = 30;

// Variables del jugador
const player = {
  x: 100,
  y: 100,
  size: 20,
  speed: 4,
  color: "blue",
};

// Variables del enemigo
const enemy = {
  x: 300,
  y: 300,
  size: 20,
  speed: 2,
  color: "red",
};

// Variables del mapa
const tileSize = 40;
const mapRows = 15;
const mapCols = 20;
const map = [
  "####################",
  "#..................#",
  "#.####..####..####.#",
  "#.####..####..####.#",
  "#.####..####..####.#",
  "#..................#",
  "#.####..####..####.#",
  "#.####..####..####.#",
  "#.####..####..####.#",
  "#..................#",
  "#.####..####..####.#",
  "#.####..####..####.#",
  "#.####..####..####.#",
  "#..................#",
  "####################",
];

// Manejo de entrada del teclado
const keys = {};
document.addEventListener("keypress", (e) => {
    switch (e.code) {
        case "KeyW":
        case "ArrowUp":
            movePlayer(0, -player.speed);
            break;
        case "KeyS":
        case "ArrowDown":
            movePlayer(0, player.speed);
            break;
        case "KeyA":
        case "ArrowLeft":
            movePlayer(-player.speed, 0);
            break;
        case "KeyD":
        case "ArrowRight":
            movePlayer(player.speed, 0);
            break;
    }
});

// Bucle principal del juego
function gameLoop() {
  update();
  render();
  setTimeout(gameLoop, 1000 / FPS);
}

// Actualizar lógica del juego
function update() {
  // Movimiento del jugador
  if (keys["KeyW"] || keys["ArrowUp"]) movePlayer(0, -player.speed);
  if (keys["KeyS"] || keys["ArrowDown"]) movePlayer(0, player.speed);
  if (keys["KeyA"] || keys["ArrowLeft"]) movePlayer(-player.speed, 0);
  if (keys["KeyD"] || keys["ArrowRight"]) movePlayer(player.speed, 0);

  // Enemigo sigue al jugador
  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Movimiento del enemigo hacia el jugador
  enemy.x += (dx / distance) * enemy.speed;
  enemy.y += (dy / distance) * enemy.speed;

  // Actualizar información de depuración
  debugInfo.innerHTML = `Player: (${player.x.toFixed(1)}, ${player.y.toFixed(
    1
  )})<br>Enemy: (${enemy.x.toFixed(1)}, ${enemy.y.toFixed(1)})`;
}

// Intenta mover al jugador y verifica las colisiones con las paredes
function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  if (!isWallCollision(newX, newY)) {
    player.x = newX;
    player.y = newY;
  }
}

function isWallCollision(x, y) {
    const halfSize = player.size / 2;
    const leftX = x - halfSize;
    const rightX = x + halfSize;
    const topY = y - halfSize;
    const bottomY = y + halfSize;

    const topLeftTile = getTile(leftX, topY);
    const topRightTile = getTile(rightX, topY);
    const bottomLeftTile = getTile(leftX, bottomY);
    const bottomRightTile = getTile(rightX, bottomY);

    return (
        topLeftTile === "#" ||
        topRightTile === "#" ||
        bottomLeftTile === "#" ||
        bottomRightTile === "#"
    );
}

function getTile(x, y) {
    const tileX = Math.floor(x / tileSize);
    const tileY = Math.floor(y / tileSize);
    return map[tileY] && map[tileY][tileX];
}
// Renderizar el juego en el canvas
function render() {
  // Limpia el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibuja el mapa
  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      if (map[y][x] === "#") {
        ctx.fillStyle = "white";
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }

  // Dibuja al jugador y al enemigo
  ctx.fillStyle = player.color;
  ctx.fillRect(
    player.x - player.size / 2,
    player.y - player.size / 2,
    player.size,
    player.size
  );
  ctx.fillStyle = enemy.color;
  ctx.fillRect(
    enemy.x - enemy.size / 2,
    enemy.y - enemy.size / 2,
    enemy.size,
    enemy.size
  );
}

// Iniciar el juego
gameLoop();
