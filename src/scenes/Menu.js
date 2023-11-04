class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    create(){
      // creates sky background
      this.sky = this.add.tileSprite(0, 0, w, h, 'sky').setOrigin(0,0)

      // sets up menu font
      let menuConfig = {
          fontFamily: 'Fantasy',
          fontSize: '28px',
          color: '#843605',
          align: 'center',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }

      // Menu text
      this.add.text(w/2, h/2 - 150, 'AIRSHIP ANARCHY', menuConfig).setOrigin(0.5);
      this.add.text(w/2, h/2 - 50, 'Use arrow keys to move, dodge the cannonballs\nYour ship can survive one hit to each side\nGetting hit in the center means game over', menuConfig).setOrigin(0.5);

      // Green menu text
      menuConfig.color = '#000'
      this.add.text(w/2, h/2 + 50, 'Press ← or → to start', menuConfig).setOrigin(0.5);
      this.add.text(w/2, h/2 + 150, 'Press ↑ or ↓ to view credits', menuConfig).setOrigin(0.5);
        
      // Key def (only needs arrow keys)
      cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (cursors.left.isDown) {
          this.scene.start('playScene');    
        }
        if (cursors.right.isDown) {
          this.scene.start('playScene');    
        }
        if (cursors.up.isDown) {
          this.scene.start('creditsScene');    
        }
        if (cursors.down.isDown) {
          this.scene.start('creditsScene');    
        }
    }
  }