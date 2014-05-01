class SimpleGame {
	constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }

    game: Phaser.Game;

    preload() {
        //this.game.load.image('logo', 'phaser2.png');
    }
}