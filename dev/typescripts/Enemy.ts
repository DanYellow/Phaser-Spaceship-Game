/// <reference path="phaser.d.ts"/>
class Enemy  extends Phaser.Sprite {
    game: Phaser.Game
    private minSpeed: number
    private maxSpeed: number

    constructor (game: Phaser.Game) {
        super(game, game.world.randomX, game.world.randomY, 'enemy', 0);

        this.minSpeed = -75;
        this.maxSpeed = 75;

        game.physics.arcade.enable(this);

        this.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
        this.scale.setTo(1.5, 1.5);
        this.play('fly');


        var vx = Math.random() * (this.maxSpeed - this.minSpeed + 1) - this.minSpeed;
        var vy = Math.random() * (this.maxSpeed - this.minSpeed + 1) - this.minSpeed;

        this.body.immovable = false;
        this.body.collideWorldBounds = true; // Sprite can't go outside the map
        this.body.bounce.setTo(1, 1);
        this.body.velocity.x = vx;
        this.body.velocity.y = vy;
        this.body.setSize(10, 10, 0, 0);

        game.add.existing(this);
    }

    indicatePosition() {
        var position = {
            x: Math.round(this.x),
            y: Math.round(this.y)
        }
        return position;
    }
}