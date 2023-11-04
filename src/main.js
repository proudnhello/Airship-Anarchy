/*
Moore Macauley
Airship Anarchy
17 hours of work as of writing
Learning how to use gimp to create art assets was *not fun*, spent a good three hours on that if you include the time I wasted trying to make pixel art in ms paint. 
I think they all look okay though. Not good, but servicable

For my technical tilt, I noticed that the vast majority of endless runners immediately resulted in a game over upon the player taking a single hit.
I thought it would be interesting to give the player some health. But just letting the player tank a few hits seemed too easy and boring.
So instead, I made it so the player can take one glancing shot on each side before dying, but if their ship takes a direct hit, it's game over.
This was far, far more difficult than I expected, mostly due to me trying things that didn't really work, usually because of it looking like the ship was breaking into
three pieces whenever it moved up and down or getting crushed into a single cube whenever a wall was hit.
Eventually, I used one sprit for the actual airship, and then three textureless physics objects that overlap it. While the hitboxes do drift slightly away from the 
ship when it is moving particularly quickly, same as the individual parts would in my other attempts, with them being invisable the player probably would never noticed.

For my artistic tilt, I first decided it would be interesting to make an endless runner/bullet hell hybrid game.
While the patterns of my bullets are not as intricate as ones from a bullet hell, randomly generated as they are, I emulated one by increaces the number of 
projectiles the player has to deal with without increacing the speed of them.
Then, one that was made, it occured to me that hall of the mountain king, easily one of my favorite royalty free tracks, would fit perfectly with my gameplay.
It was then inspiration struck for my second particularly artistic thing, to match the game up with the music. 
When the song loops, the game completes what I have been calling a cycle. When this happens, it will slighly increace the speed of the bullets and increace the rate of 
point gain, but otherwise it will reset to the rate that bullets spawn back to where it started.
This allows the anxiety inducing song to continue to fit the gameplay, even after it loops.
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
