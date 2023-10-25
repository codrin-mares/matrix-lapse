import { TRow } from '../types';
import Cell from './Cell';

type Props = {
  row: TRow;
};

const Row = ({ row }: Props): JSX.Element => {
  return (
    <div className="join join-horizontal">
      {row.map((cell, idx) => (
        <Cell key={idx} {...cell} />
      ))}
    </div>
  );
};

export default Row;
