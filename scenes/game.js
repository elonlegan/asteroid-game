import { LiveCounter } from "../components/live-counter.js";

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  init() {
    this.score = 0;
    this.liveCounter = new LiveCounter(this, 3);
  }

  preload() {
    this.load.image("platform", "https://i.postimg.cc/QCgfMjq6/plane-2.png");
    this.load.image(
      "background",
      "https://i.postimg.cc/xTYs4b0B/parallax-mountain-bg.png"
    );

    this.load.audio("gameoversample", "sounds/gameover.ogg");
    this.load.audio("startgamesample", "sounds/start-game.ogg");
    this.load.audio("livelostsample", "sounds/live-lost.ogg");
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.add.image(500, 250, "background");

    this.liveCounter.create();

    this.platform = this.physics.add.image(60, 250, "platform");
    this.platform.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    this.scoreText = this.add.text(16, 16, "PUNTOS: 0", {
      fontSize: "20px",
      fill: "#fff",
      fontFamily: "verdana, arial, sans-serif",
    });

    this.platformImpactSample = this.sound.add("platformimpactsample");
    this.brickImpactSample = this.sound.add("brickimpactsample");
    this.gameOverSample = this.sound.add("gameoversample");
    this.winSample = this.sound.add("winsample");
    this.startGameSample = this.sound.add("startgamesample");
    this.liveLostSample = this.sound.add("livelostsample");
  }

  update() {
    this.increasePoints();

    if (this.cursors.up.isDown || this.keyW.isDown) {
      this.platform.setVelocityY(-500);
    } else if (this.cursors.down.isDown || this.keyS.isDown) {
      this.platform.setVelocityY(500);
    } else if (this.cursors.left.isDown || this.keyA.isDown) {
      this.platform.setVelocityX(-500);
      this.platform.setVelocityY(0);
    } else if (this.cursors.right.isDown || this.keyD.isDown) {
      this.platform.setVelocityY(0);
      this.platform.setVelocityX(500);
    } else {
      this.platform.setVelocity(0, 0);
    }

    if (this.platform.y > 580 && this.platform.active) {
      let gameNotFinished = this.liveCounter.liveLost();
      if (!gameNotFinished) {
        this.setInitialPlatformState();
      }
    }
  }

  increasePoints() {
    this.score++;
    this.scoreText.setText("PUNTOS: " + this.score);
  }

  endGame(completed = false) {
    if (!completed) {
      this.gameOverSample.play();
      this.scene.start("gameover");
    } else {
      this.scene.start("congratulations");
    }
  }
  setInitialPlatformState() {
    this.liveLostSample.play();
    this.platform.x = 60;
    this.platform.y = 250;
  }
}
