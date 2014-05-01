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
        _super.call(this, game, x, y, 'ufo', 1);

        this.speed = 3;

        game.camera.follow(this);
        game.physics.arcade.enable(this);

        this.health = hp;
        this.alive = true;
        this.inputEnabled = true;
        this.anchor.setTo(0.5, 0.5);

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
    };

    Spaceship.prototype.blink = function () {
    };

    Spaceship.prototype.indicatePosition = function () {
        var position = {
            x: this.x,
            y: this.y
        };
        return position;
    };
    return Spaceship;
})(Phaser.Sprite);
//# sourceMappingURL=Spaceship.js.map
