import { HoverPosition, TRow } from '../types';
import Cell from './Cell';

type Props = {
  row: TRow;
  hoverPosition: HoverPosition;
  setHoverPosition: React.Dispatch<React.SetStateAction<HoverPosition>>;
};

const Row = ({ row, hoverPosition, setHoverPosition }: Props): JSX.Element => {
  return (
    <div className="join join-horizontal rounded-none">
      {row.map((cell, idx) => (
        <Cell
          key={idx}
          {...cell}
          hover={hoverPosition.row === cell.row || hoverPosition.col === cell.col}
          setHoverPosition={setHoverPosition}
        />
      ))}
    </div>
  );
};

export default Row;
