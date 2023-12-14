import Phaser from "phaser"
export default class GameOverScene extends Phaser.Scene {
    constructor() {
		super('over-scene')
	}
    	// INIT METHOD
	init(data){
        this.replayButton = undefined
        this.caught = data.caught
	}

	// PRELOAD METHOD
	preload(){
        this.load.image('background','images/Background.jpeg')
        this.load.image('replay-btn','images/Replay Button.png')
		this.load.image('gameover','images/Game Over.png')
	}

	// CREATE METHOD
	create(){
		this.add.image(306, 216.5, 'background')
		this.add.image(306, 150, 'gameover').setScale(0.5)
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