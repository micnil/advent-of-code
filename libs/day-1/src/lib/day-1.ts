const iterateSums = function* (input: string[]) {
  let sum = 0;
  for (const line of input) {
    const lineTrimmed = line.trim();
    if (lineTrimmed !== '') {
      sum = sum + parseInt(lineTrimmed);
    } else {
      yield sum;
      sum = 0;
    }
  }
};

export const solveD1P1 = (lines: string[]): string => {
  return '';
};
export const solveD1P2 = (lines: string[]): string => {
  let maxCalories = 0;
  for (const calories of iterateSums(lines)) {
    if (calories > maxCalories) {
      maxCalories = calories;
    }
  }

  return maxCalories.toString();
};
