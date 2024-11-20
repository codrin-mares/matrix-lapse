type Props = {
  some?: string;
};

// eslint-disable-next-line no-empty-pattern
const PathInput = ({}: Props): JSX.Element => {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">Generate path from steps</span>
        <span className="label-text-alt">Use WASD/NWES/UDLR</span>
      </div>
      <textarea className="textarea textarea-primary" placeholder="Input path here"></textarea>
    </label>
  );
};

export default PathInput;
