export type Input = string[];

export type TCellEnhanced = {
  value: string;
  row: number;
  col: number;
};
export type TCell = string;

export type TRow = TCell[];
export type TMatrix = TRow[];
export type MatrixSequence = TMatrix[];

export type Settings = {
  isZeroBased: boolean;
};
