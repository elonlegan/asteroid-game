var config = {
	type: Phaser.AUTO,
	width: 1000,
	height: 500,
	parent: 'container--game',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 1000 },
		},
	},
	scene: {
		init: init,
		preload: preload,
		create: create,
		update: update,
	},
};

var game = new Phaser.Game(config);

function init() {
	this.score = 0;
}

function preload() {
	this.load.image('plane', '../images/plane-2.png');
	this.load.image('background', '../images/parallax-mountain-bg.png');
}

function create() {
	this.physics.world.setBoundsCollision(true, true, true, false);
	this.add.image(500, 250, 'background');
	this.plane = this.physics.add.image(60, 250, 'plane');
	this.plane.body.collideWorldBounds = true;

	this.cursors = this.input.keyboard.createCursorKeys();
	this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

	this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', {
		fontSize: '20px',
		fill: '#fff',
		fontFamily: 'verdana, arial, sans-serif',
	});
}

function update() {
	this.score++;
	this.scoreText.setText('PUNTOS: ' + this.score);

	if (this.cursors.up.isDown || this.keyW.isDown) {
		this.plane.setVelocityY(-500);
	} else if (this.cursors.down.isDown || this.keyS.isDown) {
		this.plane.setVelocityY(500);
	} else if (this.cursors.left.isDown || this.keyA.isDown) {
		this.plane.setVelocityX(-500);
		this.plane.setVelocityY(0);
	} else if (this.cursors.right.isDown || this.keyD.isDown) {
		this.plane.setVelocityY(0);
		this.plane.setVelocityX(500);
	} else {
		this.plane.setVelocity(0, 0);
	}

	if (this.plane.y > 580) {
		this.scene.pause();
		console.log('game over');
	}
}
