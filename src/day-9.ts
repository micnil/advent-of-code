type Direction = 'L' | 'D' | 'U' | 'R';

type Move = {
  direction: Direction;
  distance: number;
};

type Coordinate = {
  x: number;
  y: number;
};

type Rope = {
  head: Coordinate;
  tail: Coordinate;
};

const indexToString = (i: number, j: number): string => `${i},${j}`;

const moveCoordinate = ({ x, y }: Coordinate, move: Move): Coordinate => {
  switch (move.direction) {
    case 'D':
      return {
        y: y - move.distance,
        x,
      };
    case 'L':
      return {
        y,
        x: x - move.distance,
      };
    case 'R':
      return {
        y,
        x: x + move.distance,
      };
    case 'U':
      return {
        y: y + move.distance,
        x,
      };
    default:
      throw new Error(`Unknown move direction: ${move.direction}`);
  }
};

const chebyshevDistance = (coord1: Coordinate, coord2: Coordinate): number => {
  return Math.max(Math.abs(coord1.x - coord2.x), Math.abs(coord1.y - coord2.y));
};

const isNeighbour = (coord1: Coordinate, coord2: Coordinate): boolean => {
  return chebyshevDistance(coord1, coord2) <= 1;
};

const followCoordinate = (
  coordToMove: Coordinate,
  coordToFollow: Coordinate
): Coordinate => {
  if (!isNeighbour(coordToMove, coordToFollow)) {
    if (coordToMove.x === coordToFollow.x) {
      // Same column
      return {
        x: coordToMove.x,
        y:
          coordToMove.y < coordToFollow.y
            ? coordToFollow.y - 1
            : coordToFollow.y + 1,
      };
    } else if (coordToMove.y === coordToFollow.y) {
      // Same row
      return {
        x:
          coordToMove.x < coordToFollow.x
            ? coordToFollow.x - 1
            : coordToFollow.x + 1,
        y: coordToMove.y,
      };
    } else {
      return {
        x:
          coordToMove.x < coordToFollow.x
            ? coordToMove.x + 1
            : coordToMove.x - 1,
        y:
          coordToMove.y < coordToFollow.y
            ? coordToMove.y + 1
            : coordToMove.y - 1,
      };
    }
  } else {
    return coordToMove;
  }
};

const toRopeMoves = (lines: string[]): Move[] => {
  return lines.map((line) => {
    const direction = line[0];
    const distance = parseInt(line.slice(1));
    return {
      direction: direction as Direction,
      distance: distance,
    };
  });
};

const toOneStepMoves = (moves: Move[]): Move[] => {
  return moves.flatMap((move) =>
    Array(move.distance).fill({ direction: move.direction, distance: 1 })
  );
};

export const solveD9P1 = (lines: string[]): string => {
  const ropeMoves = toRopeMoves(lines);
  const oneStepMoves = toOneStepMoves(ropeMoves);
  const tailCoordinates = new Set<string>(['0,0']);
  let head: Coordinate = { x: 0, y: 0 };
  let tail: Coordinate = {
    x: 0,
    y: 0,
  };
  for (const move of oneStepMoves) {
    head = moveCoordinate(head, move);
    tail = followCoordinate(tail, head);
    tailCoordinates.add(indexToString(tail.x, tail.y));
  }
  return tailCoordinates.size.toString();
};

export const solveD9P2 = (lines: string[]): string => {
  const ropeMoves = toRopeMoves(lines);
  const oneStepMoves = toOneStepMoves(ropeMoves);
  let head: Coordinate = { x: 0, y: 0 };
  const knots = Array(9).fill({ x: 0, y: 0 });
  const tailCoordinates = new Set<string>(['0,0']);
  for (const move of oneStepMoves) {
    head = moveCoordinate(head, move);
    let previousKnot = head;
    for (let i = 0; i < knots.length; i++) {
      knots[i] = followCoordinate(knots[i], previousKnot);
      previousKnot = knots[i];
    }
    const tail = knots[knots.length - 1];
    tailCoordinates.add(indexToString(tail.x, tail.y));
  }
  return tailCoordinates.size.toString();
};
