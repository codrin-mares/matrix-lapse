import { FOUR_DIRECTIONS, Position, getValueAtPos, isInBoundaries, isSamePos, isVisited, move } from './helpers';

const isAllowed = (matrix: number[][], next: Position): boolean => {
  return getValueAtPos(matrix, next) !== 1;
};

const isValidMove = (matrix: number[][], visited: boolean[][], next: Position) => {
  return isInBoundaries(matrix, next) && !isVisited(visited, next) && isAllowed(matrix, next);
};

const BFS = (matrix: number[][], p1: Position, p2: Position) => {
  const visited = matrix.map((row) => row.map(() => false));
  const prev: Map<string, string> = new Map();
  const queue = [p1];

  visited[p1.row][p1.col] = true;

  while (queue.length) {
    const current = queue.shift() as Position;

    if (isSamePos(current, p2)) {
      return {
        isPath: true,
        prev,
      };
    }

    for (const direction of Object.values(FOUR_DIRECTIONS)) {
      const next = move(current, direction);

      if (isValidMove(matrix, visited, next)) {
        visited[next.row][next.col] = true;
        prev.set(`${next.row}-${next.col}`, `${current.row}-${current.col}`);
        queue.push(next);
      }
    }
  }

  return {
    isPath: false,
    prev,
  };
};

const findShortestPath = (matrix: number[][], p1: Position, p2: Position) => {
  const { prev, isPath } = BFS(matrix, p1, p2);

  if (!isPath) {
    console.log('No path found', p1, p2);

    return;
  }

  const path = [];
  const p2Str = `${p2.row}-${p2.col}`;

  let current = p2Str;

  console.log('PREV', prev);

  while (current) {
    path.push(current);
    current = prev.get(current) || '';
  }

  path.reverse();

  console.log('Path found:', path);
};

const matrix = [
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0],
];

const result = findShortestPath(matrix, { row: 0, col: 0 }, { row: 2, col: 2 });

console.log('RESULT', result);
