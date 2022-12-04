
const shapeScore = {
  'X': 1,
  'Y': 2,
  'Z': 3,
}

const looseDrawWinScore = {
  'X': 0,
  'Y': 3,
  'Z': 6,
}

const outcomeMap1 = {
  'A': {
    'X': 3,
    'Y': 6,
    'Z': 0,
  },
  'B': {
    'X': 0,
    'Y': 3,
    'Z': 6,
  },
  'C': {
    'X': 6,
    'Y': 0,
    'Z': 3,
  },
}

const outcomeMap2 = {
  'A': {
    'X': 3,
    'Y': 1,
    'Z': 2,
  },
  'B': {
    'X': 1,
    'Y': 2,
    'Z': 3,
  },
  'C': {
    'X': 2,
    'Y': 3,
    'Z': 1,
  },
}

type Round = ['A' | 'B' | 'C', 'X' | 'Y' | 'Z']

export const solveD2P1 = (lines: string[]): string => {
  const rounds = lines.map(line => line.split(' ')) as Round[];
  const score = rounds.reduce((prev, [opponentHand, playerHand]) => {
    return prev + outcomeMap1[opponentHand][playerHand] + shapeScore[playerHand];
  }, 0)
  return score.toString();
};

export const solveD2P2 = (lines: string[]): string => {
  const rounds = lines.map(line => line.split(' ')) as Round[];
  const score = rounds.reduce((prev, [opponentHand, playerHand]) => {
    return prev + outcomeMap2[opponentHand][playerHand] + looseDrawWinScore[playerHand];
  }, 0)
  return score.toString();
};
