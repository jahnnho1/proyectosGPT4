// Configuración del juego
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Crear instancia del juego
const game = new Phaser.Game(config);

// Variables globales
let jugador;
let enemigo;


function create() {
    jugador = this.physics.add.sprite(100, 100, 'jugador');
    jugador.setCollideWorldBounds(true);

    enemigos = this.physics.add.group({
        key: 'enemigo',
        repeat: 4,
        setXY: { x: 1000, y: 300, stepX: 100 }
    });

    enemigos.children.iterate(function (enemigo) {
        enemigo.setCollideWorldBounds(true);
        enemigo.setBounce(1);
        enemigo.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
    });

    cursores = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(jugador, enemigos, colisionJugadorEnemigo, null, this);
}

function update() {
    if (cursores.left.isDown) {
        jugador.setVelocityX(-150);
    } else if (cursores.right.isDown) {
        jugador.setVelocityX(150);
    } else {
        jugador.setVelocityX(0);
    }

    if (cursores.up.isDown) {
        jugador.setVelocityY(-150);
    } else if (cursores.down.isDown) {
        jugador.setVelocityY(150);
    } else {
        jugador.setVelocityY(0);
    }
}

function colisionJugadorEnemigo(jugador, enemigo) {
    // Acciones a realizar cuando el jugador colisiona con un enemigo
    console.log('¡Colisión con el enemigo!');
}