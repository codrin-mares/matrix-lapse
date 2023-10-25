import { TCellEnhanced } from '../types';

type Props = TCellEnhanced;

const Cell = ({ value, row, col, isChanged }: Props): JSX.Element => {
  return (
    <div className="tooltip tooltip-secondary" data-tip={`${row}/${col}`}>
      <div
        className={`cursor-pointer join-item h-8 w-8 flex items-center justify-center hover:border hover:border-white ${
          isChanged ? 'bg-primary' : ''
        }`}
      >
        <span>{value}</span>
      </div>
    </div>
  );
};

export default Cell;
