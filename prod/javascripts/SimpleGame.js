var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-scene', { preload: this.preload, create: this.create });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('background', 'images/starfield.jpg');
        this.game.load.image('ufo', 'images/ufo.png');

        this.game.load.atlasXML('enemy', 'images/enemy.png', 'images/datas/enemy.xml');
    };

    SimpleGame.prototype.create = function () {
        var game = this.game;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.tileSprite(0, 0, 2000, 2000, 'background');
        game.world.setBounds(0, 0, 1400, 1400);

        this.enemies = game.add.group();
        this.enemies.enableBody = true;

        for (var i = 0; i < 50; i++) {
            this.enemies.add(new Enemy(game));
        }
    };
    return SimpleGame;
})();

window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=SimpleGame.js.map
