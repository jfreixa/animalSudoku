/* globals __DEV__ */
import Phaser from 'phaser'
import Tile from '../sprites/Tile'
import DraggableTile from '../sprites/DraggableTile'
import Thrash from '../sprites/Thrash'
import Background from '../sprites/Background'

export default class Game extends Phaser.State {
  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.tileSize = 94
    this.sudokuProblem = [
      [4, 3, 1, 2],
      [2, 0, 3, 4],
      [0, 4, 2, 1],
      [1, 2, 4, 3]
    ]
    this.sudokuComplete = [
      [4, 3, 1, 2],
      [2, 1, 3, 4],
      [3, 4, 2, 1],
      [1, 2, 4, 3]
    ]
    this.draggablePositions = []
    this.background = new Background({ game: this.game })
    this.thrash = new Thrash({
      game: this.game
    })

    this.placeTiles()
    this.insertDraggableTiles()
    this.draggablePositions.forEach(tile => {
      this.draggableTiles.forEach(draggabletile => {
        draggabletile.events.onDragStop.add((currentSprite) => {
          this.stopDrag(currentSprite, tile)
        }, this)
      })
      tile.events.onDragStop.add((currentSprite) => {
        this.game.physics.arcade.overlap(currentSprite, this.thrash, () => this.removeTile(tile))
      }, this)
    })
  }
  placeTiles () {
    let numCols = 4
    let numRows = 4
    let spaceBetween = 1
    let leftSpace = (this.game.width - (numCols * this.tileSize) - ((numCols - 1))) / 2
    let topSpace = (this.game.height - (numRows * this.tileSize) - ((numRows - 1))) / 2
    this.actualSudoku = this.sudokuProblem.map((current, index1) => {
      return current.map((current, index2) => {
        let position = {
          x: leftSpace + index1 * this.tileSize + spaceBetween * index1,
          y: topSpace + index2 * this.tileSize + spaceBetween * index2
        }
        let sprite
        if (current === 0) {
          sprite = this.draggableTile = new DraggableTile({
            game: this.game,
            x: position.x,
            y: position.y,
            tileSize: this.tileSize,
            frame: current,
            drag: false
          })
          this.draggablePositions.push(sprite)
        } else {
          sprite = new Tile({
            game: this.game,
            x: position.x,
            y: position.y,
            tileSize: this.tileSize,
            frame: current
          })
        }
        return sprite
      })
    })
  }
  stopDrag (currentSprite, endSprite) {
    if (!this.game.physics.arcade.overlap(currentSprite, endSprite, () => this.changeSprite(currentSprite, endSprite))) {
      currentSprite.goToOriginalPosition()
    }
  }

  changeSprite (currentSprite, endSprite) {
    if (endSprite.frame === 0) {
      endSprite.frame = currentSprite.frame
      endSprite.input.draggable = true
      this.win()
    }
  }

  win () {
    let actual = this.actualSudoku.map(line => line.map(object => object.frame)).join()
    if (actual === this.sudokuComplete.join()) {
      console.log('win')
    }
  }

  insertDraggableTiles () {
    let arr = [1, 2, 3, 4]
    this.draggableTiles = []
    arr.map(number => {
      this.draggableTiles.push(
        new DraggableTile({
          game: this.game,
          x: 0,
          y: -100 + (this.tileSize * number),
          tileSize: this.tileSize,
          frame: number,
          drag: true
        })
      )
    })
  }

  removeTile (currentSprite) {
    currentSprite.frame = 0
    currentSprite.input.draggable = false
    currentSprite.goToOriginalPosition()
  }
}
