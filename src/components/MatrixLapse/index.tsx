import { useState } from 'react';

import Range from '../Controls/Range';
import Matrix from '../Matrix';
import { Input, InputMatrix, MatrixSequence, Settings, TMatrix } from '../types';
import SettingsForm from '../Controls/Settings';

type Props = {
  input: Input;
};

const generateEnhancedMatrix = (currentStep: InputMatrix, prevStep: InputMatrix, isZeroBased: boolean): TMatrix => {
  return currentStep.map((row, rowIdx) =>
    row.map((cell, colIdx) => {
      const prevStepCell = prevStep[rowIdx][colIdx];

      return {
        value: cell,
        row: isZeroBased ? rowIdx : rowIdx + 1,
        col: isZeroBased ? colIdx : colIdx + 1,
        isChanged: cell !== prevStepCell,
      };
    }),
  );
};

const MatrixLapse = ({ input }: Props): JSX.Element => {
  const [seqStep, setSeqStep] = useState(0);
  const [settings, setSettings] = useState<Settings>({ isZeroBased: true });

  const seq: MatrixSequence = input.map((m) => m.split('\n').map((row) => row.split('')));
  const range = {
    min: 0,
    max: seq.length - 1,
  };

  const enhancedMatrix = generateEnhancedMatrix(
    seq[seqStep],
    seqStep !== 0 ? seq[seqStep - 1] : seq[seqStep],
    settings.isZeroBased,
  );

  return (
    <div>
      <SettingsForm settings={settings} onChange={setSettings} />
      <Range
        value={seqStep}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeqStep(parseInt(e.target.value) || 0)}
        min={range.min}
        max={range.max}
      />
      <Matrix matrix={enhancedMatrix} settings={settings} />
    </div>
  );
};

export default MatrixLapse;
