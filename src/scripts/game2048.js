import {
  Tile,
  createCellsField,
  random,
  sortChip,
  getDirectionVector1,
} from './utils.js';

import { board, scoreHtml } from './utils-html.js';

export class Game {
  constructor() {
    this.cellArr = createCellsField(); // array all cells field
    this.arrChip = []; // Array Obj Chip
    this.score = 0;
  }

  // get random empty cell
  #getRandomEmptyCell() {
    const emptyCells = this.cellArr.filter((cell) => cell.isEmpty);

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
        this.#getScore(chip.value);

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

  saveState() {
    const state = {
      score: this.score,
      tiles: this.arrChip.map((chip) => ({
        row: chip.cell.row,
        col: chip.cell.col,
        value: chip.value,
      })),
    };
    localStorage.setItem('gameState', JSON.stringify(state));
  }

  getState() {
    const gameData = JSON.parse(localStorage.getItem('gameState'));
    if (!gameData) {
      return false;
    }
    this.score = gameData.score;

    for (const t of gameData.tiles) {
      const cell = this.#getCell(t.row, t.col);
      const chip = new Tile(cell);
      chip.value = t.value;
      this.arrChip.push(chip);
    }
    this.renderHtmlChip();
    return true;
  }

  #getScore(value) {
    this.score += value;
    scoreHtml.textContent = this.score;
  }

  getStatus() {}

  start() {}

  restart() {
    this.arrChip = [];
    this.cellArr.forEach((cell) => (cell.tile = null));
    this.score = 0;
    scoreHtml.textContent = 0;
    localStorage.removeItem('gameState');

    this.createChip();
    this.createChip();
    this.renderHtmlChip();
  }

  resetMergeFlags() {
    this.arrChip.forEach((ch) => (ch.marg = false));
  }

  // create HTML Chip.
  #createHtmlChip(Chip) {
    if (!Chip) {
      return;
    }

    const div = document.createElement('div');

    div.classList.add('field-cell', 'field-cell--2', 'chipHtml');
    div.style.position = 'absolute';
    div.innerText = Chip.value;

    const boardRect = board.getBoundingClientRect();
    const targCell = board.rows[Chip.cell.row].cells[Chip.cell.col];
    const cellRect = targCell.getBoundingClientRect();

    div.style.left = cellRect.left - boardRect.left + 'px';
    div.style.top = cellRect.top - boardRect.top + 'px';

    board.append(div);
  }

  renderHtmlChip() {
    document.querySelectorAll('.chipHtml').forEach((ch) => ch.remove());

    for (const chip of this.arrChip) {
      this.#createHtmlChip(chip);
    }
  }
}
