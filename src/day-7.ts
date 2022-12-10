import { assertDefined } from './util/assertDefined';

type DirectoryCommandOutput = {
  type: 'DIRECTORY';
  name: string;
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
  let previousCommandIndex = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i].startsWith('$')) {
      yield input.slice(previousCommandIndex, i);
      previousCommandIndex = i;
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
  const commands: ExectutedCommand[] = [];
  for (const commandChunks of iterateCommandInput(lines)) {
    commands.push(toExectutedCommand(commandChunks));
  }
  return commands;
};

const getNewPathFromCdCommand = (
  currentPath: string,
  cdCommandArg: string
): string => {
  if (cdCommandArg === '/') {
    return '';
  } else if (cdCommandArg === '..') {
    const upOneLevelIndex = currentPath.lastIndexOf('/');
    return currentPath.slice(0, upOneLevelIndex);
  } else {
    return currentPath + '/' + cdCommandArg;
  }
};

const isFileOutput = (
  listCommandOutput: ListCommandOutput
): listCommandOutput is FileCommandOutput => listCommandOutput.type === 'FILE';

const getSizeFromOutput = (listCommandOutput: ListCommandOutput[]): number => {
  return listCommandOutput
    .filter(isFileOutput)
    .reduce((acc, curr) => acc + curr.size, 0);
};

const getDiskUsage = (commands: ExectutedCommand[]): Map<string, number> => {
  const diskUsage = new Map<string, number>();
  let currentPath = '';
  for (const command of commands) {
    if (command.type === 'CD') {
      currentPath = getNewPathFromCdCommand(currentPath, command.argument);
    } else if (command.type === 'LS') {
      const size = getSizeFromOutput(command.output);
      diskUsage.forEach((value, key) => {
        if (currentPath.startsWith(key)) {
          diskUsage.set(key, value + size);
        }
      });
      diskUsage.set(currentPath, size);
    }
  }
  return diskUsage;
};

const sumAllDirectoriesUnderSize = (diskUsage: Map<string, number>, maxSize: number): number => {
  let sumSize = 0;
  diskUsage.forEach((value, key) => {
    if (value < maxSize) {
      sumSize = sumSize + value;
    }
  })
  return sumSize;
}

const getFreeSpace = (diskUsage: Map<string, number>, maxSize: number): number => {
  return maxSize - (diskUsage.get('') ?? 0)
}

const findSizeOfDirectoryToDelete = (diskUsage: Map<string, number>, spaceNeeded: number): string => {
  const freeSpace = getFreeSpace(diskUsage, 70000000);
  const spaceToFreeUp = spaceNeeded - freeSpace;
  let sizeToDelete = Number.MAX_SAFE_INTEGER;
  diskUsage.forEach((value, key) => {
    if (value < sizeToDelete && value > spaceToFreeUp) {
      sizeToDelete = value;
    }
  })
  return sizeToDelete.toString();
}

export const solveD7P1 = (lines: string[]): string => {
  const commands = toExectutedCommands(lines);
  const diskUsagePerDirectory = getDiskUsage(commands);
  return sumAllDirectoriesUnderSize(diskUsagePerDirectory, 100000).toString();
};

export const solveD7P2 = (lines: string[]): string => {
  const commands = toExectutedCommands(lines);
  const diskUsagePerDirectory = getDiskUsage(commands);

  return findSizeOfDirectoryToDelete(diskUsagePerDirectory, 30000000);
};
