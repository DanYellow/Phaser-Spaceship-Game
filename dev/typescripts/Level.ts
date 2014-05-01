/// <reference path="phaser.d.ts"/>

class Level extends Phaser.State {
    spaceship: Spaceship;

    game: Phaser.Game;

    enemies: Phaser.Group;
    spaceships: Phaser.Group;
    bonus: Phaser.Group;

    nbEnemies: number;
    nbBonus: number;

    scoreText: Phaser.Text;
    score: number;

    doge: Enemy;

    preload() {
        this.game.load.image('background','images/starfield.jpg');
        this.game.load.image('ufo','images/ufo.png');

        this.game.load.image('star', 'images/star.png');
        this.game.load.image('red-star', 'images/red-star.png');

        this.game.load.atlasXML('enemy', 'images/enemy.png', 'images/datas/enemy.xml');
    }

    create() {
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
        this.scoreText = game.add.text(16, 16, 'Bonus: 0 / ' + this.nbBonus + ' | Health : ' +  this.spaceship.health, { fontSize: '22px', fill: '#fff' });
        this.scoreText.fixedToCamera = true;

        this.doge = new Enemy(game);

    }

    update() {
        //this.game.physics.arcade.overlap(this.spaceship, this.enemies, this.collisionEnemy, null, this);
        this.game.physics.arcade.overlap(this.spaceship, this.bonus, this.collisionBonus, null, this);

        console.log(this.doge.indicatePosition());
    }

    render() {
        //this.game.debug.spriteBounds(this.doge);
    }

    collisionEnemy(spaceship, enemy) {
        enemy.kill();
        if (spaceship.health > 0) {
            spaceship.damage(10);
        }

        if (spaceship.health == 0) {
            window.alert("Game over");
            this.game.state.start(this.game.state.current);
        }

        spaceship.blink();
        this.scoreText.text = 'Bonus: ' + this.score + ' / ' + this.nbBonus + ' | Health : ' +  spaceship.health;
    }

    collisionBonus(spaceship, bonus) {
        if(bonus.key === 'red-star') {
            spaceship.health += 5;
        }
        bonus.kill();

        this.score += 1;
        this.scoreText.text = 'Bonus: ' + this.score + ' / ' + this.nbBonus + ' | Health : ' +  spaceship.health;
    }
}