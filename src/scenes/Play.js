class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    create(){
        // creates background, and controlls how fast it scrolls
        this.sky = this.add.tileSprite(0, 0, w, h, 'sky').setOrigin(0,0)
        this.scrollSpeed = .5

        this.score = 0
        this.scoreIncrement = 1

        let scoreConfig = {
            fontSize: '26px',
            color: '#000000',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.scoreLeft = this.add.text(0, 0, this.score, scoreConfig);

        this.newCycle = false

        cursors = this.input.keyboard.createCursorKeys()

        // start playing the music
        this.music = this.sound.add('music', {
            mute: false,
            volume: .25,
            rate: 1,
            loop: true,
        })
        this.music.play()

        // start a new cycles when the song loops
        this.cycles = this.time.addEvent({
            delay: 147000,
            callback: this.endCycle,
            callbackScope:this
        })
        
        // Create sfx
        this.damageSound = this.sound.add('damageSound', {
            mute: false,
            volume: .5,
            rate: 1,
        })

        this.deathSound = this.sound.add('deathSound', {
            mute: false,
            volume: .25,
            rate: 1,
        })

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
        this.CANNONBALL_VELOICTY = 50
        this.CANNONBALL_DELAY = 1000
        this.GENERATORS = 0

        this.cannonballVelocity = this.CANNONBALL_VELOICTY
        this.cannonballDelay = this.CANNONBALL_DELAY
        this.cannonballDelayStepStep = 150
        this.generators = this.GENERATORS

        // determines how much faster the cannonballs get and how much faster they spawn intially
        this.cannonballDelayStep = this.cannonballDelay / this.cannonballDelayStepStep

        // sets maximum velocity, mimium delay, and maximum number of cannonball generators
        this.DELAY_MIN = 600
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
            this.ship.play('destroyed', true)
            this.cannonGroup.destroy(true, true)
            this.music.stop(true)
            if(cursors.space.isDown){
                this.scene.start('menuScene');    
            }
        }

        this.scoreLeft.text = this.score
    }

    // Creates cannonballs indefinitely, changing the rate at which they spawn
    createCannonballs(){
        if(this.gameOver || (this.newCycle && this.generators != 0)){
            this.generators--
            return
        }
        this.cannonGroup.add((new Cannonball(this, this.cannonballVelocity)))
        this.score += this.scoreIncrement
        // Sets the next delay step. As the delay gets less, the amount it is reduced by decreaces as well
        if(this.cannonballDelay > this.DELAY_MIN){
            this.cannonballDelay -= this.cannonballDelayStep
            this.cannonballDelayStep = this.cannonballDelay / this.cannonballDelayStepStep
        }else if(this.generators < this.GEN_MAX){
            this.newCycle = false
            this.cannonballDelay *= 2
            this.generators += 1
            this.cannonballGenerator = this.time.addEvent({
                delay: this.cannonballDelay + Phaser.Math.Between(0, this.cannonballDelay),
                callback: this.createCannonballs,
                callbackScope:this
            })
        }
        this.cannonballGenerator = this.time.addEvent({
            delay: this.cannonballDelay,
            callback: this.createCannonballs,
            callbackScope:this
        })
    }

    // Ends the game, simple enough
    endGame(){
        this.deathSound.play()
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
                this.damageSound.play()
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
                this.damageSound.play()
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

    // Ends a cycle
    endCycle(){
        if(this.gameOver){
            return
        }
        this.scoreIncrement++
        this.newCycle = true
        this.cannonballVelocity = this.CANNONBALL_VELOICTY
        this.cannonballDelay = this.CANNONBALL_DELAY
        this.cannonballDelayStepStep = 150
        this.velocity += 15
        this.rightIntact = true
        this.leftIntact = true
    }

}