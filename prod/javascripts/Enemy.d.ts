/// <reference path="phaser.d.ts" />
declare class Enemy extends Phaser.Sprite {
    public game: Phaser.Game;
    public minSpeed: number;
    public maxSpeed: number;
    constructor(game: Phaser.Game);
}
