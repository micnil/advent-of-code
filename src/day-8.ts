type Forrest = number[][];

const indexToString = (i: number, j: number): string => `${i},${j}`;

// type TwoDimensionalIndexAndElement<T> = {
//   x: number;
//   y: number;
//   coordinateStr: string;
//   value: T;
// }
// function *iterate2DArray<T>(array: T[][]): Generator<TwoDimensionalIndexAndElement<T>>{

// }

const lookFromLeft = (forrest: Forrest): Set<string> => {
  const visibleTrees = new Set<string>();
  for (let i = 0; i < forrest.length; i++) {
    let maxHeight = -1;
    for (let j = 0; j < forrest[i].length; j++) {
      if (forrest[i][j] > maxHeight) {
        visibleTrees.add(indexToString(i, j));
        maxHeight = forrest[i][j];
      }
    }
  }
  return visibleTrees;
};

const lookFromRight = (forrest: Forrest): Set<string> => {
  const visibleTrees = new Set<string>();
  for (let i = 0; i < forrest.length; i++) {
    let maxHeight = -1;
    for (let j = forrest[i].length - 1; j >= 0; j--) {
      if (forrest[i][j] > maxHeight) {
        visibleTrees.add(indexToString(i, j));
        maxHeight = forrest[i][j];
      }
    }
  }

  return visibleTrees;
};

const lookFromAbove = (forrest: Forrest): Set<string> => {
  const visibleTrees = new Set<string>();
  for (let i = 0; i < forrest.length; i++) {
    let maxHeight = -1;
    for (let j = 0; j < forrest[i].length; j++) {
      if (forrest[j][i] > maxHeight) {
        visibleTrees.add(indexToString(j, i));
        maxHeight = forrest[j][i];
      }
    }
  }
  return visibleTrees;
};

const lookFromBelow = (forrest: Forrest): Set<string> => {
  const visibleTrees = new Set<string>();
  for (let i = forrest.length - 1; i >= 0; i--) {
    let maxHeight = -1;
    for (let j = forrest[i].length - 1; j >= 0; j--) {
      if (forrest[j][i] > maxHeight) {
        visibleTrees.add(indexToString(j, i));
        maxHeight = forrest[j][i];
      }
    }
  }
  return visibleTrees;
};

const getVisibleCoordinates = (forrest: Forrest): Set<string> => {
  const left = lookFromLeft(forrest);
  const right = lookFromRight(forrest);
  const above = lookFromAbove(forrest);
  const below = lookFromBelow(forrest);
  return new Set([...left, ...right, ...above, ...below]);
};

const toForrest = (lines: string[]): Forrest =>
  lines.map((line) => line.split('').map((value) => parseInt(value)));

export const solveD8P1 = (lines: string[]): string => {
  const forrest = toForrest(lines);
  const visibleCoordinates = getVisibleCoordinates(forrest);
  return visibleCoordinates.size.toString();
};

export const solveD8P2 = (lines: string[]): string => {
  return '';
};
