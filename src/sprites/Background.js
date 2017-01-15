import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game }) {
    super(game, 0, 0, 'basic')
    this.width = game.width
    this.height = game.height
    this.game = game
    this.game.add.existing(this)
  }
}
