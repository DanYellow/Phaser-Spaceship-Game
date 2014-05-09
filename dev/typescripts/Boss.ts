/// <reference path="phaser.d.ts"/>

class Boss extends Enemy {
    game: Phaser.Game

    constructor (game: Phaser.Game) {
        super(game);

        this.scale.x = this.scale.y = 25;

        this.health = 10;
        this.isBoss = true;

        game.add.existing(this);
    }
}