import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
  }

  preload () {
    this.load.atlasJSONHash('tiles', './assets/images/casillas.png', './assets/images/casillas.json')
    this.load.atlasJSONHash('basic', './assets/images/basic.png', './assets/images/basic.json')

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  render () {
    this.state.start('Game')
  }

}
