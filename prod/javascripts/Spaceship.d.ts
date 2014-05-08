/// <reference path="phaser.d.ts" />
declare class Spaceship extends Phaser.Sprite {
    public speed: number;
    public isDead: boolean;
    public invincible: boolean;
    public bullets: Phaser.Group;
    constructor(game: Phaser.Game, x: number, y: number, hp?: number);
    public update(): void;
    public startInvincibleMode(): void;
    public endInvincibleMode(): void;
    public blink(): void;
    public shoot(): void;
    public indicatePosition(): {
        x: number;
        y: number;
    };
    public explode(): void;
}
