import { solveD1P1, solveD1P2 } from '@advent-of-code/day-1';
import { readSync } from 'clipboardy';
import { Command } from 'commander';

type Solver = (input: string[]) => string
type Args = {
  day: number;
  problem: number;
  input: string[];
}

const runOneOrTwo = (args: Args, solverOne: Solver, solverTwo: Solver) => {
  if (args.problem === 1) {
    return solverOne(args.input);
  } else if(args.problem === 2) {
    return solverTwo(args.input);
  } else {
    throw new Error('"--problem" option can only be 1 or 2');
  }
}
const solve = (args: Args): string => {
  switch(args.day) {
    case 1:
      return runOneOrTwo(args, solveD1P1, solveD1P2);
    default:
      throw new Error(`args.day: ${args.day} is either not implemented yet or not a valid day`);
  }
}

const program = new Command();

program
  .name('Advent of code')
  .description('Solutions to advent of code')

program.command('solve')
  .description('Copy your problem input to your clipboard before running')
  .argument('<day>', 'day to solve')
  .option('-p, --problem <number>', 'Problem 1 or 2', '1')
  .action((dayStr, options) => {
    const input = readSync().split(/\r\n|\r|\n/);
    const args: Args = {
      day: parseInt(dayStr),
      problem: parseInt(options.problem),
      input,
    }
    const result = solve(args)
    console.log(result);
  });

program.parse();
