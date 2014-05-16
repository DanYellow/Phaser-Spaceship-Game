var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Spaceship = (function (_super) {
    __extends(Spaceship, _super);
    function Spaceship(game, x, y, hp) {
        if (typeof hp === "undefined") { hp = 10; }
        _super.call(this, game, x, y, 'ufo', 'ufo.png');
        this.fireRate = 300;
        this.nextFire = 0;

        this.bulletsType = ['Normal'];

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
        this.body.allowRotation = false;

        this.body.bounce.setTo(0, 0);
        this.body.collideWorldBounds = true;
        this.body.gravity.setTo(0, 0);

        this.bullets = game.add.group();

        game.add.existing(this);
    }
    Spaceship.prototype.update = function () {
        this.rotation = this.game.physics.arcade.angleToPointer(this);

        if (this.alive) {
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

            if (this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR, 3)) {
                this.shoot(this.bulletType);
            }

            if (this.game.input.keyboard.justPressed(Phaser.Keyboard.CONTROL, 3)) {
                if (this.bulletsType.length === 1) {
                    return;
                }

                this.i++;
                if (this.i >= this.bulletsType.length) {
                    this.i = 0;
                }
                this.bulletType = this.bulletsType[this.i];
            }
        }

        if (this.health <= 0 && this.isDead === false) {
            this.revive(1);
            this.isDead = true;
            this.explode();
        }
    };

    Spaceship.prototype.startInvincibleMode = function () {
        this.frameName = 'ufo-invicible.png';
        this.invincible = true;
    };

    Spaceship.prototype.endInvincibleMode = function () {
        this.frameName = 'ufo.png';
        this.invincible = false;
    };

    Spaceship.prototype.blink = function () {
        this.alpha = 0;

        var tween = this.game.add.tween(this).to({ alpha: 1 }, 10, Phaser.Easing.Linear.None, true, 0, 5);
    };

    Spaceship.prototype.shoot = function (bulletType) {
        var bullet = new Phaser.Sprite(this.game, this.x, this.y, 'ufo', 'bullet.png');
        this.game.physics.arcade.enable(bullet);

        bullet.scale.x = (this.bulletsGoesLeft) ? -1 : 1;

        var speed = 1;

        switch (bulletType) {
            case 'Normal':
                speed = 1;
                break;

            case 'Super':
                speed = 2;
                break;

            case 'Hyper':
                speed = 3;
                break;

            default:
                speed = 1;
                break;
        }

        bullet.body.velocity.x = (this.bulletsGoesLeft) ? -300 * speed : 300 * speed;
        bullet.outOfBoundsKill = true;
        bullet.body.setSize(0, 0, bullet.width, bullet.height);

        this.bullets.add(bullet);
        this.game.add.existing(this.bullets);
    };

    Spaceship.prototype.indicatePosition = function () {
        var position = {
            x: this.x,
            y: this.y
        };
        return position;
    };

    Spaceship.prototype.explode = function () {
        this.alive = false;
        this.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 10, false, true);
        this.play('explode', null, false, true);
        this.health = 0;
        this.events.onAnimationComplete.add(function () {
            this.game.state.start('Level');
        }, this);
    };
    return Spaceship;
})(Phaser.Sprite);
//# sourceMappingURL=Spaceship.js.map
