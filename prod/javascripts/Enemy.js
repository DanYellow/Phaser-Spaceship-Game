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

        this.minSpeed = -75;
        this.maxSpeed = 75;

        game.physics.arcade.enable(this);

        this.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
        this.scale.setTo(1.5, 1.5);
        this.play('fly');

        var vx = Math.random() * (this.maxSpeed - this.minSpeed + 1) - this.minSpeed;
        var vy = Math.random() * (this.maxSpeed - this.minSpeed + 1) - this.minSpeed;

        this.body.immovable = false;
        this.body.collideWorldBounds = true;
        this.body.bounce.setTo(1, 1);
        this.body.velocity.x = vx;
        this.body.velocity.y = vy;

        game.add.existing(this);
    }
    return Enemy;
})(Phaser.Sprite);
//# sourceMappingURL=Enemy.js.map
