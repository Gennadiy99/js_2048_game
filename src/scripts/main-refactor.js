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

const dateState = game.getStateNew();

if (dateState) {
  game.applyState(dateState);
  game.renderHtmlChip();

  deleteMessagesAll();
  startBtn.textContent = 'Restart';
  startBtn.classList.replace('start-mode', 'restart-mode');
}

document.addEventListener('keydown', (ev) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  const direction = ev.key; // direction arrow.

  if (!isArrowButton(direction)) {
    return;
  } // checking direction

  if (!game.moveMap[direction]()) {
    return;
  } // get moving

  game.resetMergeFlags();
  game.createChip();
  applyCollorChip(game.arrChip);
  game.renderHtmlChip();
  game.updateStatus();
  game.saveState();

  if (game.getStatus() === 'win') {
    winMessage();
  }
  if (game.getStatus() === 'lose') {
    loseMessage();
  }
});

// click start button
startBtn.addEventListener('click', () => {
  if (startBtn.classList.contains('start-mode')) {
    game.start();
    deleteMessagesAll();

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

//! Что делать с методом getStatus ?
//TODO Переделать под анимацию!
//? Если.
// Обычная заметка (дополнительная)
//TODO
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
