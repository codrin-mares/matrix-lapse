const checkMirror = (idxArr: number[], val: number, B: number[]): boolean => {
  for (const nIdx of idxArr) {
    if (B[nIdx] === val) {
      return true;
    }
  }

  return false;
};

const p1 = (A: number[], B: number[]): number => {
  const m: Map<number, number[]> = new Map();

  A.forEach((n, i) => {
    const prev = m.get(n);

    if (!prev) {
      m.set(n, [i]);
    } else {
      prev.push(i);
    }
  });

  console.log('M', m);
  console.log('\n');

  const maxInt = Math.max(...A);

  for (let i = 1; i <= maxInt; i += 1) {
    const current = m.get(i);

    if (!current) {
      return i;
    }

    if (!checkMirror(current, i, B)) {
      return i;
    }
  }

  return maxInt + 1;
};

const A1 = [1, 2, 4, 3];
const B1 = [1, 3, 2, 3];

const result1 = 2;

const myResult1 = p1(A1, B1);

console.log(`First test ${A1}, ${B1} Corect result = ${result1}`);
console.log(`My result ${myResult1} is correct ${myResult1 === result1}`);

const A2 = [3, 2, 1, 6, 5];
const B2 = [4, 2, 1, 3, 3];

const result2 = 3;

const myResult2 = p1(A2, B2);

console.log(`Second test ${A2}, ${B2} Corect result = ${result2}`);
console.log(`My result ${myResult2} is correct ${myResult2 === result2}`);

const A3 = [1, 2];
const B3 = [1, 2];

const result3 = 3;

const myResult3 = p1(A3, B3);

console.log(`Second test ${A3}, ${B3} Corect result = ${result3}`);
console.log(`My result ${myResult3} is correct ${myResult3 === result3}`);
