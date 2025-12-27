'use strict';

// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();

// Write your code here

//  массив всех клеток поля
const cellArr = [];

// создание всех Obj клеток Поля
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

// найти пустую клетку поля.
function getCellEmpty() {
  return cellArr.find((elem) => elem.isEmpty) || null;
}
// создание Obj Фишки
class Tile {
  constructor(cell) {
    this.value = 2;
    this.cell = cell;
    cell.tile = this;
  }
}

// массив Obj Фишек
const arrChip = [];

// создать фишку Obj - chip
function createChip() {
  const cell = getCellEmpty();

  if (!cell) {
    return null;
  }

  const chip = new Tile(cell);

  arrChip.push(chip);

  return chip;
}
// переменная для доски на html

const board = document.querySelector('.game-field');

// TODO функцию создания и вывода HTML Фишки.

function createElem(Chip) {
  if (!Chip) {
    return;
  }

  const div = document.createElement('div');

  div.classList.add('field-cell', 'field-cell--2');
  div.style.position = 'absolute';
  div.innerText = Chip.value;

  const boardRect = board.getBoundingClientRect();
  const targCell = board.rows[Chip.cell.row].cells[Chip.cell.col];
  const cellRect = targCell.getBoundingClientRect();

  div.style.left = cellRect.left - boardRect.left + 'px';
  div.style.top = cellRect.top - boardRect.top + 'px';

  board.append(div);
}

// функция хода фишек
// function moveTiles(direction) {}

// Функция сортировки Фишек по направлению хода.
function sortChip(direct) {
  switch (direct) {
    case 'ArrowUp':
      arrChip.sort(
        (a, b) => a.cell.col - b.cell.col || a.cell.row - b.cell.row,
      );
      break;
    case 'ArrowDown':
      arrChip.sort(
        (a, b) => a.cell.col - b.cell.col || b.cell.row - a.cell.row,
      );
      break;
    case 'ArrowLeft':
      arrChip.sort(
        (a, b) => a.cell.row - b.cell.row || a.cell.col - b.cell.col,
      );
      break;
    case 'ArrowRight':
      arrChip.sort(
        (a, b) => a.cell.row - b.cell.row || b.cell.col - a.cell.col,
      );
      break;
  }
}

// Нажатие клавиши вывод элем HTML на поле
document.addEventListener('keydown', (ev) => {
  const direction = ev.key; // Направление стрелки,Сортировки

  if (
    !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(direction)
  ) {
    return;
  }

  const chip = createChip(); // OBJ фишка

  createElem(chip); // HTML фишка
  sortChip(direction); // Сортировка фишек OBJ

  // console.log(arrChip);
});

//  ! Важно: Этот блок веременный
//  ? Нужно обсудить реализацию
// Обычная заметка (дополнительная)
// TODO ВАЖНЫЙ коментарий- Добавить Логирование.

// const targCell = table1.tBodies[0].rows[chipRow].cells[chipCol];
