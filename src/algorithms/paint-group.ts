import { FOUR_DIRECTIONS, Position, move } from './helpers';

const isInBoundaries = (matrix: number[][], current: Position): boolean => {
  const maxRows = matrix.length;
  const maxCols = matrix[0].length;

  return 0 <= current.row && current.row < maxRows && 0 <= current.col && current.col < maxCols;
};

const isVisited = (visited: boolean[][], current: Position) => {
  return visited[current.row][current.col];
};

const isAllowed = (matrix: number[][], current: Position): boolean => {
  return matrix[current.row][current.col] === 1;
};

const isValidMove = (matrix: number[][], visited: boolean[][], current: Position): boolean => {
  return isInBoundaries(matrix, current) && !isVisited(visited, current) && isAllowed(matrix, current);
};

const paintGroup = (matrix: number[][], start: Position) => {
  const visited = matrix.map((row) => row.map(() => false));
  const queue = [start];
  const group = [];
  visited[start.row][start.col] = true;

  while (queue.length) {
    console.log('QUEUE', queue);
    const p = queue.shift() as Position;

    group.push(p);

    for (const direction of Object.values(FOUR_DIRECTIONS)) {
      const next = move(p, direction);

      if (isValidMove(matrix, visited, next)) {
        visited[next.row][next.col] = true;
        queue.push(next);
      }
    }
  }

  console.log('GROUP', group);
};

const matrix = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1],
];

paintGroup(matrix, { row: 1, col: 1 });
