/*
Moore Macauley
Airship Anarchy
1 as of writing (here's to hoping I remember to update this)
Something about how the airship has multiple hitboxes
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
            //debug: true,
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
let cursors
