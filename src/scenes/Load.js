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
        this.load.path = './assets/sfx/';
        this.load.audio('menuSound', 'click.mp3')
        this.load.audio('damageSound', 'smallExplosion.mp3')
        this.load.audio('deathSound', 'bigExplosion.mp3')  
        this.load.audio('startSound', 'start.mp3')
    }

    create() {
        // create the animations
        this.anims.create({
            key:'undamaged',
            frameRate:4,
            repeat:-1,
            frames: this.anims.generateFrameNames('airship', {
                start: 1,
                end:3,
                zeroPad:3,
                prefix:'airship'
            })
        })

        this.anims.create({
            key:'left',
            frameRate:4,
            repeat:-1,
            frames: this.anims.generateFrameNames('airship', {
                start: 7,
                end:9,
                zeroPad:3,
                prefix:'airship'
            })
        })

        this.anims.create({
            key:'right',
            frameRate:4,
            repeat:-1,
            frames: this.anims.generateFrameNames('airship', {
                start: 4,
                end:6,
                zeroPad:3,
                prefix:'airship'
            })
        })

        this.anims.create({
            key:'both',
            frameRate:4,
            repeat:-1,
            frames: this.anims.generateFrameNames('airship', {
                start: 10,
                end:12,
                zeroPad:3,
                prefix:'airship'
            })
        })

        this.anims.create({
            key:'destroyed',
            frameRate:4,
            repeat:-1,
            frames: this.anims.generateFrameNames('airship', {
                start: 13,
                end:13,
                zeroPad:3,
                prefix:'airship'
            })
        })
        // go to Title scene
        this.scene.start('menuScene');
    }
}