import { assertDefined } from './util/assertDefined';

type DirectoryCommandOutput = {
  type: 'DIRECTORY';
  name: string;
};

type Directory = DirectoryCommandOutput & {
  type: 'DIRECTORY';
  size: number;
  subDirectories: Directory[];
};

type FileCommandOutput = {
  type: 'FILE';
  name: string;
  size: number;
};

type ListCommandOutput = FileCommandOutput | DirectoryCommandOutput;

type ChangeDirCommand = {
  type: 'CD';
  argument: string | '..' | '/';
};

type ListCommand = {
  type: 'LS';
  output: ListCommandOutput[];
};

type ExectutedCommand = ChangeDirCommand | ListCommand;

function* iterateCommandInput(input: string[]): Generator<string[]> {
  let previousCommandIndex = 0
  for (let i = 1; i < input.length; i++) {
    if (input[i].startsWith('$')){
      yield input.slice(previousCommandIndex, i);
      previousCommandIndex = i
    }
  }
  yield input.slice(previousCommandIndex);
}

const toCommandOutput = (line: string): ListCommandOutput => {
  const directoryMatch = line.match(/(dir (?<dirName>.*))/);
  const fileMatch = line.match(/(?<fileSize>[0-9]+) (?<fileName>.*)/);
  if (directoryMatch?.groups) {
    return { type: 'DIRECTORY', name: directoryMatch.groups.dirName ?? '' };
  } else if (fileMatch?.groups) {
    return {
      type: 'FILE',
      name: fileMatch?.groups.fileName,
      size: parseInt(fileMatch.groups.fileSize),
    };
  } else {
    throw new Error(`Unrecognized list command output: ${line}`);
  }
};

const toListCommand = (output: string[]): ListCommand => {
  return {
    type: 'LS',
    output: output.map(toCommandOutput),
  };
};

const toChangeDirCommand = (args?: string): ChangeDirCommand => {
  assertDefined(args, 'cd command must be executed with an argument');
  return {
    type: 'CD',
    argument: args,
  };
};

const toExectutedCommand = (lines: string[]): ExectutedCommand => {
  const commandLine = lines[0];
  const output = lines.slice(1);

  const matchGroups = commandLine.match(
    /(\$ (?<commandType>[a-z]+))( (?<args>.*))?/
  )?.groups;
  const commandType = matchGroups?.commandType;
  const args = matchGroups?.args;
  switch (commandType) {
    case 'ls':
      return toListCommand(output);
    case 'cd':
      return toChangeDirCommand(args);
    default:
      throw new Error(`unrecognized command: ${commandLine}`);
  }
};

const toExectutedCommands = (lines: string[]): ExectutedCommand[] => {
  const commands: ExectutedCommand[] = []
  for (const commandChunks of iterateCommandInput(lines)) {
    commands.push(toExectutedCommand(commandChunks))
  }
  return commands
};

export const solveD7P1 = (lines: string[]): string => {
  const commands = toExectutedCommands(lines);
  return '';
};

export const solveD7P2 = (lines: string[]): string => {
  return '';
};
