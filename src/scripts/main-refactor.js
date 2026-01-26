'use strict';
import { Game } from './game2048.js';
import { isArrowButton } from './utils.js';
import { startBtn } from './utils-html.js';
import { applyCollorChip } from './utils-html.js';
import { message } from './utils-html.js';

const game = new Game();
game.getState() || game.restart();

const moveMap = {
  ArrowUp: () => game.moveUp(),
  ArrowDown: () => game.moveDown(),
  ArrowLeft: () => game.moveLeft(),
  ArrowRight: () => game.moveRight(),
};

document.addEventListener('keydown', (ev) => {
  const direction = ev.key; // direction arrow.

  if (!isArrowButton(direction)) {
    return;
  }

  if (!moveMap[direction]()) {
    return;
  }

  game.resetMergeFlags();
  game.createChip(); // OBJ Chip
  applyCollorChip(game.arrChip); //? for collor Chip
  game.renderHtmlChip();
  game.saveState();

  if (game.score >= 512) {
    message();
  }
});

startBtn.addEventListener('click', () => {
  game.restart();
  message();
});

//! Ход возможен, если после хода изменена хотя бы одна ячейка
//? Вероятность появления числа 4 составляет 10%
//? Нужно сделать изменение Цвета при слияние фишек
//? Если в любой ячейке отображается значение 2048, должно отображаться сообщение о победе.
// Обычная заметка (дополнительная)
//TODO Разобрать все методы Изменить метод getState !?
//TODO Переделать под анимацию!
//? - Оператор a ||= b 👉 Логическое присваивание OR Логика:
/* если a truthy → ничего не происходит
если a falsy → в a запишется b
Важно:
b НЕ выполнится, если a === true (короткое замыкание)
 */
//? Метод some()
/*
Array.prototype.some()
👉 возвращает true, если ХОТЯ БЫ ОДИН элемент дал true
arr.some(item => item > 5);
остановится сразу, как найдёт true
если все false → вернёт false */
//? Метод every()
/*
Array.prototype.every()
👉 возвращает true, если ВСЕ элементы дали true
arr.every(item => item > 0);
остановится на первом false
если массив пуст → true (важно!)
*/
