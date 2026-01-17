import { Tile } from './utils.js';
import { createCellsField } from './utils.js';
import { ramdom } from './utils.js';

export class Game {
  constructor() {
    this.cellArr = this.#createCellsField(); // array all cells field
    this.arrChip = []; // Array Obj Chip
  }

  // get random empty cell
  #getRandomEmptyCell() {
    const emptyCells = [];

    for (const cell of this.cellArr) {
      // console.log(`Клетка поля: `, cell, this.cellArr);

      if (cell.isEmpty) {
        emptyCells.push(cell);
      }
    }

    if (emptyCells.length === 0) return null;

    return ramdom(emptyCells);
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

  getState() {}

  getScore() {}

  getStatus() {}

  moveLeft() {}

  moveRight() {}

  moveUp() {}

  moveDown() {}

  start() {}

  restart() {}
}
