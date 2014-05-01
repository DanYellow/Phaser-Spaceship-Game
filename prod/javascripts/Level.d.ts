/// <reference path="phaser.d.ts" />
declare class Level extends Phaser.State {
    public spaceship: Spaceship;
    public game: Phaser.Game;
    public enemies: Phaser.Group;
    public spaceships: Phaser.Group;
    public bonus: Phaser.Group;
    public nbEnemies: number;
    public nbBonus: number;
    public scoreText: Phaser.Text;
    public score: number;
    public doge: Enemy;
    public preload(): void;
    public create(): void;
    public update(): void;
    public render(): void;
    public collisionEnemy(spaceship: any, enemy: any): void;
    public collisionBonus(spaceship: any, bonus: any): void;
}
