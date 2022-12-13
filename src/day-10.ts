type NoopInstruction = {
  type: 'NOOP';
};

type AddXInstruction = {
  type: 'ADD_X';
  value: number;
};

type Instruction = NoopInstruction | AddXInstruction;

type Register = {
  x: number;
};

const toInstructions = (lines: string[]): Instruction[] => {
  return lines.map((line) => {
    const match = line.match(/((?<instruction>[a-z]+))( (?<args>.*))?/);

    if (match?.groups?.instruction === 'noop') {
      return {
        type: 'NOOP',
      };
    } else if (match?.groups?.instruction === 'addx') {
      return {
        type: 'ADD_X',
        value: parseInt(match.groups.args),
      };
    } else {
      throw new Error(`Unknown instruction: ${line}`);
    }
  });
};

const noop = (register: Register) => {
  return register;
};
const addX = (register: Register, value: number): Register => ({
  x: register.x + value,
});

type RegisterUpdater = () => Register;

type InstructionProgress = {
  cyclesToRun: number;
  getRegister: RegisterUpdater;
};
const runInstruction = (
  instruction: Instruction,
  register: Register
): InstructionProgress => {
  if (instruction.type === 'NOOP') {
    return {
      cyclesToRun: 1,
      getRegister: () => noop(register),
    };
  } else if (instruction.type === 'ADD_X') {
    return {
      cyclesToRun: 2,
      getRegister: () => addX(register, instruction.value),
    };
  } else {
    throw new Error('');
  }
};

const getSignalStrength = (intructions: Instruction[]): number => {
  let register: Register = { x: 1 };
  let cycle = 0;
  const signalStrengths: number[] = [];

  for (const instruction of intructions) {
    const instructionProgress = runInstruction(instruction, register);

    for (let i = 0; i < instructionProgress.cyclesToRun; i++) {
      cycle++;
      if ((cycle - 20) % 40 === 0) {
        signalStrengths.push(cycle * register.x);
      }
    }
    register = instructionProgress.getRegister();
  }
  return signalStrengths.reduce((acc, cur) => acc + cur, 0);
};

const drawScreen = (intructions: Instruction[]): string => {
  let register: Register = { x: 1 };
  let cycle = 0;
  let screen = '';

  for (const instruction of intructions) {
    const instructionProgress = runInstruction(instruction, register);

    for (let i = 0; i < instructionProgress.cyclesToRun; i++) {
      if (cycle % 40 === 0) {
        screen += '\n';
      }
      cycle++;
      const pixelToDraw = cycle % 40

      if (register.x - 1 <= pixelToDraw-1 && pixelToDraw-1 <= register.x + 1) {
        screen += '#';
      } else {
        screen += '.';
      }
    }
    register = instructionProgress.getRegister();
  }
  return screen;
};

export const solveD10P1 = (lines: string[]): string => {
  const instructions = toInstructions(lines);
  return getSignalStrength(instructions).toString();
};

export const solveD10P2 = (lines: string[]): string => {
  const instructions = toInstructions(lines);
  return drawScreen(instructions);
};
