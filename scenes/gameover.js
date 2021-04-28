import { RestartButton } from "../components/restart-button.js";

export class Gameover extends Phaser.Scene {
  constructor() {
    super({ key: "gameover" });
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.load.image("gameover", "https://i.postimg.cc/RhxP9Ww6/gameover.png");
    this.restartButton.preload();
  }

  create() {
    this.add.image(500, 250, "background");
    this.restartButton.create();
    this.gameoverImage = this.add.image(500, 90, "gameover");
  }
}
