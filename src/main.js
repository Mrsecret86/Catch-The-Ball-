import Phaser from 'phaser'

import CatchTheBallScene from './CatchTheBallScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 612,
	height: 433,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [CatchTheBallScene],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	}
}

export default new Phaser.Game(config)