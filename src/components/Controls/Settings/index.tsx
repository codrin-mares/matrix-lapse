import { Settings } from '../../types';

type Props = {
  settings: Settings;
  onChange: (settings: Settings) => void;
};

const SettingsForm = ({ settings, onChange }: Props): JSX.Element => {
  const { isZeroBased } = settings;

  return (
    <div className="mb-8 w-40">
      <div className="text-2xl mb-2">Settings</div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Zero based</span>
          <input
            type="checkbox"
            checked={isZeroBased}
            className="toggle toggle-primary"
            onChange={() => onChange({ ...settings, isZeroBased: !isZeroBased })}
          />
        </label>
      </div>
    </div>
  );
};

export default SettingsForm;
