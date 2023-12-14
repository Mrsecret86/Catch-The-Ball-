import Phaser from "phaser"
export default class GameStartScene extends Phaser.Scene {
    constructor() {
		super('start-scene')
	}
    	// INIT METHOD
	init(data){
        this.startButton = undefined
	}

	// PRELOAD METHOD
	preload(){
        this.load.image('background','images/Background.jpeg')
        this.load.image('start-btn','images/Start Button.png')
		this.load.image('logo','images/Logo.png')
	}

	// CREATE METHOD
	create(){
		this.add.image(306, 216.5, 'background')
		this.add.image(306, 150, 'logo').setScale(0.5)
			// @ts-ignore
		this.startButton = this.add.image(306, 350, 'start-btn')
			// @ts-ignore
		.setInteractive().setScale(0.3)
		this.startButton.once('pointerdown',() => {
			this.scene.start('catch-the-ball-scene')
		}, this)
	}

}