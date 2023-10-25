import { Settings } from '../../types';

type Props = {
  settings: Settings;
  onChange: (settings: Settings) => void;
};

const SettingsForm = ({ settings, onChange }: Props): JSX.Element => {
  const { isZeroBased, iterationInterval } = settings;

  return (
    <div className="mb-8 w-40">
      <div className="text-2xl mb-2">Settings</div>
      <div className="form-control">
        <label className="label cursor-pointer" htmlFor="zero-based-cb">
          <span className="label-text">Zero based</span>
          <input
            id="zero-based-cb"
            type="checkbox"
            checked={isZeroBased}
            className="toggle toggle-primary"
            onChange={() => onChange({ ...settings, isZeroBased: !isZeroBased })}
          />
        </label>
        <label className="label" htmlFor="number-input">
          <span className="label-text">Iteration Interval</span>
        </label>
        <input
          id="number-input"
          type="number"
          min={100}
          step={100}
          value={iterationInterval}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value);

            onChange({ ...settings, iterationInterval: isNaN(val) ? 1000 : val });
          }}
          placeholder="Type here"
          className="input input-bordered input-info input-sm w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default SettingsForm;
