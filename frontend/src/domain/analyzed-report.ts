import { SECTION_TYPE } from "./section-type";
import {
  BREAK_TYPE,
  PAY_TYPE,
  StructuredSummaryReceipt,
} from "./structured-summary-receipt";
import { differenceInMinutes } from "date-fns";

export type AnalyzedReport = {
  sessionMins: number;
  paidBreakMins: number;
  unpaidBreakMins: number;
  sessionIncome: number;
};

export const composeAnalyzedReport = (
  { sections }: StructuredSummaryReceipt,
  minimumWagePerHour: number
): AnalyzedReport => {
  const tmp: AnalyzedReport = {
    sessionMins: 0,
    paidBreakMins: 0,
    unpaidBreakMins: 0,
    sessionIncome: 0,
  };

  sections.forEach((section) => {
    const diff = differenceInMinutes(section.endTime, section.startTime);
    switch (section.kind) {
      case SECTION_TYPE.break: {
        switch (section.breakType) {
          case BREAK_TYPE.paidBreak: {
            tmp.paidBreakMins += diff;
            break;
          }
          case BREAK_TYPE.unpaidBreak: {
            tmp.unpaidBreakMins += diff;
            break;
          }
          case BREAK_TYPE.move: {
            tmp.paidBreakMins += diff;
            break;
          }
        }
        break;
      }
      case SECTION_TYPE.session: {
        tmp.sessionMins += diff;
        if (section.payType === PAY_TYPE.perHour) {
          tmp.sessionIncome += diff * (minimumWagePerHour / 60);
          return;
        }
        if (section.payType === PAY_TYPE.perUnit) {
          tmp.sessionIncome += section.subtotalPickRecords * section.pieceRate;
          return;
        }
        return;
      }
      default: {
        break;
      }
    }
  });

  return tmp;
};
