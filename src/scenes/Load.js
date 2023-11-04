class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/sprites/';
        // load graphics assets
        this.load.image('cannonball', 'cannonball.png')
        this.load.image('sky', 'sky.png')
        this.load.path = './assets/atlas/';
        this.load.atlas('airship', 'airship.png', 'airship.json');
        // load audio assets
        this.load.path = './assets/music/';
        this.load.audio('music', 'hotmk.mp3')
    }

    create() {
        // go to Title scene
        this.scene.start('menuScene');
    }
}