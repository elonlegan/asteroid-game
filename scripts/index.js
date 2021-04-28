import { Game } from '../scenes/game.js';
import { Gameover } from '../scenes/gameover.js';

const config = {
	type: Phaser.AUTO,
	width: 1000,
	height: 500,
	parent: 'container--game',
	scene: [Game, Gameover],
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			gravity: { y: 1000 },
		},
	},
};

var game = new Phaser.Game(config);
