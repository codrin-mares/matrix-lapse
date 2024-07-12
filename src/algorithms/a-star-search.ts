import util from 'util';
import { EIGHT_DIRECTIONS, Position, getValueAtPos, isInBoundaries, isSamePos, move } from './helpers';

class Cell {
  parent: Position = {
    row: 0,
    col: 0,
  };
  f: number = 0;
  g: number = 0;
  h: number = 0;

  constructor({ parent, f, g, h }: { parent: Position; f: number; g: number; h: number }) {
    this.parent = parent;
    this.f = f;
    this.g = g;
    this.h = h;
  }
}

const isAllowed = (matrix: number[][], next: Position): boolean => getValueAtPos(matrix, next) === 1;

const isValidMove = (matrix: number[][], visited: boolean[][], next: Position) => {
  return !visited[next.row][next.col] && isAllowed(matrix, next);
};

const isDestination = (next: Position, end: Position) => isSamePos(next, end);

const computeHValue = (next: Position, end: Position) => {
  const rowDiff = next.row - end.row;
  const colDiff = next.col - end.col;

  return Math.sqrt(rowDiff * rowDiff + colDiff * colDiff);
};

const tracePath = (cellDetails: Cell[][], end: Position) => {
  console.log('The Path is ');

  const path = [];
  let currentNode = end;
  let parent = cellDetails[currentNode.row][currentNode.col].parent;

  // console.log(util.inspect(cellDetails, { showHidden: false, depth: null, colors: true }));

  while (!(parent.row === currentNode.row && parent.col === currentNode.col)) {
    path.push(currentNode);
    currentNode = parent;
    parent = cellDetails[currentNode.row][currentNode.col].parent;
  }

  path.push(currentNode);

  while (path.length) {
    const p = path.shift() as Position;

    console.log(`-> (${p.row}, ${p.col})`);
  }

  return;
};

const aStarSearch = (matrix: number[][], start: Position, end: Position) => {
  if (!isInBoundaries(matrix, start)) {
    console.log('Source is invalid\n');
    return;
  }

  if (!isInBoundaries(matrix, end)) {
    console.log('Destination is invalid\n');
    return;
  }

  if (!isAllowed(matrix, start) || !isAllowed(matrix, end)) {
    console.log('MATRIX', matrix);
    console.log('START', start, getValueAtPos(matrix, start));
    console.log('END', end, getValueAtPos(matrix, end));
    console.log('Source or the destination is blocked\n');
    return;
  }

  if (isDestination(start, end)) {
    console.log('We are already at the destination\n');
    return;
  }

  const closedList: boolean[][] = matrix.map((row) => row.map(() => false));
  const cellDetails: Cell[][] = matrix.map((row) =>
    row.map(
      () =>
        new Cell({
          parent: {
            row: -1,
            col: -1,
          },
          f: Number.MAX_SAFE_INTEGER,
          g: Number.MAX_SAFE_INTEGER,
          h: Number.MAX_SAFE_INTEGER,
        }),
    ),
  );

  cellDetails[start.row][start.col] = new Cell({
    parent: {
      row: start.row,
      col: start.col,
    },
    f: 0,
    g: 0,
    h: 0,
  });

  const openList: Map<number, Position> = new Map();

  openList.set(0, start);

  let foundDest = false;

  let gNew, hNew, fNew;

  console.log('OPEN LIST', openList);

  while (openList.size) {
    console.log('OPEN LIST', openList);
    const [key, current] = openList.entries().next().value as [number, Position];

    openList.delete(key);

    closedList[current.row][current.col] = true;

    for (const direction of Object.values(EIGHT_DIRECTIONS)) {
      const next = move(current, direction);

      if (!isInBoundaries(matrix, next)) {
        continue;
      }

      if (isDestination(next, end)) {
        cellDetails[next.row][next.col].parent = current;
        console.log(`The destination cell is found ${next}\n`);
        tracePath(cellDetails, end);
        foundDest = true;

        return;
      } else if (isValidMove(matrix, closedList, next)) {
        const currentCell = cellDetails[current.row][current.col];

        gNew = currentCell.g + 1;
        hNew = computeHValue(next, end);
        fNew = gNew + hNew;

        if (cellDetails[next.row][next.col].f === Number.MAX_SAFE_INTEGER || cellDetails[next.row][next.col].f > fNew) {
          openList.set(fNew, next);

          cellDetails[next.row][next.col].f = fNew;
          cellDetails[next.row][next.col].g = gNew;
          cellDetails[next.row][next.col].h = hNew;
          cellDetails[next.row][next.col].parent = current;
        }
      }
    }
  }

  if (!foundDest) {
    console.log('Failed to find the Destination Cell\n');
  }

  return;
};

const matrix = [
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1, 0, 0, 1],
];

const start = {
  row: 8,
  col: 0,
};
const end = {
  row: 0,
  col: 0,
};

aStarSearch(matrix, start, end);
