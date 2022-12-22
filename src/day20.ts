import { assertDefined } from './util/assertDefined';

type NumAndOrder = {
  num: number;
  order: number;
};

const move = (numbers: NumAndOrder[], order: number): NumAndOrder[] => {
  const origLength = numbers.length;
  const currIndex = numbers.findIndex(
    (numAndOrder) => numAndOrder.order === order
  );
  const fromNum = numbers[currIndex];
  assertDefined(fromNum, 'fromNum is undefined');
  const signedNewIndexWrapped = (currIndex + fromNum.num) % (origLength - 1);
  let newIndex =
    signedNewIndexWrapped < 0
      ? origLength + signedNewIndexWrapped - 1
      : signedNewIndexWrapped;
  newIndex = newIndex === 0 ? origLength - 1 : newIndex;

  const copy = [...numbers];
  copy.splice(currIndex, 1);
  copy.splice(newIndex, 0, fromNum);
  return copy;
};

const mixing = (encryptedNums: number[], times: number): number[] => {
  let nums: NumAndOrder[] = encryptedNums.map((num, i) => ({
    num,
    order: i,
  }));
  for (let i = 0; i < encryptedNums.length * times; i++) {
    nums = move(nums, i % encryptedNums.length);
  }

  return nums.map((num) => num.num);
};

export const solveD20P1 = (lines: string[]): string => {
  const encryptedCoordinates = lines.map((line) => parseInt(line));
  const decrypted = mixing(encryptedCoordinates, 1);
  const zeroIndex = decrypted.findIndex((num) => num === 0);
  const val1 = decrypted[(zeroIndex + 1000) % decrypted.length];
  const val2 = decrypted[(zeroIndex + 2000) % decrypted.length];
  const val3 = decrypted[(zeroIndex + 3000) % decrypted.length];
  return (val1 + val2 + val3).toString();
};

export const solveD20P2 = (lines: string[]): string => {
  const encryptedCoordinates = lines.map((line) => parseInt(line)).map(num => 811589153 * num);
  const decrypted = mixing(encryptedCoordinates, 10);
  const zeroIndex = decrypted.findIndex((num) => num === 0);
  const val1 = decrypted[(zeroIndex + 1000) % decrypted.length];
  const val2 = decrypted[(zeroIndex + 2000) % decrypted.length];
  const val3 = decrypted[(zeroIndex + 3000) % decrypted.length];
  return (val1 + val2 + val3).toString();
};
