/*
Moore Macauley

Comandeered assets:
Airship by natebot13, found here: https://opengameart.org/content/airship
*/

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Load, Menu, Play],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0 
            }
        }
    },

}

let game = new Phaser.Game(config);

// GLOBAL VARIABLES
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;

// Reserving keys
let keyF, keyR, keyLEFT, keyRIGHT;
