import { SECTION_TYPE } from "./section-type";
import { SummaryReceipt } from "./summary-receipt";
import { Option } from "../util/basic-type";

type StructuredSummaryReceipt = {
  sections: Section[];
};

const PAY_TYPE = {
  perUnit: "perUnit",
  perHour: "perHour",
} as const;

type PayType = (typeof PAY_TYPE)[keyof typeof PAY_TYPE];

type Section = {
  startTime: Date;
  endTime: Date;
} & (
  | ({
      kind: typeof SECTION_TYPE.session;
    } & (
      | {
          payType: typeof PAY_TYPE.perUnit;
          subtotalPickRecords: number;
        }
      | {
          payType: typeof PAY_TYPE.perHour;
        }
    ))
  | {
      kind: typeof SECTION_TYPE.break;
    }
);

const isSubtotalItem = (item: string) => {
  return (
    item.includes("Subtotal") &&
    item.includes("Pick") &&
    item.includes("Records")
  );
};

const isPayType = (item: string) => {
  return item.includes("Pay") && item.includes("Type");
};

const payTypeRegex = {
  perUnit: /Per\w+Unit/,
  perHour: /Per\w+Hour/,
} as const;

const extractPayType = (arg: string): Option<PayType> => {
  {
    const res = payTypeRegex.perUnit.exec(arg);
    if (res) return PAY_TYPE.perUnit;
  }

  {
    const res = payTypeRegex.perHour.exec(arg);
    if (res) return PAY_TYPE.perHour;
  }

  return undefined;
};

const numberRegex = /\d+(\.\d+)*/;

export const extractNumber = (arg: string): Option<number> => {
  const res = numberRegex.exec(arg);

  if (!res) return undefined;

  return parseFloat(res[0]);
};

const convertSectionStructured = (
  arg: SummaryReceipt["body"][number]
): Section | undefined => {
  if (
    arg.sectionType === SECTION_TYPE.header ||
    arg.sectionType === SECTION_TYPE.totals
  ) {
    return undefined;
  }

  if (arg.sectionType === SECTION_TYPE.session) {
    let subtotalPickRecords: number = 0;
    let payType: PayType = PAY_TYPE.perUnit;

    arg.body.forEach((item) => {
      if (isSubtotalItem(item)) {
        const extracted = extractNumber(item);
        if (!extracted) return;
        subtotalPickRecords = extracted;
        return;
      }

      if (isPayType(item)) {
        const extracted = extractPayType(item);
        if (!extracted) return;
        payType = extracted;
      }
    });

    return {
      kind: SECTION_TYPE.session,
      subtotalPickRecords,
      payType,
      startTime: new Date(),
      endTime: new Date(),
    };
  }
  if (arg.sectionType === SECTION_TYPE.break) {
    return {
      kind: SECTION_TYPE.break,
      startTime: new Date(),
      endTime: new Date(),
    };
  }
};

export const composeStructuredSummaryReceipt = (
  arg: SummaryReceipt
): StructuredSummaryReceipt => {
  const sections = arg.body.map((section) => {
    return convertSectionStructured(section);
  });

  const filtered = sections.filter((sec): sec is Section => Boolean(sec));
  return {
    sections: filtered,
  };
};
