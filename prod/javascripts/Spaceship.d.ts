/// <reference path="phaser.d.ts" />
declare class Spaceship extends Phaser.Sprite {
    public bullets: Phaser.Group;
    public mouse: Phaser.Mouse;
    public speed: number;
    public isDead: boolean;
    public invincible: boolean;
    public bulletsGoesLeft: boolean;
    public bulletsType: any;
    public bulletType: string;
    public fireRate: number;
    public nextFire: number;
    public i: number;
    constructor(game: Phaser.Game, x: number, y: number, hp?: number);
    public update(): void;
    public startInvincibleMode(): void;
    public endInvincibleMode(): void;
    public blink(): void;
    public shoot(bulletType: any): void;
    public indicatePosition(): {
        x: number;
        y: number;
    };
    public explode(): void;
}
