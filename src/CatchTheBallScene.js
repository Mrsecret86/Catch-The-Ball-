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
		this.backsound = undefined
		this.startGame = false
	}

	// PRELOAD METHOD
	preload(){
		this.load.image('background','images/Background.jpeg')
		this.load.image('bucket','images/Bucket.png')
		this.load.image('ball','images/Ball.png')
		this.load.image('bomb','images/Bomb.png')
		this.load.image('explosion','images/Explosion.png')
		this.load.audio('bgsound','music/bgmusic.mp3')
		this.load.audio('boom','music/boom.wav')
		this.load.audio('drop','music/drop.mp3')
		this.load.audio('gameover','music/gameover.wav')
		this.load.audio('win','music/win.mp3')
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
			delay: Phaser.Math.Between(10000, 20000),
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
		this.backsound = this.sound.add('bgsound')
		var soundConfig ={
			loop: true,
			volume: 0.2,
		}
		this.backsound.play(soundConfig)
		if(this.startGame = true){
			this.timerLabel = this.add.text(500, 16, 'Time : ', {
				// @ts-ignore
				fontSize: '16px', fill: 'black'
			}).setDepth(1)
		}
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
			this.timerLabel.setText('Time : '+ this.timer)
		}
	}

 	// CREATE BUCKET METHOD
	createBucket(){
		const bucket = this.physics.add.sprite(306, 50, 'bucket').setScale(0.4)
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
		const positionX = Phaser.Math.Between(50, 612)
		if (balls) {
			balls.spawn(positionX)
		}
	}

	// CAUGHT BALLS
	caughtBalls(bucket, balls){
		balls.die()
		this.caught += 1
		this.sound.play('drop')
	}

	// SPAWN BOMB
	spawnBomb(){
		const config = {
			speed: 30,
			rotation: 0.1
		}
		// @ts-ignore
		const bomb = this.bomb.get(0,0, 'bomb', config).setScale(0.2)
		.refreshBody()
		const positionX = Phaser.Math.Between(50, 612)
		if (bomb) {
			bomb.spawn(positionX)
		}
	}

	// CAUGHT BOMB
	caughtBomb(bucket, bomb){
		bomb.die()
		this.caught -= 5
		this.sound.play('boom')
	}

	// GAMEOVER / WIN METHOD
	gameOver(){
		this.timer--
		if(this.timer < 0 || this.caught >= 5){
			this.sound.stopAll()
			this.sound.play('win')
			this.scene.start('win-scene', {caught: this.caught})
		} else {
			this.sound.stopAll()
			this.sound.play('gameover')
		  	this.scene.start('over-scene',
			{caught: this.caught})
			}
	}

	// GAME START METHOD
	gameStart(){
		this.startGame = true
		this.countdown = this.time.addEvent({
			delay: 10000,
			callback: this.gameOver,
			callbackScope: this,
			loop: true
		})
	}
}
