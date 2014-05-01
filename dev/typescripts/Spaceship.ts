/// <reference path="phaser.d.ts"/>

class Spaceship extends Phaser.Sprite {
    game: Phaser.Game
    keyboard: game.input.keyboard

    constructor (posX, posY, hp = 10) {
        var game = this.game;

        //game.add.sprite(posX, posY, 'ufo');
        game.input.keyboard;

        game.camera.follow(this);
        game.physics.arcade.enable(this);

        this.health = hp;
        this.inputEnabled = true;
        this.body.bounce.setTo(0, 0);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5, 0.5);
        this.body.gravity.setTo(0, 0);

        super(game, posX, posY, 'ufo', 1);
    }

    update() {
        if (this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.sprite.x -= 5;
            this.sprite.angle = -15;
        } else if (this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.sprite.x += speed;
            this.sprite.angle = 15;
        } else {
            this.sprite.rotation = 0;
        }

        if (this.keyboard.isDown(Phaser.Keyboard.UP)) {
          this.sprite.y -= speed;
        } else if (this.keyboard.isDown(Phaser.Keyboard.DOWN)) {
          this.sprite.y += speed;
        }
    }
}