import { useEffect, useRef, useState } from 'react';

type Props = {
  seqStep: number;
  setSeqStep: React.Dispatch<React.SetStateAction<number>>;
  rangeMax: number;
  iterationInterval: number;
};

const TimeControls = ({ seqStep, setSeqStep, rangeMax, iterationInterval }: Props): JSX.Element => {
  const [activeIntervalId, setActiveIntervalId] = useState<NodeJS.Timeout | null>(null);

  const seqStepRef = useRef<number>(seqStep);
  const activeIntervalIdRef = useRef<NodeJS.Timeout | null>(activeIntervalId);
  const iterationIntervalRef = useRef<number>(iterationInterval);

  useEffect(() => {
    seqStepRef.current = seqStep;
  }, [seqStep]);
  useEffect(() => {
    activeIntervalIdRef.current = activeIntervalId;
  }, [activeIntervalId]);
  useEffect(() => {
    iterationIntervalRef.current = iterationInterval;
  }, [iterationInterval]);

  useEffect(() => {
    if (seqStep === rangeMax && activeIntervalId) {
      stopPlaying();
    }
  }, [seqStep]);

  const startPlaying = () => {
    stopPlaying();

    if (seqStepRef.current === rangeMax) {
      restartPlaying();

      return;
    }

    const intervalId = setInterval(() => {
      setSeqStep((prevState) => Math.min(prevState + 1, rangeMax));
    }, iterationIntervalRef.current);

    setActiveIntervalId(intervalId);
  };

  const stopPlaying = () => {
    if (activeIntervalIdRef.current) {
      clearInterval(activeIntervalIdRef.current);

      setActiveIntervalId(null);
    }
  };

  const restartPlaying = () => {
    stopPlaying();
    setSeqStep(0);

    const intervalId = setInterval(() => {
      setSeqStep((prevState) => Math.min(prevState + 1, rangeMax));
    }, iterationIntervalRef.current);

    setActiveIntervalId(intervalId);
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      switch (event.key) {
        case 's':
        case 'S': {
          event.preventDefault();

          activeIntervalIdRef.current ? stopPlaying() : startPlaying();

          return;
        }
        case 'R': {
          event.preventDefault();

          restartPlaying();

          return;
        }
        default:
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <div className="join join-horizontal mb-8">
      {!activeIntervalId ? (
        <button className="btn btn-secondary w-20 mr-4" onClick={startPlaying}>
          Start
        </button>
      ) : (
        <button className="btn btn-error w-20 mr-4" onClick={stopPlaying}>
          Stop
        </button>
      )}
      <button className="btn btn-info btn-outline" onClick={restartPlaying}>
        ReStart
      </button>
    </div>
  );
};

export default TimeControls;
