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

    preload() {
        this.game.load.image('background','images/starfield.jpg');
        this.game.load.image('ufo','images/ufo.png');

        this.game.load.image('star', 'images/star.png');
        this.game.load.image('red-star', 'images/red-star.png');

        this.game.load.image('indicator', 'images/indicator.png');

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
        this.doge.scale.setTo(15, 15);
        this.doge.anchor.setTo(0, 0);

        this.test = game.add.sprite(1500, 950, 'indicator');

        this.indicator = game.add.sprite(0, 0, 'indicator');
        game.physics.arcade.enable(this.indicator);
        this.indicator.body.collideWorldBounds = true;
        this.indicator.anchor.setTo(0, 0);

/*        this.ab = game.add.graphics(0, 0);
        this.ab.lineStyle(1, 0xffffff, 1);
        this.ab.moveTo(this.spaceship.x, this.spaceship.y);
        this.ab.lineTo(this.test.x, this.test.y);
        this.ab.endFill();*/

        var point = new Phaser.Point();
        // new Phaser.Point(this.spaceship.x, this.spaceship.y)
        console.log('ANGLE : ', point.angle(point) );

/*        var ac = game.add.graphics(0, 0);
        ac.lineStyle(1, 0xffffff, 1);
        ac.moveTo(this.camera.x, this.camera.y);
        ac.lineTo(this.test.x, this.test.y);
        ac.endFill();*/


    }

    update() {
        //this.game.physics.arcade.overlap(this.spaceship, this.enemies, this.collisionEnemy, null, this);
        this.game.physics.arcade.overlap(this.spaceship, this.bonus, this.collisionBonus, null, this);

        var ufo = this.spaceship,
        test = this.test,
        camera = this.game.camera;


        // .angleSq(new Phaser.Point(this.spaceship.x, this.spaceship.y), new Phaser.Point(this.test.x, this.test.y))
        // console.log(Phaser.Point);

/*        var ac = Math.sqrt( Math.pow((test.x - ufo.x), 2) - Math.pow((test.y - ufo.y), 2) );
        var ab = Math.sqrt( Math.pow((camera.x - ufo.x), 2) - Math.pow((camera.y - ufo.y), 2) );
        var bc = Math.sqrt( Math.pow((test.x - camera.x), 2) - Math.pow((test.y - camera.y), 2) );

        var cosA = (( Math.pow(ac, 2) + Math.pow(ab, 2) - Math.pow(bc, 2)) / (2 * ac * ab));*/
        //console.log(cosA, ab, ac);
/*        var xa = this.game.camera.x,
        ya = this.game.camera.y;

        var xb = this.test.x,
        yb = this.test.y;

        this.indicator.x = Math.sqrt(Math.pow((xa-xb), 2) + Math.pow((ya-yb), 2));
        this.indicator.y = Math.sqrt(Math.pow((xa-xb), 2) + Math.pow((ya-yb), 2));*/

        //console.log(this.indicator.y);
        /*if(this.doge.inCamera) {
            this.indicator.alpha = 0;
        } else {
            this.indicator.alpha = 1;
        }*/
    }

    render() {
        // this.game.debug.spriteBounds(this.doge);
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