const p2 = (T: number[]): number[] => {
  const adj: { [k: number]: number[] } = {};
  let capital;

  T.forEach((val, idx) => {
    if (val == idx) {
      capital = val;

      return;
    }

    if (adj[val]) {
      adj[val].push(idx);
    } else {
      adj[val] = [idx];
    }
  });

  if (!capital) {
    throw Error('no capital');
  }

  const queue: number[] = [];

  queue.push(capital);

  const result = Array.from({ length: T.length - 1 }).fill(0) as number[];
  let count = 0;
  let resIdx = 0;

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i += 1) {
      const current = queue.shift() as number;

      count += (adj[current] || []).length;

      queue.push(...(adj[current] || []));
    }

    result[resIdx] = count;
    resIdx += 1;
    count = 0;
  }

  return result;
};

const inputs = [[9, 1, 4, 9, 0, 4, 8, 9, 0, 1]];

const results = [[1, 3, 2, 3, 0, 0, 0, 0, 0]];

const runTest = (input: number[], result: number[], solution: (input: number[]) => number[]) => {
  const myResult = solution(input);

  console.log(`First test input = ${input} Corect result = ${result}`);
  console.log(`My result ${myResult} is correct?\n${JSON.stringify(myResult) === JSON.stringify(result)}`);
};

const runTests = (inputs: number[][], result: number[][], solution: (input: number[]) => number[]) => {
  for (const idx in inputs) {
    runTest(inputs[idx], results[idx], solution);
  }
};

runTests(inputs, results, p2);
