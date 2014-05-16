var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bonus = (function (_super) {
    __extends(Bonus, _super);
    function Bonus(game) {
        var frameName;
        if (Math.random() < 0.29) {
            frameName = 'red-star.png';
        } else if (Math.random() < 0.10) {
            frameName = 'green-star.png';
        } else {
            frameName = 'star.png';
        }

        _super.call(this, game, game.world.randomX, game.world.randomY, 'bonus', frameName);

        game.physics.arcade.enable(this);

        this.scale.setTo(1.25, 1.25);

        game.add.existing(this);
    }
    return Bonus;
})(Phaser.Sprite);
//# sourceMappingURL=Bonus.js.map
