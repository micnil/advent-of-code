type Forrest = number[][];

const indexToString = (i: number, j: number): string => `${i},${j}`;

const lookRightFromCoordinate = (
  forrest: Forrest,
  x: number,
  y: number
): Set<string> => {
  const visibleTrees = new Set<string>();
  let maxHeight = -1;
  for (let j = y; j < forrest[x].length; j++) {
    if (forrest[x][j] > maxHeight) {
      visibleTrees.add(indexToString(x, j));
      maxHeight = forrest[x][j];
    }
  }
  return visibleTrees;
};
const lookFromLeft = (forrest: Forrest): Set<string> => {
  let visibleTrees = new Set<string>();
  for (let i = 0; i < forrest.length; i++) {
    visibleTrees = new Set([
      ...visibleTrees,
      ...lookRightFromCoordinate(forrest, i, 0),
    ]);
  }
  return visibleTrees;
};

const lookLeftFromCoordinate = (
  forrest: Forrest,
  x: number,
  y: number
): Set<string> => {
  const visibleTrees = new Set<string>();
  let maxHeight = -1;
  for (let j = y; j >= 0; j--) {
    if (forrest[x][j] > maxHeight) {
      visibleTrees.add(indexToString(x, j));
      maxHeight = forrest[x][j];
    }
  }
  return visibleTrees;
};
const lookFromRight = (forrest: Forrest): Set<string> => {
  let visibleTrees = new Set<string>();
  for (let i = 0; i < forrest.length; i++) {
    visibleTrees = new Set([
      ...visibleTrees,
      ...lookLeftFromCoordinate(forrest, i, forrest[i].length - 1),
    ]);
  }

  return visibleTrees;
};

const lookDownFromCoordinate = (
  forrest: Forrest,
  x: number,
  y: number
): Set<string> => {
  const visibleTrees = new Set<string>();
  let maxHeight = -1;
  for (let j = x; j < forrest[y].length; j++) {
    if (forrest[j][y] > maxHeight) {
      visibleTrees.add(indexToString(j, y));
      maxHeight = forrest[j][y];
    }
  }
  return visibleTrees;
};
const lookFromAbove = (forrest: Forrest): Set<string> => {
  let visibleTrees = new Set<string>();
  for (let i = 0; i < forrest.length; i++) {
    visibleTrees = new Set([
      ...visibleTrees,
      ...lookDownFromCoordinate(forrest, 0, i),
    ]);
  }
  return visibleTrees;
};

const lookUpFromCoordinate = (
  forrest: Forrest,
  x: number,
  y: number
): Set<string> => {
  const visibleTrees = new Set<string>();
  let maxHeight = -1;
  for (let j = x; j >= 0; j--) {
    if (forrest[j][y] > maxHeight) {
      visibleTrees.add(indexToString(j, y));
      maxHeight = forrest[j][y];
    }
  }
  return visibleTrees;
};
const lookFromBelow = (forrest: Forrest): Set<string> => {
  let visibleTrees = new Set<string>();
  for (let i = forrest.length - 1; i >= 0; i--) {
    visibleTrees = new Set([
      ...visibleTrees,
      ...lookUpFromCoordinate(forrest, forrest.length - 1, i),
    ]);
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

const lookDown = (forrest: Forrest, x: number, y: number): Set<string> => {
  const visibleTrees = new Set<string>();
  let maxHeight = forrest[x][y];
  for (let j = x + 1; j < forrest[y].length; j++) {
    visibleTrees.add(indexToString(j, y));
    if (forrest[j][y] >= maxHeight) {
      break;
    }
  }
  return visibleTrees;
};
const lookUp = (forrest: Forrest, x: number, y: number): Set<string> => {
  const visibleTrees = new Set<string>();
  let maxHeight = forrest[x][y];
  for (let j = x - 1; j >= 0; j--) {
    visibleTrees.add(indexToString(j, y));
    if (forrest[j][y] >= maxHeight) {
      break;
    }
  }
  return visibleTrees;
};
const lookRight = (forrest: Forrest, x: number, y: number): Set<string> => {
  const visibleTrees = new Set<string>();
  let maxHeight = forrest[x][y];
  for (let j = y + 1; j < forrest[x].length; j++) {
    visibleTrees.add(indexToString(x, j));
    if (forrest[x][j] >= maxHeight) {
      break;
    }
  }
  return visibleTrees;
};
const lookLeft = (forrest: Forrest, x: number, y: number): Set<string> => {
  const visibleTrees = new Set<string>();
  let maxHeight = forrest[x][y];
  for (let j = y - 1; j >= 0; j--) {
    visibleTrees.add(indexToString(x, j));
    if (forrest[x][j] >= maxHeight) {
      break;
    }
  }
  return visibleTrees;
};
const getScenicScore = (forrest: Forrest, x: number, y: number): number => {
  const down = lookDown(forrest, x, y).size;
  const up = lookUp(forrest, x, y).size;
  const right = lookRight(forrest, x, y).size;
  const left = lookLeft(forrest, x, y).size;
  return down * up * right * left;
};
const findHighestScenicScore = (forrest: Forrest): number => {
  let maxScenicScore = -1;
  for (let i = 0; i < forrest.length; i++) {
    for (let j = 0; j < forrest[i].length; j++) {
      const sc = getScenicScore(forrest, i, j);
      maxScenicScore = Math.max(sc, maxScenicScore);
    }
  }
  return maxScenicScore;
};

const toForrest = (lines: string[]): Forrest =>
  lines.map((line) => line.split('').map((value) => parseInt(value)));

export const solveD8P1 = (lines: string[]): string => {
  const forrest = toForrest(lines);
  const visibleCoordinates = getVisibleCoordinates(forrest);
  return visibleCoordinates.size.toString();
};

export const solveD8P2 = (lines: string[]): string => {
  const forrest = toForrest(lines);
  return findHighestScenicScore(forrest).toString();
};
