type Props = {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max: number;
};

const Range = ({ value, onChange, min = 0, max }: Props): JSX.Element => {
  console.log('pula9');
  return (
    <div className="mb-8 flex-grow">
      <div className="flex justify-between pb-4">
        <div className="badge badge-secondary badge-outline">Min - {min}</div>
        <div className="badge badge-primary badge-outline">Current - {value}</div>
        <div className="badge badge-secondary badge-outline">Max - {max}</div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        className="range range-xs range-primary"
        onChange={onChange}
      />
    </div>
  );
};

export default Range;
