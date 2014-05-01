/// <reference path="phaser.d.ts"/>
class Bonus extends Phaser.Sprite {
    game: Phaser.Game

    constructor (game: Phaser.Game) {
        var spriteName;
        if (Math.random() < 0.19) {
            spriteName = 'red-star';
        } else {
            spriteName = 'star';
        }

        super(game, game.world.randomX, game.world.randomY, spriteName, 0);

        game.physics.arcade.enable(this);

        this.scale.setTo(1.25, 1.25);

        game.add.existing(this);
    }
}