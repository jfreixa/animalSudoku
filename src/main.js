import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import GameState from './states/Game'
import WinState from './states/Win'

class Game extends Phaser.Game {

  constructor () {
    let width = 1920
    let height = 1024

    super(width, height, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Game', GameState, false)
    this.state.add('Win', WinState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
