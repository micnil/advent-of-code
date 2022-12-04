type Interval = {
  from: number;
  to: number;
};

type SectionPair = {
  sectionA: Interval;
  sectionB: Interval;
};

const toSectionInterval = (interval: string): Interval => {
  const sections = interval.split('-');
  return {
    from: parseInt(sections[0]),
    to: parseInt(sections[1]),
  };
};

const toSectionPair = (line: string): SectionPair => {
  const sectionStrings = line.split(',');
  return {
    sectionA: toSectionInterval(sectionStrings[0]),
    sectionB: toSectionInterval(sectionStrings[1]),
  };
};

const numWithinInclusive = (num: number, from: number, to: number): boolean => {
  return from <= num && num <= to
}

const intervalAContainsB = (intervalA: Interval, interval: Interval): boolean => {
  return numWithinInclusive(intervalA.from, interval.from, interval.to) && numWithinInclusive(intervalA.to, interval.from, interval.to)
}

const intervalAOverlapsB = (intervalA: Interval, interval: Interval): boolean => {
  return numWithinInclusive(intervalA.from, interval.from, interval.to) || numWithinInclusive(intervalA.to, interval.from, interval.to)
}

const sectionsContains = ({sectionA, sectionB}: SectionPair): boolean => {
  return intervalAContainsB(sectionA, sectionB) || intervalAContainsB(sectionB, sectionA)
}

const sectionsOverlap = ({sectionA, sectionB}: SectionPair): boolean => {
  return intervalAOverlapsB(sectionA, sectionB) || intervalAOverlapsB(sectionB, sectionA)
}

export const solveD4P1 = (lines: string[]): string => {
  const sectionPairs = lines.map(toSectionPair);
  const containingPairs = sectionPairs.filter(sectionsContains);
  return containingPairs.length.toString();
};

export const solveD4P2 = (lines: string[]): string => {
  const sectionPairs = lines.map(toSectionPair);
  const containingPairs = sectionPairs.filter(sectionsOverlap);
  return containingPairs.length.toString();
};
