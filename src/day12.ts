type Coordinate = {
  x: number;
  y: number;
};

type Map = {
  terrain: number[][];
  startPosition: Coordinate;
  endPosition: Coordinate;
};
type Path = {
  coord: Coordinate;
  next: Path[];
};

const toHeight = (char: string): number => {
  if (char === 'S') {
    char = 'a';
  } else if (char === 'E') {
    char = 'z';
  }

  return char.charCodeAt(0) - 97;
};

const toMap = (lines: string[]): Map => {
  let sp: Coordinate = { x: 0, y: 0 };
  let ep: Coordinate = { x: 0, y: 0 };
  const terrain = lines.map((line, y) =>
    [...line].map((char, x) => {
      if (char === 'S') {
        sp = {
          x,
          y,
        };
      } else if (char === 'E') {
        ep = {
          x,
          y,
        };
      }
      return toHeight(char);
    })
  );
  return {
    startPosition: sp,
    endPosition: ep,
    terrain,
  };
};

const searchNext = (terrain: number[][], startingPath: Path): Path[] => {}

export const solveD12P1 = (lines: string[]): string => {
  const map = toMap(lines);
  return '';
};

export const solveD12P2 = (lines: string[]): string => {
  return '';
};
