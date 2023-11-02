class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    create(){
        this.cameras.main.setBackgroundColor(0x89CFF0);
        cursors = this.input.keyboard.createCursorKeys()

        this.gameOver = false;
        // This tracks the health of the left and right segments
        this.leftIntact = 2;
        this.rightIntact = 2;
        this.ACCEL = 2000;

        // creating the ship's center
        this.ship = this.physics.add.sprite(w/2, h/2, "center", 0)
        this.ship.setImmovable(true);
        this.ship.setCollideWorldBounds(true);

        //creating the sides of the ship
        this.right = this.physics.add.sprite(w/2 + this.ship.width, h/2, "edge", 0)
        this.left = this.physics.add.sprite(w/2 - this.ship.width, h/2, "edge", 0)
        this.left.flipX = true
        this.left.setImmovable(true)
        this.left.setCollideWorldBounds(true)
        this.right.setImmovable(true)
        this.right.setCollideWorldBounds(true)
    }

    update(){
        if(!this.gameOver){
            // Player movement
            let shipVector = new Phaser.Math.Vector2(0, 0);
            if(cursors.left.isDown){
                shipVector.x = -1
            }
            else if(cursors.right.isDown){
                shipVector.x = 1
            }
            if(cursors.up.isDown){
                shipVector.y = -1
            }
            else if(cursors.down.isDown){
                shipVector.y = 1
            }
    
            shipVector.normalize()
            // The player should decelerate at the fastest speed, and should speed up more slowly the faster they are going
            let x = this.ship.body.velocity.x
            let y = this.ship.body.velocity.y
            let xMod = 1;
            let yMod = 1;

            // If the x values are moving the same way, then reduce the acceleration
            if((x < 0 && shipVector.x < 0) || (x > 0 && shipVector.x > 0)){
                xMod = Math.ceil(Math.abs(x)/20);
            }
            // Then do the same for y
            if((y < 0 && shipVector.y < 0) || (y > 0 && shipVector.y > 0)){
                yMod = Math.ceil(Math.abs(y)/20);
            }
            // this should (hopefully) keep all the parts of the ship together
            this.ship.setAcceleration((this.ACCEL * shipVector.x)/xMod, (this.ACCEL * shipVector.y)/yMod)
            this.left.setAcceleration((this.ACCEL * shipVector.x)/xMod, (this.ACCEL * shipVector.y)/yMod)
            this.right.setAcceleration((this.ACCEL * shipVector.x)/xMod, (this.ACCEL * shipVector.y)/yMod)
        }
    }


}