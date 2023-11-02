class Cannonball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity){
        super(scene, -50, -50, 'cannonball'); 
        //this.setPosition(Phaser.Math.Between(this.width/2, game.config.height - this.width/2), h + this.height,)
        this.setPosition(w/2, h/2)

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setImmovable(true);
        this.setCircle(this.width/2)
    }
}