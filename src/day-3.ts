type Backpack = {
  compartmentA: string;
  compartmentB: string;
};

const toBackpack = (line: string): Backpack => {
  return {
    compartmentA: line.slice(0, line.length / 2),
    compartmentB: line.slice(line.length / 2),
  };
};

const findDuplicate = (str1: string, str2: string): string => {
  const set = new Set([...str1]);
  return [...str2].find((char) => set.has(char)) ?? '';
};

const deduplicate = (str: string): string[] => {
  return [...new Set([...str])];
};

const findDuplicateArray = (stringArray: string[]): string => {
  const charCountMap = new Map<string, number>();

  stringArray.map(deduplicate).forEach((chars) => {
    chars.forEach((char) =>
      charCountMap.set(char, (charCountMap.get(char) ?? 0) + 1)
    );
  });
  for (const [char, num] of charCountMap.entries()) {
    if (num === stringArray.length) {
      return char;
    }
  }
  return '';
};

const toPriority = (char: string): number => {
  const codePoint = char.charCodeAt(0);
  if (codePoint > 96) {
    return codePoint - 96;
  } else {
    return codePoint - 38;
  }
};

const takeNumElementsIterator = function* (
  input: string[],
  numberToTake: number
): Generator<string[]> {
  let group: string[] = [];
  for (let i = 0; i < input.length; i++) {
    group.push(input[i]);
    if (group.length === numberToTake) {
      yield group;
      group = [];
    }
  }
};

export const solveD3P1 = (lines: string[]): string => {
  const backpacks = lines.map(toBackpack);
  const sumPriorities = backpacks.reduce((prev, backpack) => {
    const duplicate = findDuplicate(
      backpack.compartmentA,
      backpack.compartmentB
    );
    return prev + toPriority(duplicate);
  }, 0);
  return sumPriorities.toString();
};

export const solveD3P2 = (lines: string[]): string => {
  const sumPriorities = [...takeNumElementsIterator(lines, 3)].reduce(
    (prev, group) => {
      const duplicate = findDuplicateArray(group);

      return prev + toPriority(duplicate);
    },
    0
  );
  return sumPriorities.toString();
};
