/// <reference path="phaser.d.ts"/>

class Boss extends Enemy {
    game: Phaser.Game

    constructor (game: Phaser.Game) {
        super(game);

        this.scale.x = this.scale.y = 15;

        this.health = 10;
        this.isBoss = true;

        game.add.existing(this);
    }

    blink() {
        this.alpha = 0;
        // to(properties: Object, duration?: number, ease?: Function, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Phaser.Tween;
        var tween = this.game.add.tween(this).to( { alpha: 1 }, 10, Phaser.Easing.Linear.None, true, <number>0, <number>5);
    }
}