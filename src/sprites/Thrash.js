import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game }) {
    super(game, game.width, game.height, 'basic', 'trashOpen.png')
    this.game = game
    this.anchor.set(1)
    this.game.physics.arcade.enable(this)
    this.game.add.existing(this)
  }
}
