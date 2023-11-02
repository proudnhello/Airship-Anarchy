class Cannonball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity){
        super(scene, w/2, 0, 'cannonball'); 
        //this.setPosition(Phaser.Math.Between(this.width/2, game.config.height - this.width/2), h + this.height,)
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setImmovable(true);
        this.setCircle(this.width/2)

        this.setVelocity(0, velocity)
    }

    update(){
        if(this.y > h){
            this.destroy(true)
        }
    }
}