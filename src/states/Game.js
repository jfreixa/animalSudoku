/* globals __DEV__ */
import Phaser from 'phaser'
import Tile from '../sprites/Tile'
import DraggableTile from '../sprites/DraggableTile'
import Trash from '../sprites/Trash'
// import Background from '../sprites/Background'

export default class Game extends Phaser.State {
  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.tileSize = 180
    this.spaceBetween = 5
    this.sudokuProblem = [
      [0, 3, 1, 0],
      [2, 1, 3, 4],
      [0, 4, 0, 1],
      [1, 2, 0, 3]
    ]
    this.sudokuComplete = [
      [4, 3, 1, 2],
      [2, 1, 3, 4],
      [3, 4, 2, 1],
      [1, 2, 4, 3]
    ]
    // this.background = new Background({ game: this.game })

    this.trash = new Trash({ game: this.game })

    this.placeStaticTiles()
    this.placeDraggableTiles()
    this.draggablePositions.forEach(tile => {
      this.draggableTiles.forEach(draggabletile => {
        draggabletile.events.onDragStop.add((currentSprite) => {
          this.onStopDrag(currentSprite, tile)
        }, this)
      })
      tile.events.onDragStop.add((currentSprite) => {
        this.game.physics.arcade.overlap(currentSprite, this.trash, () => this.removeTile(tile))
        currentSprite.goToOriginalPosition()
        this.trash.close()
      }, this)
      tile.events.onDragStart.add(this.onDragStart, this)
    })
    this.draggableTiles.forEach(tile => {
      tile.events.onDragStart.add(this.onDragStart, this)
    })
  }

  placeStaticTiles () {
    let numCols = this.sudokuProblem.length
    let numRows = this.sudokuProblem[0].length
    let leftSpace = (this.game.width - (numCols * this.tileSize) - ((numCols - 1))) / 2
    let topSpace = (this.game.height - (numRows * this.tileSize) - ((numRows - 1))) / 2

    this.draggablePositions = []

    this.actualSudoku = this.sudokuProblem.map((current, index1) => {
      return current.map((current, index2) => {
        let position = {
          x: leftSpace + index1 * this.tileSize + this.spaceBetween * index1,
          y: topSpace + index2 * this.tileSize + this.spaceBetween * index2
        }
        let sprite
        sprite = new Tile({
          game: this.game,
          x: position.x,
          y: position.y,
          tileSize: this.tileSize,
          frame: current
        })
        if (current === 0) {
          sprite = new DraggableTile({
            game: this.game,
            x: position.x,
            y: position.y,
            tileSize: this.tileSize,
            frame: current,
            drag: false
          })
          this.draggablePositions.push(sprite)
        }
        return sprite
      })
    })
  }

  placeDraggableTiles () {
    let numRows = this.sudokuProblem[0].length
    let topSpace = (this.game.height - (numRows * this.tileSize) - ((numRows - 1))) / 2
    let animals = [1, 2, 3, 4]
    this.draggableTiles = []
    animals.map(number => {
      this.draggableTiles.push(
        new DraggableTile({
          game: this.game,
          x: 50,
          y: topSpace + (number - 1) * this.tileSize + this.spaceBetween * (number - 1),
          tileSize: this.tileSize,
          frame: number,
          drag: true
        })
      )
    })
  }

  onDragStart (currentSprite) {
    currentSprite.bringToTop()
    this.trash.open()
  }

  onStopDrag (currentSprite, endSprite) {
    this.game.physics.arcade.overlap(currentSprite, endSprite, () => this.changeSprite(currentSprite, endSprite))
    currentSprite.goToOriginalPosition()
    this.trash.close()
  }

  changeSprite (currentSprite, endSprite) {
    if (endSprite.frame === 0) {
      endSprite.frame = currentSprite.frame
      endSprite.input.draggable = true
      this.endGame()
    }
  }

  endGame () {
    if (this.isCompleted()) {
      let actual = this.actualSudoku.map(line => line.map(object => object.frame)).join()
      if (actual === this.sudokuComplete.join()) {
        this.state.start('Win')
      } else {
        this.actualSudoku.forEach((line, i) => {
          line.forEach((object, j) => {
            if (object.frame !== this.sudokuComplete[i][j]) {
              object.tint = 0.9278033516703359 * 0xffffff
            }
          })
        })
      }
    }
  }

  isCompleted () {
    return this.actualSudoku.every(line => line.every(object => object.frame !== 0))
  }

  removeTile (currentSprite) {
    currentSprite.tint = 0xffffff
    currentSprite.frame = 0
    currentSprite.input.draggable = false
  }
}
