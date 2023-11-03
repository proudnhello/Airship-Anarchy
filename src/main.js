/*
Moore Macauley
Airship Anarchy
12 hours of work as of writing (here's to hoping I remember to update this)
Learning how to use gimp to create art assets was *not fun*, spent a good three hours on that if you include the time I wasted trying to make pixel art in ms paint. 
I think they all look okay though. Not good, but servicable
Something about how the airship has multiple hitboxes
Something about shmup/endless runner hybrid, and maybe that thing about the music if i can get it to work
*/

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Load, Menu, Play, Credits],
    pixelArt: true,
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
let cursors
