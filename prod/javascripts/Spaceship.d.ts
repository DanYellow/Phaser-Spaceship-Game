/// <reference path="phaser.d.ts" />
declare class Spaceship extends Phaser.Sprite {
    public game: Phaser.Game;
    constructor(posX: any, posY: any, hp?: number);
    public update(): void;
    public sprite(): void;
}
