import Phaser from "phaser"
export default class GameWinScene extends Phaser.Scene {
    constructor() {
		super('win-scene')
	}
    	// INIT METHOD
	init(data){
        this.replayButton = undefined
        this.caught = data.caught
	}

	// PRELOAD METHOD
	preload(){
        this.load.image('background','image/Background.jpeg')
        this.load.image('replay-btn','images/Replay Button.png')
		this.load.image('youwin','images/You Win.png')
	}

	// CREATE METHOD
	create(){
		this.add.image(306, 216.5, 'background')
		this.add.image(306, 200, 'youwin').setScale(1)
		this.add.text(250, 290, 'Caught:' + this.caught, {
			// @ts-ignore
			fontSize: '24px', fill: 'black'
		})
		// @ts-ignore
		this.replayButton = this.add.image(306, 350, 'replay-btn')
		// @ts-ignore
		.setInteractive().setScale(0.2)
		this.replayButton.once('pointerdown',() => {
			this.scene.start('catch-the-ball-scene')
		}, this)
	}

}