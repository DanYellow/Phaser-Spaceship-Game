declare class SimpleGame {
    public game: Phaser.Game;
    public enemies: Phaser.Group;
    constructor();
    public preload(): void;
    public create(): void;
}
