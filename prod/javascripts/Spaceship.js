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
        _super.call(this, game, x, y, 'ufo', 25);

        this.speed = 3;
        this.isDead = false;

        game.camera.follow(this);
        game.physics.arcade.enable(this);

        this.health = hp;
        this.alive = true;
        this.inputEnabled = true;
        this.anchor.setTo(0.5, 0.5);
        this.smoothed = false;

        this.body.bounce.setTo(0, 0);
        this.body.collideWorldBounds = true;
        this.body.gravity.setTo(0, 0);

        game.add.existing(this);
    }
    Spaceship.prototype.update = function () {
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

        if (this.health <= 0 && this.isDead === false) {
            this.revive(1);
            this.isDead = true;
            this.explode();
        }
    };

    Spaceship.prototype.blink = function () {
        this.alpha = 0;

        var tween = this.game.add.tween(this).to({ alpha: 1 }, 10, Phaser.Easing.Linear.None, true, 0, 5);
    };

    Spaceship.prototype.indicatePosition = function () {
        var position = {
            x: this.x,
            y: this.y
        };
        return position;
    };

    Spaceship.prototype.explode = function () {
        this.inputEnabled = false;
        this.input = null;
        this.alive = false;
        this.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 10, false, true);
        this.play('explode', null, false, true);
        this.health = 0;
    };
    return Spaceship;
})(Phaser.Sprite);
//# sourceMappingURL=Spaceship.js.map
