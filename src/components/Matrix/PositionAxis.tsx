type Props = {
  len: number;
  type: 'vertical' | 'horizontal';
  isZeroBased: boolean;
};

const processFinalAxis = (line: JSX.Element[], type: 'horizontal' | 'vertical'): JSX.Element[] => {
  if (type === 'horizontal') {
    return line;
  }

  const firstItem = <div key={'first'} className="text-secondary join-item h-6 w-6 flex items-center justify-center" />;
  const lastItem = <div key={'last'} className="text-secondary join-item h-6 w-6 flex items-center justify-center" />;

  return [firstItem, ...line, lastItem];
};

const PositionAxis = ({ len, type, isZeroBased }: Props): JSX.Element => {
  const line = Array.from(Array(len)).map((_, i) => (
    <div key={i} className="text-secondary join-item h-6 w-6 flex items-center justify-center">
      {isZeroBased ? i : i + 1}
    </div>
  ));

  const finalAxis = processFinalAxis(line, type);
  const joinType = type === 'horizontal' ? 'horizontal' : 'vertical';

  return <div className={`join join-${joinType}`}>{finalAxis}</div>;
};

export default PositionAxis;
