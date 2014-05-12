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
        this.game.load.atlasXML('ufo', 'images/spaceship.png', 'images/datas/spaceship.xml');

        this.game.load.image('star', 'images/star.png');
        this.game.load.image('red-star', 'images/red-star.png');

        this.game.load.image('indicator', 'images/indicator.png');

        this.game.load.atlasXML('enemy', 'images/enemy.png', 'images/datas/enemy.xml');
    };

    Level.prototype.create = function () {
        this.nbEnemies = 2;
        this.nbBonus = 50;
        this.stage.disableVisibilityChange = true;

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

        this.spaceship = new Spaceship(game, 50, 10, 500);

        this.score = 0;
        this.scoreText = game.add.text(16, 16, 'Bonus: 0 / ' + this.nbBonus + ' | Health : ' + this.spaceship.health, { fontSize: '22px', fill: '#fff' });
        this.scoreText.fixedToCamera = true;

        this.test = game.add.sprite(1500, 950, 'indicator');

        this.indicator = game.add.sprite(0, 0, 'indicator');
        game.physics.arcade.enable(this.indicator);
        this.indicator.body.collideWorldBounds = true;
        this.indicator.anchor.setTo(0, 0);

        var point = new Phaser.Point(this.spaceship.x, this.spaceship.y);

        this.timer = new Phaser.Timer(game);
        this.timer.start();

        this.bosses = game.add.group();
        this.bosses.enableBody = true;

        this.messageText = game.add.text(0, 0, 'Alert ! Boss is detected', { font: '30px Arial', fill: '#ff0000' });
        this.messageText.fixedToCamera = true;
        this.messageText.x = (this.game.camera.width - this.messageText.width) / 2;
        this.messageText.y = (this.game.camera.height - this.messageText.height) / 2;

        this.bossEntrance();
    };

    Level.prototype.update = function () {
        this.game.physics.arcade.overlap(this.spaceship, this.enemies, this.collisionEnemy, null, this);

        this.game.physics.arcade.overlap(this.spaceship, this.bonus, this.collisionBonus, null, this);

        this.game.physics.arcade.overlap(this.spaceship.bullets, this.bosses, this.collisionBulletsEnemies, null, this);
        this.game.physics.arcade.overlap(this.spaceship.bullets, this.bosses, this.collisionEnemy, null, this);
        this.game.physics.arcade.overlap(this.spaceship.bullets, this.enemies, this.collisionBulletsEnemies, null, this);
    };

    Level.prototype.render = function () {
    };

    Level.prototype.collisionEnemy = function (spaceship, enemy) {
        if (!enemy.isBoss) {
            enemy.kill();
        }

        if (spaceship.health > 0 && !spaceship.invincible) {
            spaceship.damage(10);
            spaceship.blink();
        } else {
            spaceship.endInvincibleMode();
        }

        this.nbEnemies--;
        if (this.nbEnemies <= 0) {
            this.bossEntrance();
        }

        this.scoreText.text = 'Bonus: ' + this.score + ' / ' + this.nbBonus + ' | Health : ' + spaceship.health;

        if (spaceship.health <= 0) {
            this.restartGame('Game over');

            this.scoreText.text = 'Bonus: ' + this.score + ' / ' + this.nbBonus + ' | Health : ' + 0;
        }
    };

    Level.prototype.collisionBonus = function (spaceship, bonus) {
        if (bonus.key === 'red-star') {
            spaceship.health += 5;
            spaceship.startInvincibleMode();
        }
        bonus.kill();

        this.score += 1;
        if (this.score >= this.nbBonus) {
            console.log(this.timer.seconds);
            this.bossEntrance();
        }
        this.scoreText.text = 'Bonus: ' + this.score + ' / ' + this.nbBonus + ' | Health : ' + spaceship.health;
    };

    Level.prototype.collisionBulletsEnemies = function (bullet, enemy) {
        bullet.kill();
        enemy.damage(1);
        this.nbEnemies--;
        if (this.nbEnemies <= 0) {
            this.bossEntrance();
        }

        if (enemy.isBoss && enemy.health <= 0) {
            this.restartGame('Stage clear', 'green');
        }
    };

    Level.prototype.bossEntrance = function () {
        if (this.bosses.countLiving() === 0) {
            this.enemies.removeAll(true);

            var boss = new Boss(this.game);
            boss.name = 'boss';
            this.bosses.add(boss);
            this.restartGame('Alert ! Boss is detected');
            this.game.camera.unfollow();

            this.camera.setPosition(this.spaceship.x, this.spaceship.y);
            var tweenCamera = this.game.add.tween(this.camera).to({ x: this.bosses.getAt(0).x, y: this.bosses.getAt(0).y }, 0, Phaser.Easing.Linear.None, true, null, 0, true);
            tweenCamera.onComplete.add(function () {
                this.game.camera.follow(this.spaceship);
            }, this);
        }
    };

    Level.prototype.restartGame = function (text, color, tween, restart) {
        if (typeof text === "undefined") { text = 'Doge'; }
        if (typeof color === "undefined") { color = 'red'; }
        if (typeof tween === "undefined") { tween = false; }
        if (typeof restart === "undefined") { restart = false; }
        this.messageText.text = text;
        this.messageText.fill = color;
        this.messageText.alpha = 1;

        if (tween) {
            var tweenMessageText = this.game.add.tween(this.messageText).to({ alpha: 0 }, 0, Phaser.Easing.Linear.None, true, null, 5, false);
            if (restart) {
                tweenMessageText.onComplete.add(function () {
                    this.game.state.start(this.game.state.current);
                }, this);
            }
        }
    };
    return Level;
})(Phaser.State);
//# sourceMappingURL=Level.js.map
