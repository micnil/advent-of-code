import { solveD2P1, solveD2P2 } from '../day-2';

describe('day2', () => {
  it('solveD2P1', () => {
    expect(solveD2P1(['A Y', 'B X', 'C Z'])).toEqual('15');
  });

  it('solveD2P2', () => {
    expect(solveD2P2(['A Y', 'B X', 'C Z'])).toEqual('12');
  });
});
