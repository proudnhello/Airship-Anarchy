class Cannonball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity){
        super(scene, w/2, 0, 'cannonball'); 
        this.setPosition(Phaser.Math.Between(0, w), 0)
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCircle(this.width/2)

        this.setVelocity(Phaser.Math.Between(-velocity, velocity), velocity)
    }

    update(){
        if(this.y > h + this.height){
            this.destroy(true)
        }
    }
}