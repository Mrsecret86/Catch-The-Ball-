import Phaser from 'phaser'

export default class CatchTheBallScene extends Phaser.Scene {
	constructor() {
		super('catch-the-ball-scene')
	}

	// INIT METHOD
	init(){

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
		this.add.image(1, 1, 'bucket')
		
	}

	// UPDATE METHOD
	update(){

	}
}
