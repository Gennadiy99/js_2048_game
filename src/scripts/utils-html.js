// variable for board (html)
export const board = document.querySelector('.game-field');
// variable for field Score
export let scoreHtml = document.querySelector('.game-score');
// variable for Btn Start
export const startBtn = document.querySelector('.start');

const collorMap = {
  2: 'field-cell--2',
  4: 'field-cell--4',
  8: 'field-cell--8',
  16: 'field-cell--16',
  32: 'field-cell--32',
  64: 'field-cell--64',
  128: 'field-cell--128',
  256: 'field-cell--256',
  512: 'field-cell--512',
  1024: 'field-cell--1024',
  2048: 'field-cell--2048',
};

export function applyCollorChip(arrChip) {
  arrChip.forEach((chip) => {
    chip.collor = collorMap[chip.value];
  });
}

const messageLose = document.querySelector('.message-lose');
const messageWin = document.querySelector('.message-win');
const messageStart = document.querySelector('.message-start');

let arrClassMessage = [messageLose, messageWin, messageStart];

export function message() {
  arrClassMessage.forEach((message) => message.classList.add('hidden'));
  // messageStart.forEach((message) => message.classList.toggle('hidden'));
  messageStart.classList.toggle('hidden');

}
