//  checking the key value
export function isArrowButton(direction) {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(
    direction,
  );
}

// object vector  + move
const vectors = {
  ArrowUp: { row: -1, col: 0 },
  ArrowDown: { row: 1, col: 0 },
  ArrowLeft: { row: 0, col: -1 },
  ArrowRight: { row: 0, col: 1 },
};

// move object tile
export const getDirectionVector1 = (direction) => vectors[direction] || null;

// array of data to sort
const arrSortCondition = {
  ArrowUp: (a, b) => a.cell.col - b.cell.col || a.cell.row - b.cell.row,
  ArrowDown: (a, b) => a.cell.col - b.cell.col || b.cell.row - a.cell.row,
  ArrowLeft: (a, b) => a.cell.row - b.cell.row || a.cell.col - b.cell.col,
  ArrowRight: (a, b) => a.cell.row - b.cell.row || b.cell.col - a.cell.col,
};

// sorting tiles by direction
export function sortChip(direction, arrChip) {
  const condition = arrSortCondition[direction];

  if (!condition) return null;
  arrChip.sort(condition);
}
//! Новые привязки к mein-refactor.js
// template Obj Chip
export class Tile {
  constructor(cell) {
    this.value = 2;
    this.cell = cell;
    this.marg = false;
    cell.tile = this;
  }
}

// creation cell for field  (Obj)
// export class Cell {
//   constructor(row,col){
//     this.row = row;
//     this.col = col;
//     this.tile = null;
//   }

//   isEmpty() {
//     return this.tile === null;
//   };
// };

// creation of all field cells (Obj)- *
export function createCellsField() {
  const cells = [];

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      cells.push({
        row: row,
        col: col,
        tile: null,
        get isEmpty() {
          return this.tile === null;
        },
      });
    }
  }
  return cells;
}

// random empty cell
export function random(emptyCells) {
  const index = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[index];
}

//? get cell  - moved to game2048.js
// export function getCell(row, col) {
//   return cellArr.find(
//     (cell) => (cell.row === row && cell.col === col) || null,
//   );
// }

//? move + merging + move перенес в класс Game как метод
// export function moveChips(direction, arrChip){
//    sortChip(direction, arrChip);

//    for(const chip of arrChip ){
//     moveOneChip(chip, direction);
//   }
//    for(const chip of arrChip ){
//     margeChips(chip, direction);
//   }
//    for(const chip of arrChip ){
//     moveOneChip(chip, direction);
//   }
// }

//? move of Chip - move to game2048

// export function moveOneChip(chip, direction) {
//   const vector = getDirectionVector1(direction);

//   if (!vector) return;

//   let currentCell = chip.cell;

//   while (true) {
//     const nextRow = currentCell.row + vector.row;
//     const nextCol = currentCell.col + vector.col;

//     const nextCell = getCell(nextRow, nextCol);

//     if (!nextCell) break;
//     if (!nextCell.isEmpty) break;

//     currentCell.tile = null;

//     chip.cell = nextCell;
//     nextCell.tile = chip;

//     currentCell = nextCell;
//   }
// }

// variable for board (html)
export const board = document.querySelector('.game-field');

//? create HTML Chip. - moved to game2048.js
// export function createHtmlChip(Chip) {
//   if (!Chip) {
//     return;
//   }

//   const div = document.createElement('div');

//   div.classList.add('field-cell', 'field-cell--2', 'chipHtml');
//   div.style.position = 'absolute';
//   div.innerText = Chip.value;

//   const boardRect = board.getBoundingClientRect();
//   const targCell = board.rows[Chip.cell.row].cells[Chip.cell.col];
//   const cellRect = targCell.getBoundingClientRect();

//   div.style.left = cellRect.left - boardRect.left + 'px';
//   div.style.top = cellRect.top - boardRect.top + 'px';

//   board.append(div);
// }
//? clear field - moved to game2048.js into method
// function renderHtmlChip(arrChip) {
//   document.querySelectorAll('.chipHtml').forEach(ch=> ch.remove());

//   for(const chip of arrChip){
//     createHtmlChip(chip);
//   }
// }

//! Как создать в классе Game методы
