class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    create(){
        this.cameras.main.setBackgroundColor(0x89CFF0);
        cursors = this.input.keyboard.createCursorKeys()

        this.gameOver = false;
        // This tracks the health of the left and right segments
        this.leftIntact = true;
        this.rightIntact = true;
        // variables used for invincibility frames
        this.leftDamagable = true
        this.rightDamagable = true
        this.ACCEL = 2000;

        // creating the ship
        this.ship = this.physics.add.sprite(w/2, h/2, "airship", 0)
        this.ship.setImmovable(true);
        this.ship.setCollideWorldBounds(true);

        // creating the ship's hitboxes
        this.left = this.physics.add.body(0, 0, this.ship.width/3, this.ship.height)
        this.center = this.physics.add.body(0, 0, this.ship.width/3, this.ship.height);
        this.right = this.physics.add.body(0, 0, this.ship.width/3, this.ship.height);

        this.left.setImmovable(true)
        this.center.setImmovable(true)
        this.right.setImmovable(true)

        this.cannonGroup = this.add.group({
            runChildUpdate:true
        })

        this.cannonballGenerator = this.time.addEvent({
            delay: 2000,
            callback: this.createCannonballs,
            loop:true,
            callbackScope:this
        })

    }

    update(){
        // moving the ship's hitboxes to match the ship (this is probably bad, but idk how to make this work any other way)
        this.left.position.set(this.ship.x - this.ship.width/3 - this.left.halfWidth, this.ship.y - this.left.halfHeight)
        this.center.position.set(this.ship.x - this.center.halfWidth, this.ship.y - this.center.halfHeight)
        this.right.position.set(this.ship.x + this.ship.width/3 - this.right.halfWidth, this.ship.y - this.right.halfHeight)

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
            this.ship.setAcceleration((this.ACCEL * shipVector.x)/xMod, (this.ACCEL * shipVector.y)/yMod)

            // Deal with collisions between cannon balls and all parts of the ship
            // Lot of redundant code, but such is life
            this.physics.world.overlap(this.left, this.cannonGroup, this.endGame, this.leftCollide, this)
            this.physics.world.overlap(this.center, this.cannonGroup, this.endGame, null, this)
            this.physics.world.overlap(this.right, this.cannonGroup, this.endGame, this.rightCollide, this)
        }
    }

    // Creates one (1) cannonball
    // TODO: Make this not shit
    createCannonballs(){
        this.cannonGroup.add((new Cannonball(this, 50)))
    }

    // Ends the game, simple enough
    endGame(){
        this.ship.destroy(true)
        this.gameOver = true
        console.log("Simply an issue of skill")
    }

    // If left is intact, changes the tracker of leftIntact to false, then returns false
    // If it is not, return true, which will cause the second callback function to be used in the colision event, which ends the game
    leftCollide(){
        if(this.leftDamagable){
            console.log("Left owie")
            if(this.leftIntact){
                this.leftIntact = false;
                this.leftDamagable = false;
                this.leftCountdown = this.time.addEvent({
                    delay:1000,
                    callback: this.leftInvincibility,
                    callbackScope: this
                })
                return false
            }else{
                return true
            }
        }
        return false
    }

    // see leftCollide()
    rightCollide(){
        if(this.rightDamagable){
            console.log("Right owie")
            this.rightDamagable = false;
            this.rightCountdown = this.time.addEvent({
                delay:1000,
                callback: this.rightInvincibility,
                callbackScope: this
            })
            if(this.rightIntact){
                this.rightIntact = false;
                return false
            }else{
                return true
            }
        }
        return false
    }

    // Used to proivde invincibility frames for the left side
    leftInvincibility(){
        this.leftDamagable = true
    }
    // Used to proivde invincibility frames for the right side
    rightInvincibility(){
        this.rightDamagable = true
    }


}