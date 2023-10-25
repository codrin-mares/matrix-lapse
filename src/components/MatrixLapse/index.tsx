import { useState } from 'react';

import Range from '../Controls/Range';
import Matrix from '../Matrix';
import { Input, MatrixSequence } from '../types';

type Props = {
  input: Input;
};

const MatrixLapse = ({ input }: Props): JSX.Element => {
  const [seqStep, setSeqStep] = useState(0);

  const seq: MatrixSequence = input.map((m) => m.split('\n').map((row) => row.split('')));
  const range = {
    min: 0,
    max: seq.length - 1,
  };

  return (
    <div>
      <Range
        value={seqStep}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeqStep(parseInt(e.target.value) || 0)}
        min={range.min}
        max={range.max}
      />
      <Matrix matrix={seq[seqStep]} />
    </div>
  );
};

export default MatrixLapse;
