export const SECTION_TYPE = {
  header: "header",
  session: "session",
  break: "break",
  totals: "totals",
} as const;

export type SectionType = (typeof SECTION_TYPE)[keyof typeof SECTION_TYPE];
