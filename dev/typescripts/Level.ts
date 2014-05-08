/// <reference path="phaser.d.ts"/>

class Level extends Phaser.State {
    spaceship: Spaceship;

    game: Phaser.Game;

    enemies: Phaser.Group;
    spaceships: Phaser.Group;
    bonus: Phaser.Group;

    nbEnemies: number;
    nbBonus: number;
    score: number;

    scoreText: Phaser.Text;

    camera: Phaser.Camera;

    doge: Enemy;
    indicator: Phaser.Sprite;
    test: Phaser.Sprite;

    ab: Phaser.Graphics;

    timer: Phaser.Timer;

    preload() {
        this.game.load.image('background','images/starfield.jpg');
        this.game.load.atlasXML('ufo', 'images/spaceship.png', 'images/datas/spaceship.xml');

        this.game.load.image('star', 'images/star.png');
        this.game.load.image('red-star', 'images/red-star.png');

        this.game.load.image('indicator', 'images/indicator.png');

        this.game.load.atlasXML('enemy', 'images/enemy.png', 'images/datas/enemy.xml');
    }

    create() {
        this.nbEnemies = 70;
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

        this.spaceship = new Spaceship(game, 50, 10, 5);
        /*this.spaceship.explode();*/

        this.score = 0;
        this.scoreText = game.add.text(16, 16, 'Bonus: 0 / ' + this.nbBonus + ' | Health : ' +  this.spaceship.health, { fontSize: '22px', fill: '#fff' });
        this.scoreText.fixedToCamera = true;

        this.doge = new Enemy(game);
        //this.doge.scale.setTo(15, 15);
        this.doge.anchor.setTo(0, 0);
        this.doge.x = 10;
        this.doge.y = 10;

        this.test = game.add.sprite(1500, 950, 'indicator');

        this.indicator = game.add.sprite(0, 0, 'indicator');
        game.physics.arcade.enable(this.indicator);
        this.indicator.body.collideWorldBounds = true;
        this.indicator.anchor.setTo(0, 0);

        var point = new Phaser.Point(this.spaceship.x, this.spaceship.y);

        //console.log('PHASE : ' , point.angle(point));
        this.timer = new Phaser.Timer(game);
        this.timer.start();
    }

    update() {
        //this.game.physics.arcade.overlap(this.spaceship, this.enemies, this.collisionEnemy, null, this);
        this.game.physics.arcade.overlap(this.spaceship, this.bonus, this.collisionBonus, null, this);

        this.game.physics.arcade.overlap(this.spaceship.bullets, this.enemies, this.collisionBulletsEnemies, this.collisionBulletsEnemies, this);

        var ufo = this.spaceship,
        test = this.test,
        camera = this.game.camera;


    }

    render() {
       // this.game.debug.bodyInfo(this.doge);
    }

    collisionEnemy(spaceship, enemy) {
        enemy.kill();

        if (spaceship.health > 0 && !spaceship.invincible) {
            spaceship.damage(10);
            spaceship.blink();
        } else {
            spaceship.endInvincibleMode();
        }

        this.scoreText.text = 'Bonus: ' + this.score + ' / ' + this.nbBonus + ' | Health : ' +  spaceship.health;

        if (spaceship.health <= 0) {
            // window.alert("Game over");
            //this.game.state.start(this.game.state.current);
            this.scoreText.text = 'Bonus: ' + this.score + ' / ' + this.nbBonus + ' | Health : ' +  0;
        }
    }

    collisionBonus(spaceship, bonus) {
        if(bonus.key === 'red-star') {
            spaceship.health += 5;
            spaceship.startInvincibleMode();
        }
        bonus.kill();

        this.score += 1;
        if(this.score >= this.nbBonus) {
            console.log(this.timer.seconds);
        }
        this.scoreText.text = 'Bonus: ' + this.score + ' / ' + this.nbBonus + ' | Health : ' +  spaceship.health;
    }

    collisionBulletsEnemies(bullet, enemy) {
        bullet.kill();
        enemy.kill();
    }
}