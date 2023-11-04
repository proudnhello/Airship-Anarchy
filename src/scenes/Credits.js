class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }
    create(){
        // creates sky background
        this.sky = this.add.tileSprite(0, 0, w, h, 'sky').setOrigin(0,0)

        // Key def (only needs arrow keys)
        cursors = this.input.keyboard.createCursorKeys()

        let creditsConfig = {
            fontSize: '16px',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(w/2, h/2, `Press any arrow key to return to menu\n
        Code and visual assets done by Moore Macauley\n
        Hall of the Mountain King by Kevin MacLeod  •  Edvard Grieg | http://incompetech.com\n
        Music promoted by https://www.free-stock-music.com\n
        Creative Commons / Attribution 4.0 International (CC BY 4.0)\n
        https://creativecommons.org/licenses/by/4.0/\n
        Other sfx comes from Pixabay, notably:\n
        Menu Click: https://pixabay.com/sound-effects/click-for-game-menu-131903/\n
        Start Sound: https://pixabay.com/sound-effects/startup-sound-fx-1-roland-mt-32-95204/\n
        Damage Sound: https://pixabay.com/sound-effects/explosion-6055/\n
        Death Sound: https://pixabay.com/sound-effects/explosion-6801/`, creditsConfig).setOrigin(0.5);

        // define sounds
        this.menu = this.sound.add('menuSound', {
          mute: false,
          volume: .5,
          rate: 1
        })
    }

    update(){
        if (cursors.left.isDown) {
            this.scene.start('menuScene');    
            this.menu.play()
          }
          if (cursors.right.isDown) {
            this.scene.start('menuScene');    
            this.menu.play()
          }
          if (cursors.up.isDown) {
            this.scene.start('menuScene');    
            this.menu.play()
          }
          if (cursors.down.isDown) {
            this.scene.start('menuScene');    
            this.menu.play()
          }
    }
}