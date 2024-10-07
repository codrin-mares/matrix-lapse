/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { HoverPosition, TCellEnhanced } from '../types';

type Props = TCellEnhanced & {
  hover: boolean;
  setHoverPosition: React.Dispatch<React.SetStateAction<HoverPosition>>;
};

const Cell = ({ value, row, col, isChanged, hover, setHoverPosition }: Props): JSX.Element => {
  return (
    <div
      className={`cursor-pointer join-item border-none h-6 w-6 flex items-center justify-center ${
        isChanged ? 'bg-primary' : ''
      } ${hover ? 'bg-info font-bold' : ''}`}
      onMouseOver={() => setHoverPosition({ row, col })}
      onMouseOut={() => setHoverPosition({ row: null, col: null })}
    >
      <span>{value}</span>
    </div>
  );
};

export default Cell;
