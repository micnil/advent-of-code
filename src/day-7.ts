import { assertDefined } from "./util/assertDefined";

type DirectoryName = {
  name: string,
}

type Directory = DirectoryName & {
  type: 'DIRECTORY';
  size: number;
  subDirectories: Directory[];
};

type File = {
  type: 'FILE';
  name: string;
  size: string;
};

type ListCommandOutput = File | DirectoryName;

type ChangeDirCommand = {
  type: 'CD';
  argument: string | '..' | '/';
};

type ListCommand = {
  type: 'LS';
  output: ListCommandOutput[];
};

type ExectutedCommand = ChangeDirCommand | ListCommand;


function *iterateChunksByCharacter(input: T[], char: string): Generator<> {

}

const toCommandOutput = (line: string): ListCommandOutput => {
  const directoryMatch = line.match(/(dir (?<dirName>.*))/);
  const fileMatch = line.match(/(?<fileSize>[1-9]+) (?<fileName>.*)/);
  if (directoryMatch?.groups) {
    directoryMatch?.groups.
  } else if (fileMatch?.groups) {

  } else {
    throw new Error(`Unrecognized list command output: ${line}`)
  }
}

const toListCommand = (output: string[]): ListCommand => {
  return {
    type: 'LS',
    output: []
  }
}

const toChangeDirCommand = (args?: string): ChangeDirCommand => {
  assertDefined(args, 'cd command must be executed with an argument')
  return {
    type: "CD",
    argument: args
  }
}

const toExectutedCommand = (lines: string[]): ExectutedCommand => {
  const commandLine = lines[0];
  const output = lines.slice(1);

  const matchGroups = commandLine.match(/(\$ (?<commandType>[a-z]+))( (?<args>[a-z]+))/)?.groups;
  const commandType = matchGroups?.commandType;
  const args = matchGroups?.args;

  switch(commandType) {
    case 'ls':
      return toListCommand(output);
    case 'cd':
      return toChangeDirCommand(args);
    default:
      throw new Error(`unrecognized command: ${commandLine}`);
  }
}

const toExectutedCommands = (lines: string[]): ExectutedCommand[] => {

}


export const solveD7P1 = (lines: string[]): string => {
  return '';
};

export const solveD7P2 = (lines: string[]): string => {
  return '';
};
