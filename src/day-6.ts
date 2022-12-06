import { assertDefined } from './util/assertDefined';

type ElementWithPrevious<T> = {
  index: number;
  elementWithPrevious: T[];
};

function* iterateWithXPrevious<T>(
  array: T[],
  num: number
): Generator<ElementWithPrevious<T>> {
  if (array.length < num)
    throw new Error(
      `array too short to iterate with ${num} previous, length: ${array.length}`
    );

  for (let i = num; i < array.length; i++) {
    yield {
      index: i,
      elementWithPrevious: array.slice(i - num, i),
    };
  }
}

const isUniqueSetOfChars = (chars: string[]): boolean => {
  return new Set(chars).size === chars.length;
};

const findIndexOfFirstXUniqCharacters = (chars: string[], numUnique: number): number => {
  for (const { index, elementWithPrevious } of iterateWithXPrevious(
    chars,
    numUnique
  )) {
    if (isUniqueSetOfChars(elementWithPrevious)) {
      return index;
    }
  }

  return -1;
}

export const solveD6P1 = (lines: string[]): string => {
  const message = lines[0];
  assertDefined(message, 'input must be defined');
  const messageChars = [...message];

  return findIndexOfFirstXUniqCharacters(messageChars, 4).toString();
};

export const solveD6P2 = (lines: string[]): string => {
  const message = lines[0];
  assertDefined(message, 'input must be defined');
  const messageChars = [...message];

  return findIndexOfFirstXUniqCharacters(messageChars, 14).toString();
};
