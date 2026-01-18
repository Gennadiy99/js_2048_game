import { Tile } from './utils.js';
import { createCellsField } from './utils.js';
import { random } from './utils.js';
// import { getCell } from './utils.js';
import { sortChip } from './utils.js';
// import { moveChips } from './utils.js';
// import { moveOneChip } from './utils.js';
import { board } from './utils.js';
import { createHtmlChip } from './utils.js';
import { getDirectionVector1} from './utils.js';

export class Game {
  constructor() {
    this.cellArr = createCellsField(); // array all cells field
    this.arrChip = []; // Array Obj Chip
  }

  // get random empty cell
  #getRandomEmptyCell() {
    const emptyCells = [];

    for (const cell of this.cellArr) {
      if (cell.isEmpty) {
        emptyCells.push(cell);
      }
    }

    if (emptyCells.length === 0) return null;

    return random(emptyCells);
  }

  // Creare Obj - chip
  createChip() {
    const cell = this.#getRandomEmptyCell();

    if (!cell) {
      return null;
    }

    const chip = new Tile(cell);

    this.arrChip.push(chip);
  }

  // get cell to move
  #getCell(row, col) {
    return this.cellArr.find(
      (cell) => (cell.row === row && cell.col === col) || null,
    );
  }

  // move + merging + move
  #move(direction) {
    this.#moveChips(direction, this.arrChip);
  }

  #moveChips(direction, arrChip) {
    sortChip(direction, arrChip);

    for (const chip of arrChip) {
      this.#moveOneChip(chip, direction);
    }
    for (const chip of arrChip) {
      this.#margeChips(chip, direction);
    }
    for (const chip of arrChip) {
      this.#moveOneChip(chip, direction);
    }
  }

  // move of Chip
  #moveOneChip(chip, direction) {
    const vector = getDirectionVector1(direction);

    if (!vector) return;

    let currentCell = chip.cell;

    while (true) {
      const nextRow = currentCell.row + vector.row;
      const nextCol = currentCell.col + vector.col;

      const nextCell = this.#getCell(nextRow, nextCol);

      if (!nextCell) break;
      if (!nextCell.isEmpty) break;

      currentCell.tile = null;

      chip.cell = nextCell;
      nextCell.tile = chip;

      currentCell = nextCell;
    }
  }
  // merging of chips
  #margeChips(chip, direction) {
    const vector = getDirectionVector1(direction);

    if (!vector) return;

    let currentCell = chip.cell;
    const nextRow = currentCell.row + vector.row;
    const nextCol = currentCell.col + vector.col;
    const nextCell = this.#getCell(nextRow, nextCol);

    if (!nextCell) return;

    if (!nextCell.isEmpty) {
      if (
        nextCell.tile.value === chip.value &&
        !nextCell.tile.marg &&
        !chip.marg
      ) {
        const tileToRemove = nextCell.tile;

        chip.value *= 2;
        currentCell.tile = null;
        chip.cell = nextCell;
        nextCell.tile = chip;
        chip.marg = true;

        const index = this.arrChip.indexOf(tileToRemove);
        if (index !== -1) {
          this.arrChip.splice(index, 1);
        }
      }
      return;
    }
  }

  moveLeft() {
    this.#move('ArrowLeft');
  }

  moveRight() {
    this.#move('ArrowRight');
  }

  moveUp() {
    this.#move('ArrowUp');
  }

  moveDown() {
    this.#move('ArrowDown');
  }

  getState() {}

  getScore() {}

  getStatus() {}

  start() {}

  restart() {}
}
