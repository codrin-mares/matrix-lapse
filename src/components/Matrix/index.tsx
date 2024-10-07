import { useState } from 'react';
import { TMatrix, Settings, HoverPosition } from '../types';
import PositionAxis from './PositionAxis';
import Row from './Row';

type Props = {
  matrix: TMatrix;
  settings: Settings;
};

const Matrix = ({ matrix, settings }: Props): JSX.Element => {
  const { isZeroBased } = settings;
  const [hoverPosition, setHoverPosition] = useState<HoverPosition>({ row: null, col: null });

  return (
    <div className="justify-center join join-horizontal flex-1 rounded-none">
      <PositionAxis len={matrix.length} type="vertical" isZeroBased={isZeroBased} />
      <div className="join join-vertical">
        <PositionAxis len={matrix.length} type="horizontal" isZeroBased={isZeroBased} />
        {matrix.map((row, idx) => (
          <Row key={idx} row={row} setHoverPosition={setHoverPosition} hoverPosition={hoverPosition} />
        ))}
        <PositionAxis len={matrix.length} type="horizontal" isZeroBased={isZeroBased} />
      </div>
      <PositionAxis len={matrix.length} type="vertical" isZeroBased={isZeroBased} />
    </div>
  );
};

export default Matrix;
