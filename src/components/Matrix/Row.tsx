import { TRow } from '../types';
import Cell from './Cell';

type Props = {
  row: TRow;
  rowIdx: number;
  isZeroBased: boolean;
};

const Row = ({ row, rowIdx, isZeroBased }: Props): JSX.Element => {
  return (
    <div className="join join-horizontal">
      {row.map((cell, idx) => (
        <Cell key={idx} value={cell} row={isZeroBased ? rowIdx : rowIdx + 1} col={isZeroBased ? idx : idx + 1} />
      ))}
    </div>
  );
};

export default Row;
