/// <reference path="phaser.d.ts"/>

class Spaceship extends Phaser.Sprite {

    bullets: Phaser.Group;
    mouse: Phaser.Mouse;

    speed: number;
    isDead: boolean;
    invincible: boolean;

    bulletsGoesLeft: boolean;

    bulletType: number;
    i: number;

    gamepad: Phaser.Gamepad;

    constructor (game: Phaser.Game, x: number, y: number, hp: number = 10) {
        super(game, x, y, 'ufo', 'ufo.png');


        this.bulletType = 0;
        this.speed = 3;
        this.i = 0;
        this.isDead = false;
        this.invincible = false;
        this.bulletsGoesLeft = true;

        game.camera.follow(this);
        game.physics.arcade.enable(this);

        this.health = hp;
        this.alive = true;
        this.inputEnabled = true;
        this.anchor.setTo(0.5, 0.5);
        this.smoothed = false;
        //this.body.allowRotation = false;
        this.body.bounce.setTo(0, 0);
        this.body.collideWorldBounds = true;
        this.body.gravity.setTo(0, 0);

        this.bullets = game.add.group();

        this.gamepad = new Phaser.Gamepad(game);
        this.gamepad.start();
        console.log(this.gamepad.padsConnected);

        game.add.existing(this);
    }

    update() {
        this.rotation = this.game.physics.arcade.angleToPointer(this);

        if(this.gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)) {
            console.log('ok');
        }

        if(this.alive) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.x -= this.speed;
                this.angle = -15;
                this.bulletsGoesLeft = true;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.x += this.speed;
                this.angle = 15;
                this.bulletsGoesLeft = false;
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
        }

        // if (this.game.input.activePointer.isDown) {
        //         if (this.game.time.now > this.nextFire) {
        //             this.nextFire = this.game.time.now + this.fireRate;

        //             this.shoot(this.bulletType);
        //         }
        //     }

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

    upgradeBulletsMode() {
        this.bulletType++;
    }

    shoot() {
        var speed = 1;

        var thisPosition = new Phaser.Point(this.x, this.y);

        switch(this.bulletType) {
            case 0 :
                speed = 1;
            break;

            case 1 :
                speed = 2;
                var bullet2 = new Bullet(this.game, speed, this, 0, new Phaser.Point(thisPosition.x, thisPosition.y - 20));
                this.bullets.add(bullet2);
            break;

            case 2 :
                speed = 3;
            break;

            default:
                speed = 3;
            break;
        }



        var bullet = new Bullet(this.game, speed, this, 0, thisPosition);
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