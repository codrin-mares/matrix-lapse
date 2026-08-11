type Props = {
  name: string;
};

// eslint-disable-next-line no-empty-pattern
const PositionInput = ({ name }: Props): JSX.Element => {
  return (
    <div className="join join-horizontal items-center gap-4">
      <div>{name}</div>
      <input type="number" placeholder="Row" className="input input-bordered input-primary w-20 h-10 text-sm" />
      <input type="number" placeholder="Col" className="input input-bordered input-primary w-20 h-10 text-sm" />
    </div>
  );
};

export default PositionInput;
