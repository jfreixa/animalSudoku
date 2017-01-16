import Phaser from 'phaser'

export default class extends Phaser.State {
  create () {
    let gameDone = this.add.button(0, 0, 'basic', this.newGame, this)
    gameDone.frame = 1
    gameDone.top = (this.game.height - gameDone.height) / 2
    gameDone.left = (this.game.width - gameDone.width) / 2
  }

  newGame () {
    this.state.start('Game')
  }
}
