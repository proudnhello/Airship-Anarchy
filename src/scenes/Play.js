class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    create(){
        // creates background, and controlls how fast it scrolls
        this.sky = this.add.tileSprite(0, 0, w, h, 'sky').setOrigin(0,0)
        this.scrollSpeed = .5

        cursors = this.input.keyboard.createCursorKeys()

        this.gameOver = false;
        // This tracks the health of the left and right segments
        this.leftIntact = true;
        this.rightIntact = true;
        // variables used for invincibility frames
        this.leftDamagable = true
        this.rightDamagable = true

        // constant for ship acceleration
        this.ACCEL = 2000;

        // determines the velocity of the cannonballs, the speed at which they spawn, and the number of generators
        this.cannonballVelocity = 50
        this.cannonballDelay = 2000
        this.generators = 0

        // determines how much faster the cannonballs get and how much faster they spawn intially
        this.cannonballDelayStep = 50

        // sets maximum velocity, mimium delay, and maximum number of cannonball generators
        this.DELAY_MIN = 400
        this.GEN_MAX = 2

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

        // Begin generating cannonballs
        this.cannonGroup = this.add.group({
            runChildUpdate:true
        })

        this.cannonballGenerator = this.time.addEvent({
            delay: this.cannonballDelay,
            callback: this.createCannonballs,
            callbackScope:this
        })

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
        // creates game over text off screen
        this.death = this.add.text(-100, -100, 'THOU HATH PERISHED\n Press space to return to menu', menuConfig).setOrigin(0.5);

    }

    update(){
        // moving the ship's hitboxes to match the ship (this is probably bad, but idk how to make this work any other way)
        this.left.position.set(this.ship.x - this.ship.width/3 - this.left.halfWidth, this.ship.y - this.left.halfHeight)
        this.center.position.set(this.ship.x - this.center.halfWidth, this.ship.y - this.center.halfHeight)
        this.right.position.set(this.ship.x + this.ship.width/3 - this.right.halfWidth, this.ship.y - this.right.halfHeight)
        this.sky.tilePositionY -= this.scrollSpeed

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

            // display appropriate animations based on damage
            if(this.leftIntact && this.rightIntact){
                this.ship.play('undamaged', true)
            }else if(this.rightIntact){
                this.ship.play('left', true)
            }else if(this.leftIntact){
                this.ship.play('right', true)
            }else{
                this.ship.play('both', true)
            }
        }else{
            this.death.setPosition(w/2, h/2)
            this.ship.setAcceleration(0)
            this.ship.setVelocity(0, 20)
            this.ship.setCollideWorldBounds(false)
            if(cursors.space.isDown){
                this.scene.start('menuScene');    
            }
        }
    }

    // Creates cannonballs indefinitely, changing the rate at which they spawn
    createCannonballs(){
        if(this.gameOver){
            return
        }
        this.cannonGroup.add((new Cannonball(this, this.cannonballVelocity)))
        // Sets the next delay step. As the delay gets less, the amount it is reduced by decreaces as well
        if(this.cannonballDelay > this.DELAY_MIN){
            this.cannonballDelay -= this.cannonballDelayStep
            this.cannonballDelayStep = this.cannonballDelay / 20
        }else if(this.generators < this.GEN_MAX){
            this.cannonballDelay *= 2
            this.generators += 1
            this.cannonballGenerator = this.time.addEvent({
                delay: this.cannonballDelay + Phaser.Math.Between(0, this.cannonballDelay),
                callback: this.simpleCannonballGenerator,
                callbackScope:this
            })
        }
        this.cannonballGenerator = this.time.addEvent({
            delay: this.cannonballDelay,
            callback: this.createCannonballs,
            callbackScope:this
        })
        console.log(this.generators, " ", this.cannonballDelay)
    }

    // A simpler cannonball generator, that does not change the difficulty as it spawns in balls
    simpleCannonballGenerator(){
        if(this.gameOver){
            return
        }
        this.cannonGroup.add((new Cannonball(this, this.cannonballVelocity)))
        this.cannonballGenerator = this.time.addEvent({
            delay: this.cannonballDelay,
            callback: this.createCannonballs,
            callbackScope:this
        })
    }

    // Ends the game, simple enough
    endGame(){
        this.gameOver = true
    }

    // If left is intact, changes the tracker of leftIntact to false, then returns false
    // If it is not, return true, which will cause the second callback function to be used in the colision event, which ends the game
    leftCollide(){
        if(this.leftDamagable){
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