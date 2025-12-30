//  checking the key value
export function isArrowButton(direction){
  return['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(direction)
}

// object vector  + move
const vectors = {
  'ArrowUp': {row: -1, col: 0},
  'ArrowDown': {row: 1, col: 0},
  'ArrowLeft': {row: 0, col: -1},
  'ArrowRight': {row: 0, col: 1},
}

// move object tile
export const getDirectionVector1 = (direction) => vectors[direction] || null;


// array of data to sort
const arrSortCondition = {
  'ArrowUp':(a, b) => a.cell.col - b.cell.col || a.cell.row - b.cell.row,
  'ArrowDown':(a, b) => a.cell.col - b.cell.col || b.cell.row - a.cell.row,
  'ArrowLeft':(a, b) => a.cell.row - b.cell.row || a.cell.col - b.cell.col,
  'ArrowRight':(a, b) => a.cell.row - b.cell.row || b.cell.col - a.cell.col,
}

// sorting tiles by direction
export function sortChip(direction, arrChip) {
  const condition = arrSortCondition[direction];

  if(!condition) return null;
    arrChip.sort(condition);
}
