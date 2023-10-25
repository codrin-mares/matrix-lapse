import Cell from './Cell';

type Props = {
  row: string[];
};

const Row = ({ row }: Props): JSX.Element => {
  return (
    <div className="join join-horizontal">
      {row.map((cell, idx) => (
        <Cell key={idx} value={cell} />
      ))}
    </div>
  );
};

export default Row;
