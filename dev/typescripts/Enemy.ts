/// <reference path="phaser.d.ts"/>
class Enemy  extends Phaser.Sprite {
    game: Phaser.Game

    constructor (group) {
        var game = this.game;

        this.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
        this.scale.setTo(1.5, 1.5);
        this.body.immovable = false;

        var minSpeed = -75;
        var maxSpeed = 75;

        var vx = Math.random() * (maxSpeed - minSpeed + 1) - minSpeed;
        var vy = Math.random() * (maxSpeed - minSpeed + 1) - minSpeed;

        this.body.collideWorldBounds = true; // L'objet ne peut pas sortir de la carte"
        this.body.bounce.setTo(1, 1);
        this.body.velocity.x = vx;
        this.body.velocity.y = vy;

        this.play('fly');

        super(game, game.world.randomX, game.world.randomY, 'enemy', 0);
    }
}
