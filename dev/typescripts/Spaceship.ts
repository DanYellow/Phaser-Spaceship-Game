/// <reference path="phaser.d.ts"/>

class Spaceship extends Phaser.Sprite {

    speed: number

    constructor (game: Phaser.Game, x: number, y: number, hp = 10) {
        super(game, x, y, 'ufo', 1);

        this.speed = 3;

        game.camera.follow(this);
        game.physics.arcade.enable(this);


        this.health = hp;
        this.inputEnabled = true;
        this.anchor.setTo(0.5, 0.5);

        this.body.bounce.setTo(0, 0);
        this.body.collideWorldBounds = true;
        this.body.gravity.setTo(0, 0);

        game.add.existing(this);
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.x -= 5;
            this.angle = -15;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.x += this.speed;
            this.angle = 15;
        } else {
            this.rotation = 0;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
          this.y -= this.speed;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
          this.y += this.speed;
        }
    }
}