import { Matrix } from '../types';
import Row from './Row';

type Props = {
  matrix: Matrix;
};

const Matrix = ({ matrix }: Props): JSX.Element => {
  return (
    <div className="join join-vertical">
      {matrix.map((row, idx) => (
        <Row key={idx} row={row} />
      ))}
    </div>
  );
};

export default Matrix;
