// Cambia el contenido del archivo por el siguiente código:

class Character {
  constructor(name, health, attackPower, healPower, element) {
    this.name = name;
    this.health = health;
    this.attackPower = attackPower;
    this.healPower = healPower;
    this.element = element;
  }

  attack(target) {
    target.health -= this.attackPower;
    target.updateHealthDisplay();
    target.element.style.animation = "hit 1s";
    setTimeout(() => {
      target.element.style.animation = "none";
    }, 1000);
  }

  heal() {
    this.health += this.healPower;
    this.updateHealthDisplay();
    this.element.style.animation = "heal 1s";
    setTimeout(() => {
      this.element.style.animation = "none";
    }, 1000);
  }

  updateHealthDisplay() {
    this.element.textContent = `${this.name}: ${this.health}`;
  }
}

const playerElement = document.getElementById("player");
const enemyElement = document.getElementById("enemy");

const player = new Character("Jugador", 100, 10, 5, playerElement);
const enemy = new Character("Enemigo", 50, 5, 0, enemyElement);

const messageElement = document.getElementById("message");
const attackBtn = document.getElementById("attackBtn");
const healBtn = document.getElementById("healBtn");

attackBtn.addEventListener("click", () => {
  player.attack(enemy);
  enemy.attack(player);

  if (enemy.health <= 0) {
    messageElement.innerText = "¡Has derrotado al enemigo!";
    attackBtn.disabled = true;
    healBtn.disabled = true;
  } else if (player.health <= 0) {
    messageElement.innerText = "Has sido derrotado...";
    attackBtn.disabled = true;
    healBtn.disabled = true;
  } else {
    messageElement.innerText = `Atacaste al enemigo. Te quedan ${player.health} puntos de vida y el enemigo tiene ${enemy.health}.`;
  }
});

healBtn.addEventListener("click", () => {
  player.heal();
  enemy.attack(player);

  if (player.health <= 0) {
    messageElement.innerText = "Has sido derrotado...";
    attackBtn.disabled = true;
    healBtn.disabled = true;
  } else {
    messageElement.innerText = `Te curaste. Ahora tienes ${player.health} puntos de vida. El enemigo tiene ${enemy.health}.`;
  }
});
