import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, tileSize, frame, drag }) {
    super(game, x, y, 'tiles')
    this.game = game
    this.width = tileSize
    this.height = tileSize
    this.frame = frame
    this.game.add.existing(this)
    this.game.physics.arcade.enable(this)
    this.inputEnabled = true
    this.input.enableDrag()
    this.input.draggable = drag
    this.originalPosition = this.position.clone()
  }
  goToOriginalPosition () {
    this.position.copyFrom(this.originalPosition)
  }
}
