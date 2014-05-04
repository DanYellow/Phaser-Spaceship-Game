/// <reference path="phaser.d.ts" />
declare class Spaceship extends Phaser.Sprite {
    public speed: number;
    public isDead: boolean;
    constructor(game: Phaser.Game, x: number, y: number, hp?: number);
    public update(): void;
    public blink(): void;
    public indicatePosition(): {
        x: number;
        y: number;
    };
    public explode(): void;
}
