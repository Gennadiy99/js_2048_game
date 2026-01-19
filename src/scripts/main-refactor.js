import { Game } from './game2048.js';
import { isArrowButton } from './utils.js';

const game = new Game();
// game.createChip();
// console.log(game.cellArr, game.arrChip);

document.addEventListener('keydown', (ev) => {
  const direction = ev.key; // direction arrow.

  if (!isArrowButton(direction)) {
    return;
  }

  if (direction === 'ArrowUp') {
    game.moveUp(direction);
  }
  if (direction === 'ArrowDown') {
    game.moveDown(direction);
  }
  if (direction === 'ArrowLeft') {
    game.moveLeft(direction);
  }
  if (direction === 'ArrowRight') {
    game.moveRight(direction);
  }

  game.resetMergeFlags();
  game.createChip(); // OBJ Chip
  game.renderHtmlChip();
});
