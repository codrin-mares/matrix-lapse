import { TMatrix, Settings } from '../types';
import PositionAxis from './PositionAxis';
import Row from './Row';

type Props = {
  matrix: TMatrix;
  settings: Settings;
};

const Matrix = ({ matrix, settings }: Props): JSX.Element => {
  const { isZeroBased } = settings;

  return (
    <div className="join join-horizontal">
      <PositionAxis len={matrix.length} type="vertical" isZeroBased={isZeroBased} />
      <div className="join join-vertical">
        <PositionAxis len={matrix.length} type="horizontal" isZeroBased={isZeroBased} />
        {matrix.map((row, idx) => (
          <Row key={idx} row={row} />
        ))}
        <PositionAxis len={matrix.length} type="horizontal" isZeroBased={isZeroBased} />
      </div>
      <PositionAxis len={matrix.length} type="vertical" isZeroBased={isZeroBased} />
    </div>
  );
};

export default Matrix;
