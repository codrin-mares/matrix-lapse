export type TCellEnhanced = {
  value: string;
  row: number;
  col: number;
  isChanged: boolean;
};
export type TRow = TCellEnhanced[];
export type TMatrix = TRow[];

export type Input = string[];
export type InputMatrix = string[][];
export type MatrixSequence = InputMatrix[];

export type Settings = {
  isZeroBased: boolean;
  iterationInterval: number;
};

export type HoverPosition = {
  row: number | null;
  col: number | null;
};
