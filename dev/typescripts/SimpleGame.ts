class SimpleGame {
    game: Phaser.Game;
    enemies: Phaser.Group;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-scene', { preload: this.preload, create: this.create });
    }

    preload() {
        //this.game.load.image('logo', 'phaser2.png');
        this.game.load.image('background','images/starfield.jpg');
        this.game.load.image('ufo','images/ufo.png');

        this.game.load.atlasXML('enemy', 'images/enemy.png', 'images/datas/enemy.xml');
    }

    create() {
        var game = this.game;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.tileSprite(0, 0, 2000, 2000, 'background');
        game.world.setBounds(0, 0, 1400, 1400);

        this.enemies = game.add.group();
        this.enemies.enableBody = true;

        for (var i = 0; i < 50; i++) {
            this.enemies.add(new Enemy(game));
        }
    }
}

window.onload = () => {
    var game = new SimpleGame();
};