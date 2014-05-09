/// <reference path="phaser.d.ts" />
declare class Enemy extends Phaser.Sprite {
    public game: Phaser.Game;
    public minSpeed: number;
    public maxSpeed: number;
    public isBoss: boolean;
    constructor(game: Phaser.Game);
    public indicatePosition(): {
        x: number;
        y: number;
    };
}
