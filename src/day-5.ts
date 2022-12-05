import { assertDefined } from './util/assertDefined';

type Crate = string;

type StackState = Map<number, Crate[]>;

type Move = {
  from: number;
  to: number;
  num: number;
};

type MoveProcedure = Move[];

const iterateLetterWithColumn = function* (
  input: string[]
): Generator<[number, Crate]> {};

const findEndOfStartStateIndex = (lines: string[]) =>
  lines.findIndex((line) => line === '');

const toMove = (line: string): Move => {
  const lineWithoutSpaces = line.split(' ').join('');
  const match = lineWithoutSpaces.match(
    /(move(?<move>[0-9]+))(from(?<from>[0-9]+))(to(?<to>[0-9]+))/
  );
  if (!match?.groups?.move || !match?.groups?.from || !match?.groups?.to) {
    throw new Error(`faulty input: ${line}`);
  } else {
    return {
      from: parseInt(match.groups.from),
      to: parseInt(match.groups.to),
      num: parseInt(match.groups.move),
    };
  }
};
const toMoveProceduce = (lines: string[]): MoveProcedure => {
  const index = findEndOfStartStateIndex(lines);
  const moveOrderLines = lines.slice(index + 1);
  return moveOrderLines.map(toMove);
};

const toEmptyStackState = (columnsLine: string): StackState => {
  const numColumns = [...columnsLine].filter((char) => char !== ' ').length;
  const stateStack: StackState = new Map();
  for (let i = 0; i < numColumns; i++) {
    stateStack.set(i + 1, []);
  }
  return stateStack;
};

const isCrate = (char: string): boolean =>
  65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 90;

const setInitialState = (stackState: StackState, crateLines: string[]) => {
  crateLines.forEach((line) => {
    const chars = [...line];
    chars.forEach((char, i) => {
      if (isCrate(char)) {
        const stackCrates = stackState.get(Math.floor(i / 4) + 1);
        stackCrates?.push(char);
      }
    });
  });
};

const toStackState = (lines: string[]): StackState => {
  const index = findEndOfStartStateIndex(lines);
  const startStateLines = lines.slice(0, index).reverse();
  const columnsLine = startStateLines.slice(0, 1)[0];
  const crateLines = startStateLines.slice(1);

  const stackState = toEmptyStackState(columnsLine);
  setInitialState(stackState, crateLines);
  return stackState;
};

const getSolution = (stackState: StackState): string => {
  const topCrates: string[] = [];
  stackState.forEach((stack) => {
    topCrates.push(stack[stack.length - 1] ?? '');
  });
  return topCrates.join('');
};

export const solveD5P1 = (lines: string[]): string => {
  const moveProcedure = toMoveProceduce(lines);
  const stackState = toStackState(lines);
  for (const move of moveProcedure) {
    const fromStack = stackState.get(move.from);
    const toStack = stackState.get(move.to);
    assertDefined(fromStack, 'expect fromStack to be defined');
    assertDefined(toStack, 'expect toStack to be defined');
    const removed = fromStack.splice(fromStack.length - move.num, move.num);
    toStack.push(...removed.reverse());
  }
  return getSolution(stackState);
};

export const solveD5P2 = (lines: string[]): string => {
  const moveProcedure = toMoveProceduce(lines);
  const stackState = toStackState(lines);
  for (const move of moveProcedure) {
    const fromStack = stackState.get(move.from);
    const toStack = stackState.get(move.to);
    assertDefined(fromStack, 'expect fromStack to be defined');
    assertDefined(toStack, 'expect toStack to be defined');
    const removed = fromStack.splice(fromStack.length - move.num, move.num);
    toStack.push(...removed);
  }
  return getSolution(stackState);
};
