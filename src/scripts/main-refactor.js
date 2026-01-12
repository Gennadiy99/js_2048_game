import { Tile } from './utils.js';
import { Cell } from './utils.js';

class Game {
  constructor(size = 4){
    this.size = size;
    this.cellArr = [];// array all cells field
    this.arrChip = [];// Array Obj Chip
  }

// creation of all field cells (Obj)
  createCellsField(){
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
      const cell = new Cell(row, col);

      this.cellArr.push(cell);
      }
    }
  }


  // get random empty cell
  getRandomEmptyCell(){
    const emptyCells = [];

    for (const cell of this.cellArr) {
      if (cell.isEmpty()) {
      emptyCells.push(cell);
      }
    }

    if (emptyCells.length === 0) return null;

    const index = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[index];
  }

  // Creare Obj - chip
  createChip() {
    const cell = this.getRandomEmptyCell();

    if (!cell) {
      return null;
    }

    const chip = new Tile(cell);

    this.arrChip.push(chip);
  }

}

const game = new Game();
game.createCellsField();
game.createChip();
console.log(game.cellArr, game.arrChip);
