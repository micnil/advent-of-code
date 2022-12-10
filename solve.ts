import clipboard from 'clipboardy';
import { program } from 'commander';
import * as fs from 'fs';
import { solveD1P1, solveD1P2 } from './src/day-1';
import { solveD2P1, solveD2P2 } from './src/day-2';
import { solveD3P1, solveD3P2 } from './src/day-3';
import { solveD4P1, solveD4P2 } from './src/day-4';
import { solveD5P1, solveD5P2 } from './src/day-5';
import { solveD6P1, solveD6P2 } from './src/day-6';
import { solveD7P1, solveD7P2 } from './src/day-7';
import { solveD8P1, solveD8P2 } from './src/day-8';
import { solveD9P1, solveD9P2 } from './src/day-9';

type Solution = {
  part1: string;
  part2: string;
};
type Solver = (input: string[]) => string;
type Args = {
  day: number;
  input: string[];
};

const run = (args: Args, solverOne: Solver, solverTwo: Solver): Solution => {
  return {
    part1: solverOne(args.input),
    part2: solverTwo(args.input),
  };
};
const solve = (args: Args): Solution => {
  switch (args.day) {
    case 1:
      return run(args, solveD1P1, solveD1P2);
    case 2:
      return run(args, solveD2P1, solveD2P2);
    case 3:
      return run(args, solveD3P1, solveD3P2);
    case 4:
      return run(args, solveD4P1, solveD4P2);
    case 5:
      return run(args, solveD5P1, solveD5P2);
    case 6:
      return run(args, solveD6P1, solveD6P2);
    case 7:
      return run(args, solveD7P1, solveD7P2);
    case 8:
      return run(args, solveD8P1, solveD8P2);
    case 9:
      return run(args, solveD9P1, solveD9P2);
    default:
      throw new Error(
        `args.day: ${args.day} is either not implemented yet or not a valid day`
      );
  }
};

program
  .description(
    'If no file path is provided (-i), then input will be taken from the clipboard'
  )
  .option('-i, --input <string>', 'input file path')
  .option('-d, --day <number>', 'Day 1-25', '1')
  .action((options) => {
    console.log(options);
    const input = options.input
      ? fs
          .readFileSync(options.input, { encoding: 'utf8', flag: 'r' })
          .split(/\r\n|\r|\n/)
      : clipboard.readSync().split(/\r\n|\r|\n/);
    if (input[input.length - 1] === '') {
      input.pop();
    }
    const args: Args = {
      day: parseInt(options.day),
      input,
    };

    const solution = solve(args);
    console.log('Solution part 1: ', solution.part1);
    console.log('Solution part 2: ', solution.part2);
  });

program.parse();
