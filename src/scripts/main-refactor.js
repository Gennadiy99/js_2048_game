'use strict';
import { Game } from './game2048.js';
import { isArrowButton } from './utils.js';
import {
  startBtn,
  applyCollorChip,
  winMessage,
  loseMessage,
  deleteMessagesAll,
  startMessage,
} from './utils-html.js';

const game = new Game();
// game.getState();

if (game.getState()) {
  deleteMessagesAll();
  startBtn.textContent = 'Restart';
  startBtn.classList.replace('start-mode', 'restart-mode');
}

const moveMap = {
  ArrowUp: () => game.moveUp(),
  ArrowDown: () => game.moveDown(),
  ArrowLeft: () => game.moveLeft(),
  ArrowRight: () => game.moveRight(),
};

document.addEventListener('keydown', (ev) => {
  if (game.isWin) {
    return;
  }
  const direction = ev.key; // direction arrow.

  if (!isArrowButton(direction)) {
    return;
  } // checking direction

  if (!moveMap[direction]()) {
    return;
  } // get moving

  game.resetMergeFlags();
  game.createChip();
  applyCollorChip(game.arrChip);
  game.renderHtmlChip();
  game.saveState();

  if (game.score >= 2048) {
    winMessage();
    game.isWin = true;
  }
  if (game.getFilledCells() && !game.canMove()) {
    loseMessage();
  }
});

// click start button
startBtn.addEventListener('click', () => {
  if (startBtn.classList.contains('start-mode')) {
    deleteMessagesAll();
    game.start();

    startBtn.textContent = 'Restart';
    startBtn.classList.replace('start-mode', 'restart-mode');
  } else if (startBtn.classList.contains('restart-mode')) {
    game.restart();
    deleteMessagesAll();
    startMessage();

    startBtn.textContent = 'Start';
    startBtn.classList.replace('restart-mode', 'start-mode');
  }
});

//! Ход возможен.
//? Если.
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
