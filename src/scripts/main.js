'use strict';

// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();

import { isArrowButton } from './utils.js';
import { getDirectionVector1 } from './utils.js';
import { sortChip } from './utils.js';

// array all cells field
const cellArr = [];

// creation of all field cells (Obj)
for (let row = 0; row < 4; row++) {
  for (let col = 0; col < 4; col++) {
    const cell = {
      row: row,
      col: col,
      tile: null,
      get isEmpty() {
        return this.tile === null;
      },
    };

    cellArr.push(cell);
  }
}

// find empty cell field
function getCellEmpty() {
  return cellArr.find((elem) => elem.isEmpty) || null;
}
// template Obj Chip
class Tile {
  constructor(cell) {
    this.value = 2;
    this.cell = cell;
    this.marg = false;
    cell.tile = this;
  }
}

// Array Obj Chip
const arrChip = [];

// Creare Obj - chip
function createChip() {
  const cell = getCellEmpty();

  if (!cell) {
    return null;
  }

  const chip = new Tile(cell);

  arrChip.push(chip);
}

// variable for board (html)
const board = document.querySelector('.game-field');

// create HTML Chip.
function createElem(Chip) {
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

function renderHtmlChip(arrChip) {
  document.querySelectorAll('.chipHtml').forEach(ch=> ch.remove());

  for(const chip of arrChip){
    createElem(chip);
  }
}

// get cell to move
function getCell(row, col){
  return cellArr.find((cell) => cell.row === row && cell.col === col || null);
}

// move of Chip

function moveOneChip(chip, direction){
  const vector = getDirectionVector1(direction);

  if(!vector) return;

  let currentCell = chip.cell;

  while(true){
    const nextRow = currentCell.row + vector.row;
    const nextCol = currentCell.col + vector.col;

    const nextCell =  getCell(nextRow, nextCol);

    if(!nextCell) break;
    if(!nextCell.isEmpty) break;

    currentCell.tile = null;

    chip.cell = nextCell;
    nextCell.tile = chip;

    currentCell = nextCell;
  }
}

// merging of chips
function margeChips(chip, direction){
  const vector = getDirectionVector1(direction);

  if(!vector) return;

  let currentCell = chip.cell;
  const nextRow = currentCell.row + vector.row;
  const nextCol = currentCell.col + vector.col;
  const nextCell =  getCell(nextRow, nextCol);

  if(!nextCell) return;

  if(!nextCell.isEmpty){

    if(nextCell.tile.value === chip.value && !nextCell.tile.marg
      && !chip.marg){
        const tileToRemove = nextCell.tile;

        chip.value *=2;
        currentCell.tile = null;
        chip.cell = nextCell;
        nextCell.tile = chip;
        chip.marg = true;

        const index = arrChip.indexOf(tileToRemove);
        if (index !== -1) {
          arrChip.splice(index, 1);
        }
      }
    return;
  }
}
// move + merging + move
function moveChips(direction, arrChip){
   sortChip(direction, arrChip);

   for(const chip of arrChip ){
    moveOneChip(chip, direction);
  }
   for(const chip of arrChip ){
    margeChips(chip, direction);
  }
   for(const chip of arrChip ){
    moveOneChip(chip, direction);
  }
}

// Reset flags merge
function resetMergeFlags(){
  arrChip.forEach(ch => ch.marg = false);
};

// launch functions by pressing keys
document.addEventListener('keydown', (ev) => {
  const direction = ev.key; // direction arrow.

  if(!isArrowButton(direction)){return};

  moveChips(direction, arrChip);
  resetMergeFlags();// Reset flags merge
  createChip(); // OBJ Chip
  renderHtmlChip(arrChip); // Deleting and creating all chips
});

//  ! Важно: Этот блок веременный
//  ? Нужно обсудить реализацию
// Обычная заметка (дополнительная)
// TODO ВАЖНЫЙ коментарий- Добавить Логирование.

