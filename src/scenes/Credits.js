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
        https://creativecommons.org/licenses/by/4.0/`, creditsConfig).setOrigin(0.5);
    }

    update(){
        if (cursors.left.isDown) {
            this.scene.start('menuScene');    
          }
          if (cursors.right.isDown) {
            this.scene.start('menuScene');    
          }
          if (cursors.up.isDown) {
            this.scene.start('menuScene');    
          }
          if (cursors.down.isDown) {
            this.scene.start('menuScene');    
          }
    }
}