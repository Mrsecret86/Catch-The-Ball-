import Phaser from 'phaser'
import FallingObject from './ui/FallingObject'

export default class CatchTheBallScene extends Phaser.Scene {
	constructor() {
		super('catch-the-ball-scene')
	}

	// INIT METHOD
	init(){
		this.bucket = undefined
		this.speed = 100
		this.nav_left = false;
		this.nav_right = false;
		this.cursor = undefined
		this.balls = undefined;
		this.ballSpeed = 50;
		this.caughtText = undefined
		this.caught = 0
		this.bomb = undefined;
		this.bombSpeed = 70;
		this.timer = 60
		this.timerLabel = undefined
		this.countdown = undefined
	}

	// PRELOAD METHOD
	preload(){
		this.load.image('background','images/Background.jpeg')
		this.load.image('bucket','images/Bucket.png')
		this.load.image('ball','images/Ball.png')
		this.load.image('bomb','images/Bomb.png')
		this.load.image('explosion','images/Explosion.png')
	}

	// CREATE METHOD
	create(){
		this.add.image(306, 216.5, 'background')
		this.bucket = this.createBucket()
		this.cursor = this.input.keyboard.createCursorKeys()
		this.balls = this.physics.add.group({
			classType: FallingObject,
			maxSize: 10,
			runChildUpdate: true
		})
		this.time.addEvent({
			delay: Phaser.Math.Between(1000, 5000),
			callback: this.spawnBalls,
			callbackScope: this,
			loop: true
		})
		this.physics.add.overlap(
			this.bucket,
			this.balls,
			this.caughtBalls,
			null,
			this
		)
		this.caughtText = this.add.text(16, 16, 'Caught : 0', {
			// @ts-ignore
			fontSize: '16px', fill: 'black'
		}).setDepth(1)
		this.bomb = this.physics.add.group({
			classType: FallingObject,
			maxSize: 10,
			runChildUpdate: true
		})
		this.time.addEvent({
			delay: Phaser.Math.Between(5000, 10000),
			callback: this.spawnBomb,
			callbackScope: this,
			loop: true
		})
		this.physics.add.overlap(
			this.bucket,
			this.bomb,
			this.caughtBomb,
			null,
			this
		)
		this.timerLabel = this.add.text(500, 16, 'Time :', {
			// @ts-ignore
			fontSize: '16px', fill: 'black'
		}).setDepth(1)
	}

	// UPDATE METHOD
	update(){
		if (this.cursor.left.isDown){
			this.bucket.setVelocity(-200, 200)
		} else if (this.cursor.right.isDown){
			this.bucket.setVelocity(200, 200)
		}
		this.caughtText.setText('Caught: '+ this.caught)
		if(this.startGame = true){
			this.timerLabel.setText('Timer :'+ this.timer)
		}
		this.countdown = this.time.addEvent({
			delay: 6000,
			callback: this.gameOver,
			callbackScope: this,
			loop: true
		})
	}

 	// CREATE BUCKET METHOD
	createBucket(){
		const bucket = this.physics.add.sprite(306, 100, 'bucket').setScale(0.4)
		.refreshBody();
		bucket.setCollideWorldBounds(true)
		return bucket
	}

	// MOVE BUCKET METHOD
	moveBucket(bucket, time){
		if (this.nav_left){
			this.bucket.setVelocityX(this.speed * -1)
			this.bucket.setFlipX(false)
		} else if (this.nav_right){
			this.bucket.setVelocityX(this.speed)
			this.bucket.setFlipX(true)
		} else {
			this.bucket.setVelocityX(0)
		}
	}

	// SPAWN BALLS
	spawnBalls(){
		const config = {
			speed: 30,
			rotation: 0.1
		}
		// @ts-ignore
		const balls = this.balls.get(0,0, 'ball', config).setScale(0.2)
		.refreshBody()
		const positionX = Phaser.Math.Between(50, 350)
		if (balls) {
			balls.spawn(positionX)
		}
	}

	// CAUGHT BALLS
	caughtBalls(bucket, balls){
		balls.die()
		this.caught += 1
	}

	// SPAWN Bomb
	spawnBomb(){
		const config = {
			speed: 30,
			rotation: 0.1
		}
		// @ts-ignore
		const bomb = this.bomb.get(0,0, 'bomb', config).setScale(0.2)
		.refreshBody()
		const positionX = Phaser.Math.Between(50, 350)
		if (bomb) {
			bomb.spawn(positionX)
		}
	}

	// CAUGHT BOMB
	caughtBomb(bucket, bomb){
		bomb.die()
		this.caught -= 5
	}

	// GAMEOVER METHOD
	gameOver(){
		this.timer--
		if(this.timer <0){
			this.scene.start('over-scene',
			{caught: this.caught})
		}
	}
}
