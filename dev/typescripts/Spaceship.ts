/// <reference path="phaser.d.ts"/>

class Spaceship extends Phaser.Sprite {

    speed: number;
    isDead: boolean;
    invincible: boolean;
    bullets: Phaser.Group;

    constructor (game: Phaser.Game, x: number, y: number, hp: number = 10) {
        super(game, x, y, 'ufo', 'ufo.png');

        this.speed = 3;
        this.isDead = false;
        this.invincible = false;

        game.camera.follow(this);
        game.physics.arcade.enable(this);

        this.health = hp;
        this.alive = true;
        this.inputEnabled = false;
        this.anchor.setTo(0.5, 0.5);
        this.smoothed = false;

        this.body.bounce.setTo(0, 0);
        this.body.collideWorldBounds = true;
        this.body.gravity.setTo(0, 0);

        this.bullets = game.add.group();

        game.add.existing(this);
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.x -= this.speed;
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

        if(this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR, 3)) {
            this.shoot();
        }

        if (this.health <= 0 && this.isDead === false) {
            this.revive(1);
            this.isDead = true;
            this.explode();
        }
    }

    startInvincibleMode() {
        this.frameName = 'ufo-invicible.png';
        this.invincible = true;
    }

    endInvincibleMode() {
        this.frameName = 'ufo.png';
        this.invincible = false;
    }

    blink() {
        this.alpha = 0;
        // to(properties: Object, duration?: number, ease?: Function, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Phaser.Tween;
        var tween = this.game.add.tween(this).to( { alpha: 1 }, 10, Phaser.Easing.Linear.None, true, <number>0, <number>5);
    }

    shoot() {
        var bullet = new Phaser.Sprite(this.game, this.x, this.y - (this.height/2), 'ufo', 'bullet.png');

        this.game.physics.arcade.enable(bullet);
        bullet.scale.x = (this.angle > 0) ? 1 : -1;
        bullet.body.velocity.x = (this.angle > 0) ? 300 : -300;
        bullet.outOfBoundsKill = true;


        this.bullets.add(bullet);
        this.game.add.existing(this.bullets);
    }

    indicatePosition() {
        var position = {
            x: this.x,
            y: this.y
        }
        return position;
    }

    explode() {
        //this.input.stop();
        this.alive = false;
        this.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 10, false, true);
        this.play('explode', null, false, true);
        this.health = 0;
        this.events.onAnimationComplete.add(function(){
            this.game.state.start('Level');
        }, this);
    }
}