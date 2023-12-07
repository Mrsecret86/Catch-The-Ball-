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
        this.load.image('background','image/Background.jpeg')
        this.load.image('gameover','images/Game Over.png')
        this.load.image('replay-btn'.'images/Replay Button.png')
	}

	// CREATE METHOD
	create(){
	}

}