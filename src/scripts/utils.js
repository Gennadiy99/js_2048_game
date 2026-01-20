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

// variable for board (html)
export const board = document.querySelector('.game-field');
export let scoreHtml = document.querySelector('.game-score');
console.log(`Property teg span: `, scoreHtml);

//! Как создать в классе Game методы
