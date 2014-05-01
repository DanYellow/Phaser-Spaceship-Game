/// <reference path="phaser.d.ts" />
declare class Spaceship extends Phaser.Sprite {
    public speed: number;
    constructor(game: Phaser.Game, x: number, y: number, hp?: number);
    public update(): void;
    public blink(): void;
    public indicatePosition(): {
        x: number;
        y: number;
    };
}
