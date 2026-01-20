'use strict';
import { Game } from './game2048.js';
import { isArrowButton } from './utils.js';
// import { scoupHtml } from './utils.js';

const game = new Game();

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

  moveMap[direction]();

  game.resetMergeFlags();
  game.createChip(); // OBJ Chip
  game.renderHtmlChip();
});

// scoupHtml.addEventListener('click', () => game.restart());

//  ! Важно: Этот блок веременный
//  ? Нужно обсудить реализацию
// Обычная заметка (дополнительная)
// TODO ВАЖНЫЙ коментарий- Добавить Логирование.
