const p3 = ({ A, B, C }: Input): number => {
  const res = 0;

  return res < 1000000000 ? res : -1;
};

type Input = {
  A: number[];
  B: number[];
  C: number[];
};

const inputs1: Input[] = [
  {
    A: [29, 50],
    B: [37, 61],
    C: [37, 70],
  },
];

// A: [29, 50, 70],
// B: [11, 37, 61],

// 11, 29, 37, 50, 61, 70

const results1 = [3];

const runTest1 = (input: Input, result: number, solution: (input: Input) => number) => {
  const myResult = solution(input);

  console.log(`First test input = ${JSON.stringify(input)} Corect result = ${result}`);
  console.log(`My result ${myResult} is correct?\n${JSON.stringify(myResult) === JSON.stringify(result)}`);
};

const runTests1 = (inputs: Input[], results: number[], solution: (input: Input) => number) => {
  for (const idx in inputs) {
    runTest1(inputs[idx], results[idx], solution);
  }
};

runTests1(inputs1, results1, p3);
