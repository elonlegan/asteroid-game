import { RestartButton } from '../components/restart-button.js';

export class Gameover extends Phaser.Scene {
	constructor() {
		super({ key: 'gameover' });
		this.restartButton = new RestartButton(this);
	}

	preload() {
		this.background = [
			'../images/chicago.svg',
			'../images/lima.svg',
			'../images/Japon.svg',
			'../images/hong_kong.svg',
			'../images/londres.svg',
			'../images/toronto_.svg',
			'../images/rio_janeiro.svg',
			'../images/bogota.svg',
		];
		this.backgroundWidth = 700;
		this.backgroundHeight = 700;

		this.background.forEach((element, index) => {
			this.load.svg('background' + index, element, {
				width: this.backgroundWidth,
				height: this.backgroundHeight,
			});
		});

		this.load.image('gameover', 'https://i.postimg.cc/RhxP9Ww6/gameover.png');
		this.restartButton.preload();
	}

	create() {
		this.backgroundArray = [];
		this.background.forEach((element, index) => {
			this.backgroundArray[index] = this.physics.add.image(
				this.backgroundWidth * index,
				382,
				'background' + index
			);

			this.backgroundArray[index].body.allowGravity = false;
			this.backgroundArray[index].setVelocityX(-300);
			this.backgroundArray[index].displayOriginX = 0;
		});
		this.numberBackground = 0;
		this.currentBackground = this.backgroundArray[0];

		this.restartButton.create();
		this.gameoverImage = this.add.image(500, 90, 'gameover');
	}

	update() {
		if (this.currentBackground.x < -this.backgroundWidth) {
			this.numberofbackground = this.backgroundArray.length - 1;
			this.numberBackground++;
			this.currentBackground.x = this.numberofbackground * this.backgroundWidth;
			if (this.numberBackground == this.backgroundArray.length) {
				this.numberBackground = 0;
			}
			this.currentBackground = this.backgroundArray[this.numberBackground];
		}
	}
}
