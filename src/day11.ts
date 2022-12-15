type Operation = () => void;
type Operators = '*' | '+';
type Throw = (worryLevel: number) => number;
type Monkey = {
  id: number;
  items: number[];
  inspectCount(): number;
  getHolding(): number;
  hasItems(): boolean;
  inspect: Operation;
  throw: Throw;
};

const chunkBy = function* <T>(list: T[], predicate: (elem: T) => boolean) {
  let chunk: T[] = [];
  for (const element of list) {
    if (predicate(element)) {
      yield chunk;
      chunk = [];
    } else {
      chunk.push(element);
    }
  }
  yield chunk;
};

const toOperator = (operatorStr: string): Operators => {
  switch (operatorStr) {
    case '+':
      return '+';
    case '*':
      return '*';
    default:
      throw new Error(`Invalid operator: ${operatorStr}`);
  }
};

const toMonkey = (lines: string[]): Monkey => {
  const idStr = lines[0].match(/([0-9]+)/)?.[0];
  const startingItemsRow =
    lines[1].match(/([0-9]+)/g)?.map((numberStr) => parseInt(numberStr)) ?? [];
  const operationRow = lines[2].match(/old (?<operator>.) (?<number>.*)/);
  const operatorStr = operationRow?.groups?.operator;
  const operatorNumberStr = operationRow?.groups?.number;
  const testRow = lines[3].match(/divisible by (?<number>[0-9]+)/);
  const divideNumberStr = testRow?.groups?.number;
  const trueRow = lines[4].match(/([0-9]+)/)?.[0];
  const falseRow = lines[5].match(/([0-9]+)/)?.[0];

  if (
    idStr &&
    operatorStr &&
    operatorNumberStr &&
    divideNumberStr &&
    trueRow &&
    falseRow
  ) {
    const id = parseInt(idStr);
    const operator = toOperator(operatorStr);
    const operatorNumber =
      operatorNumberStr === 'old' ? 'old' : parseInt(operatorNumberStr);
    const divideNumber = parseInt(divideNumberStr);
    const monkeyIdWhenTrue = parseInt(trueRow);
    const monkeyIdWhenFalse = parseInt(falseRow);
    const items = [...startingItemsRow];
    let inspecting = 0;
    let inspectCount = 0;
    return {
      id,
      hasItems: () => !!items.length,
      inspect: () => {
        inspectCount++;
        inspecting = items.shift() ?? 0;
        if (operator === '*') {
          inspecting =
            inspecting *
            (operatorNumber === 'old' ? inspecting : operatorNumber);
        } else {
          inspecting =
            inspecting +
            (operatorNumber === 'old' ? inspecting : operatorNumber);
        }
      },
      inspectCount: () => inspectCount,
      getHolding: () => inspecting,
      items,
      throw: (worryLevel: number) => {
        inspecting = Math.floor(inspecting / worryLevel);
        if (inspecting % divideNumber === 0) {
          return monkeyIdWhenTrue;
        } else {
          return monkeyIdWhenFalse;
        }
      },
    };
  } else {
    idStr &&
      operatorStr &&
      operatorNumberStr &&
      divideNumberStr &&
      trueRow &&
      falseRow;
    console.error({
      idStr,
      operatorStr,
      operatorNumberStr,
      divideNumberStr,
      trueRow,
      falseRow,
    });
    throw new Error(`Failed to parse: ${JSON.stringify(lines, null, 2)}`);
  }
};

const toMonkeys = (lines: string[]): Monkey[] => {
  return [...chunkBy(lines, (line) => line === '')].map(toMonkey);
};

export const solveD11P1 = (lines: string[]): string => {
  const monkeys = toMonkeys(lines);
  for (let i = 0; i < monkeys.length * 20; i++) {
    const monkey = monkeys[i % monkeys.length];
    while (monkey.hasItems()) {
      monkey.inspect();
      const id = monkey.throw(3);
      const monkeyCatch = monkeys.find((monkey) => monkey.id === id);
      monkeyCatch?.items.push(monkey.getHolding());
    }
  }

  monkeys.sort(
    (monkey1, monkey2) => monkey2.inspectCount() - monkey1.inspectCount()
  );
  const monkeyBusiness = monkeys[0].inspectCount() * monkeys[1].inspectCount();
  return monkeyBusiness.toString();
};

export const solveD11P2 = (lines: string[]): string => {
  const monkeys = toMonkeys(lines);
  for (let i = 0; i < monkeys.length * 10000; i++) {
    const monkey = monkeys[i % monkeys.length];
    while (monkey.hasItems()) {
      monkey.inspect();
      const id = monkey.throw(1);
      const monkeyCatch = monkeys.find((monkey) => monkey.id === id);
      monkeyCatch?.items.push(monkey.getHolding());
    }
  }

  monkeys.sort(
    (monkey1, monkey2) => monkey2.inspectCount() - monkey1.inspectCount()
  );
  const monkeyBusiness = monkeys[0].inspectCount() * monkeys[1].inspectCount();
  // Incorrect: 14495316750
  // Need to handle large number math?
  return monkeyBusiness.toString();
};
