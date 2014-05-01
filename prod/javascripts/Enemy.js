var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(game) {
        _super.call(this, game, game.world.randomX, game.world.randomY, 'enemy', 0);

        this.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
        this.scale.setTo(1.5, 1.5);
        this.body.immovable = false;

        var minSpeed = -75;
        var maxSpeed = 75;

        var vx = Math.random() * (maxSpeed - minSpeed + 1) - minSpeed;
        var vy = Math.random() * (maxSpeed - minSpeed + 1) - minSpeed;

        this.body.collideWorldBounds = true;
        this.body.bounce.setTo(1, 1);
        this.body.velocity.x = vx;
        this.body.velocity.y = vy;

        this.play('fly');

        game.add.existing(this);
    }
    return Enemy;
})(Phaser.Sprite);
//# sourceMappingURL=Enemy.js.map
