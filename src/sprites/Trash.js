import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game }) {
    super(game, game.width - 50, game.height + 50, 'basic', 'trashClose.png')
    this.game = game
    this.anchor.set(1)
    this.game.physics.arcade.enable(this)
    this.game.add.existing(this)
  }

  open () {
    this.frame = 3
  }
  close () {
    this.frame = 2
  }
}
