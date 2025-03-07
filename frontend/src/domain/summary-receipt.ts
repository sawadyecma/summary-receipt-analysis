import { Line, Lines } from "../pdf-parser/lines";

export type SummaryReceipt = {
  body: (SectionHeader | Session | Break | Total)[];
};

export const SESSION_TYPE = {
  header: "header",
  session: "session",
  break: "break",
  totals: "totals",
} as const;

type SessionType = (typeof SESSION_TYPE)[keyof typeof SESSION_TYPE];

type SectionHeader = {
  sectionType: typeof SESSION_TYPE.header;
  body: string[];
};

type Session = {
  sectionType: typeof SESSION_TYPE.session;
  body: string[];
};

type Break = {
  sectionType: typeof SESSION_TYPE.break;
  // breakType: "paid-break" | "unpaid-break";
  body: string[];
};

type Total = {
  sectionType: typeof SESSION_TYPE.totals;
  body: string[];
};

const lineJudger = () => {
  const treatAsTitle = (line: Line): string => {
    const joined = line.body.join("").trim();
    return joined;
  };

  const isSessionTitle = (line: Line): boolean => {
    return treatAsTitle(line) === "Session";
  };

  const isBreakTitle = (line: Line): boolean => {
    return treatAsTitle(line) === "Break";
  };
  const isTotalTitle = (line: Line): boolean => {
    return treatAsTitle(line) === "Totals";
  };

  const isBeginningOfSection = (line: Line) => {
    return isBreakTitle(line) || isSessionTitle(line) || isTotalTitle(line);
  };

  return { isSessionTitle, isBreakTitle, isBeginningOfSection, isTotalTitle };
};

export const composeSummaryReceipt = (lines: Lines): SummaryReceipt => {
  const { isSessionTitle, isBreakTitle, isBeginningOfSection, isTotalTitle } =
    lineJudger();

  const ret: SummaryReceipt = {
    body: [],
  };
  const header: SectionHeader = {
    sectionType: "header",
    body: [],
  };

  let nextSectionType: SessionType = SESSION_TYPE.header;

  let currentSection: SummaryReceipt["body"][number] = header;

  lines.forEach((line, index, arr) => {
    currentSection.body.push(line.body.join(""));

    const nextIndex = index + 1;
    const nextLine = nextIndex >= lines.length ? undefined : arr[nextIndex];
    if (!nextLine) {
      ret.body.push(currentSection);

      return;
    }

    if (isBeginningOfSection(nextLine)) {
      // update currentSection
      // push currentSection
      // make next section with empty
      if (isSessionTitle(nextLine)) {
        nextSectionType = SESSION_TYPE.session;
      } else if (isBreakTitle(nextLine)) {
        nextSectionType = SESSION_TYPE.break;
      } else if (isTotalTitle(nextLine)) {
        nextSectionType = SESSION_TYPE.totals;
      }
      ret.body.push(currentSection);
      const emptyBody: string[] = [];

      currentSection = {
        sectionType: nextSectionType,
        body: emptyBody,
      };
    }
  });

  return ret;
};
