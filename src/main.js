import Phaser, { Scene } from 'phaser'

import GameStartScene from './GameStartScene'
import CatchTheBallScene from './CatchTheBallScene'
import GameOverScene from './GameOverScene'
import GameWinScene from './GameWinScene'

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
	scene: [GameStartScene, CatchTheBallScene, GameWinScene, GameOverScene],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	}
}

export default new Phaser.Game(config)
