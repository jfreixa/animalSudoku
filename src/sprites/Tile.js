import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, tileSize, frame }) {
    super(game, x, y, 'tiles')
    this.game = game
    this.width = tileSize
    this.height = tileSize
    this.frame = frame
    this.game.add.existing(this)
  }
}
