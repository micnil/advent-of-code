type Operation = () => number;
type Throw = (item: number) => number;
type Monkey = {
  id: number;
  items: number[];
  inspect: Operation;
  throw: Throw;
};

const chunkBy = function* <T>(list: T[], predicate: (elem: T) => boolean) {
  let chunk: T[] = [];
  for (const element of list) {
    if (predicate(element)) {
      yield chunk;
      chunk = [];
    } else {
      chunk.push(element);
    }
  }
  yield chunk;
};

const toMonkey = (lines: string[]): Monkey => {

};

const toMonkeys = (lines: string[]): Monkey[] => {
  return [...chunkBy(lines, (line) => line === '')].map(toMonkey);
};

export const solveD11P1 = (lines: string[]): string => {
  return '';
};

export const solveD11P2 = (lines: string[]): string => {
  return '';
};
