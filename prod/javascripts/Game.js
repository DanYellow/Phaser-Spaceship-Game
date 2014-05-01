var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this, 800, 600, Phaser.AUTO, 'game-scene', null);

        this.state.add('Level', Level, false);

        this.state.start('Level');
    }
    return Game;
})(Phaser.Game);

window.onload = function () {
    var game = new Game();
};
//# sourceMappingURL=Game.js.map
