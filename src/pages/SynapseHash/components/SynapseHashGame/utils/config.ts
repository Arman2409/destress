export const getConfig = (
    scene: Phaser.Scene
) => ({
    type: Phaser.AUTO,
    width: "100%",
    height: "100%",
    parent: "phaser-container",
    scene,
    physics: {
        default: 'arcade',
    },
})