/// <reference path="phaser.d.ts"/>
class Bonus extends Phaser.Sprite {
    game: Phaser.Game

    constructor (game: Phaser.Game) {
        var frameName;
        if (Math.random() < 0.19) {
            frameName = 'red-star.png';
        } else if (Math.random() < 0.05) {
            frameName = 'green-star.png';
        } else {
            frameName = 'star.png'
        }

        // frameName = 'green-star.png';

        super(game, game.world.randomX, game.world.randomY, 'bonus', frameName);

        game.physics.arcade.enable(this);

        this.scale.setTo(1.25, 1.25);

        game.add.existing(this);
    }
}