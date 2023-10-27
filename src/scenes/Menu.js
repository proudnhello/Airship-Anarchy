class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload() {
        
      }

    create(){
        // sets up menu font
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // Menu text
        this.add.text(game.config.width/2, game.config.height/2 - 100, 'AIRSHIP ANARCHY', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use arrow keys to move', menuConfig).setOrigin(0.5);

        // Green menu text
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + 100, 'Press ← or → to start', menuConfig).setOrigin(0.5);
        
        // Key def
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          this.scene.start('playScene');    
        }
      }
}