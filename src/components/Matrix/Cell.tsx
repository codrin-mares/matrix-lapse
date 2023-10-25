import { Cell } from '../types';

type Props = {
  value: Cell;
};

const Cell = ({ value }: Props): JSX.Element => {
  return (
    <div className="join-item h-8 w-8 flex items-center justify-center">
      <span>{value}</span>
    </div>
  );
};

export default Cell;
