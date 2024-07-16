import { FOUR_DIRECTIONS, Position, isSamePos, move } from './helpers';

const isInBoundaries = (matrix: number[][], current: Position): boolean => {
  const maxRows = matrix.length;
  const maxCols = matrix[0].length;

  return 0 <= current.row && current.row < maxRows && 0 <= current.col && current.col < maxCols;
};

const isAllowed = (matrix: number[][], current: Position): boolean => {
  console.log('MATRIX', matrix);
  console.log('CURRENT', current);
  return matrix[current.row][current.col] !== 1;
};

const isValidMode = (matrix: number[][], current: Position): boolean => {
  return isInBoundaries(matrix, current) && isAllowed(matrix, current);
};

const searchMazeHelper = (matrix: number[][], start: Position, end: Position, path: Position[]) => {
  if (isSamePos(start, end)) {
    return true;
  }

  for (const direction of Object.values(FOUR_DIRECTIONS)) {
    const next = move(start, direction);

    if (isValidMode(matrix, next)) {
      matrix[next.row][next.col] = 1;

      if (searchMazeHelper(matrix, next, end, path)) {
        path.push(next);
        return true;
      }
    }
  }

  return false;
};

const hasPath = (matrix: number[][], start: Position, end: Position) => {
  matrix[start.row][start.col] = 1;

  const path: Position[] = [];

  const result = searchMazeHelper(matrix, start, end, path);
  path.push(start);
  path.reverse();

  console.log('IS THERE A PATH', result);
  console.log('PATH', path);
};

const maze = [
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0],
];

hasPath(maze, { row: 0, col: 4 }, { row: 3, col: 0 });

// console.log('RESULT', result);
