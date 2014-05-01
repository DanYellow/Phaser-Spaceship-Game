var Enemy = (function () {
    function Enemy(group) {
        var game = this.game;

        this.enemy = group.create(game.world.randomX, game.world.randomY, 'enemy');

        this.enemy.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
        this.enemy.scale.setTo(1.5, 1.5);
        this.enemy.body.immovable = false;

        var minSpeed = -75;
        var maxSpeed = 75;

        var vx = Math.random() * (maxSpeed - minSpeed + 1) - minSpeed;
        var vy = Math.random() * (maxSpeed - minSpeed + 1) - minSpeed;

        this.enemy.body.collideWorldBounds = true;
        this.enemy.body.bounce.setTo(1, 1);
        this.enemy.body.velocity.x = vx;
        this.enemy.body.velocity.y = vy;

        this.enemy.play('fly');
    }
    return Enemy;
})();
//# sourceMappingURL=Enemy.js.map
