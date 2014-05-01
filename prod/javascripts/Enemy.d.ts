/// <reference path="phaser.d.ts" />
declare class Enemy extends Phaser.Sprite {
    public game: Phaser.Game;
    private minSpeed;
    private maxSpeed;
    constructor(game: Phaser.Game);
    public indicatePosition(): {
        x: number;
        y: number;
    };
}
