var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Level = (function (_super) {
    __extends(Level, _super);
    function Level() {
        _super.apply(this, arguments);
    }
    Level.prototype.preload = function () {
        this.game.load.image('background', 'images/starfield.jpg');
        this.game.load.image('ufo', 'images/ufo.png');

        this.game.load.image('star', 'images/star.png');
        this.game.load.image('red-star', 'images/red-star.png');

        this.game.load.image('indicator', 'images/indicator.png');

        this.game.load.atlasXML('enemy', 'images/enemy.png', 'images/datas/enemy.xml');
    };

    Level.prototype.create = function () {
        this.nbEnemies = 30;
        this.nbBonus = 50;

        var game = this.game;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.tileSprite(0, 0, 2000, 2000, 'background');
        game.world.setBounds(0, 0, 2000, 2000);

        this.enemies = game.add.group();
        this.enemies.enableBody = true;

        this.bonus = game.add.group();
        this.bonus.enableBody = true;

        for (var i = 0; i < this.nbEnemies; i++) {
            var enemy = new Enemy(game);
            this.enemies.add(enemy);
        }

        for (var i = 0; i < this.nbBonus; i++) {
            this.bonus.add(new Bonus(game));
        }

        this.spaceship = new Spaceship(game, 50, 10, 50);

        this.score = 0;
        this.scoreText = game.add.text(16, 16, 'Bonus: 0 / ' + this.nbBonus + ' | Health : ' + this.spaceship.health, { fontSize: '22px', fill: '#fff' });
        this.scoreText.fixedToCamera = true;

        this.doge = new Enemy(game);
        this.doge.scale.setTo(15, 15);
        this.doge.anchor.setTo(0, 0);

        this.test = game.add.sprite(1500, 950, 'indicator');

        this.indicator = game.add.sprite(0, 0, 'indicator');
        game.physics.arcade.enable(this.indicator);
        this.indicator.body.collideWorldBounds = true;
        this.indicator.anchor.setTo(0, 0);
    };

    Level.prototype.update = function () {
        this.game.physics.arcade.overlap(this.spaceship, this.enemies, this.collisionEnemy, null, this);
        this.game.physics.arcade.overlap(this.spaceship, this.bonus, this.collisionBonus, null, this);

        var ufo = this.spaceship, test = this.test, camera = this.game.camera;
    };

    Level.prototype.render = function () {
    };

    Level.prototype.collisionEnemy = function (spaceship, enemy) {
        enemy.kill();
        if (spaceship.health > 0) {
            spaceship.damage(10);
        }

        if (spaceship.health == 0) {
            window.alert("Game over");
            this.game.state.start(this.game.state.current);
        }

        spaceship.blink();
        this.scoreText.text = 'Bonus: ' + this.score + ' / ' + this.nbBonus + ' | Health : ' + spaceship.health;
    };

    Level.prototype.collisionBonus = function (spaceship, bonus) {
        if (bonus.key === 'red-star') {
            spaceship.health += 5;
        }
        bonus.kill();

        this.score += 1;
        this.scoreText.text = 'Bonus: ' + this.score + ' / ' + this.nbBonus + ' | Health : ' + spaceship.health;
    };
    return Level;
})(Phaser.State);
//# sourceMappingURL=Level.js.map
