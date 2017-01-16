import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#c2e187'
  }

  preload () {
    this.load.atlasJSONHash('tiles', './assets/images/casillas.png', './assets/images/casillas.json')
    this.load.atlasJSONHash('basic', './assets/images/basic.png', './assets/images/basic.json')

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')

    this.game.input.maxPointers = 1
  }

  create () {
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  render () {
    this.state.start('Game')
  }

}
