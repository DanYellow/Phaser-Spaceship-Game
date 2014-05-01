var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Spaceship = (function (_super) {
    __extends(Spaceship, _super);
    function Spaceship(posX, posY, hp) {
        if (typeof hp === "undefined") { hp = 10; }
        var game = this.game;

        game.input.keyboard;

        game.camera.follow(this);
        game.physics.arcade.enable(this);

        this.health = hp;
        this.body.bounce.setTo(0, 0);

        _super.call(this, game, posX, posY, 'ufo', 1);
    }
    Spaceship.prototype.update = function () {
        console.log('ok');
    };

    Spaceship.prototype.sprite = function () {
        console.log('ok');
    };
    return Spaceship;
})(Phaser.Sprite);
//# sourceMappingURL=Spaceship.js.map
