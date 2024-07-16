type FourDirections = {
  RIGHT: {
    row: 0;
    col: 1;
  };
  DOWN: {
    row: 1;
    col: 0;
  };
  LEFT: {
    row: 0;
    col: -1;
  };
  UP: {
    row: -1;
    col: 0;
  };
};

type EightDirections = FourDirections & {
  DOWN_RIGHT: {
    row: 1;
    col: 1;
  };
  TOP_RIGHT: {
    row: -1;
    col: 1;
  };
  DOWN_LEFT: {
    row: 1;
    col: -1;
  };
  TOP_LEFT: {
    row: -1;
    col: -1;
  };
};

type ValueOf<T> = T[keyof T];
export type CrossDirection = ValueOf<FourDirections>;
export type StarDirection = ValueOf<EightDirections>;

export type Direction = CrossDirection | StarDirection;

export type Position = {
  row: number;
  col: number;
};

export const FOUR_DIRECTIONS = {
  RIGHT: {
    row: 0,
    col: 1,
  },
  DOWN: {
    row: 1,
    col: 0,
  },
  LEFT: {
    row: 0,
    col: -1,
  },
  UP: {
    row: -1,
    col: 0,
  },
} satisfies FourDirections;

export const EIGHT_DIRECTIONS = {
  RIGHT: {
    row: 0,
    col: 1,
  },
  DOWN: {
    row: 1,
    col: 0,
  },
  LEFT: {
    row: 0,
    col: -1,
  },
  UP: {
    row: -1,
    col: 0,
  },
  DOWN_RIGHT: {
    row: 1,
    col: 1,
  },
  TOP_RIGHT: {
    row: -1,
    col: 1,
  },
  DOWN_LEFT: {
    row: 1,
    col: -1,
  },
  TOP_LEFT: {
    row: -1,
    col: -1,
  },
} satisfies EightDirections;

export const move = (pos: Position, direction: Direction): Position => ({
  row: pos.row + direction.row,
  col: pos.col + direction.col,
});

export const isSamePos = (p1: Position, p2: Position): boolean => p1.row === p2.row && p1.col === p2.col;

export const isInBoundaries = <T>(matrix: T[][], current: Position): boolean => {
  const maxRows = matrix.length;
  const maxCols = matrix[0].length;

  return 0 <= current.row && current.row < maxRows && 0 <= current.col && current.col < maxCols;
};

export const isVisited = (visited: boolean[][], current: Position) => {
  return visited[current.row][current.col];
};

export const getValueAtPos = <T>(matrix: T[][], position: Position): T => matrix[position.row][position.col];
