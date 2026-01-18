import { Game } from './game2048.js';
import { isArrowButton } from './utils.js';

const game = new Game();
game.createChip();
console.log(game.cellArr, game.arrChip);

document.addEventListener('keydown', (ev) => {
  const direction = ev.key; // direction arrow.

  if (!isArrowButton(direction)) {
    return;
  }

  game.moveLeft(direction);

  game.createChip(); // OBJ Chip
});
