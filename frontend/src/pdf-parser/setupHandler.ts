import { SECTION_TYPE } from "../domain/section-type";
import { composeSummaryReceipt } from "../domain/summary-receipt";
import { composeFileChangeHandler } from "./parser";
import { composeStructuredSummaryReceipt } from "../domain/structured-summary-receipt";
import { composeAnalyzedReport } from "../domain/analyzed-report";

const MIMIMUM_WAGE = 29.52;

export const setupSummaryReceiptParser = (
  inputEle: HTMLInputElement,
  resultEle: HTMLElement
) => {
  const { fileChangeHandler } = composeFileChangeHandler((result, lines) => {
    const normalized = composeSummaryReceipt(lines);

    const structured = composeStructuredSummaryReceipt(normalized);
    console.log({ structured });

    const analyzed = composeAnalyzedReport(structured, MIMIMUM_WAGE);

    const sectionColor = {
      [SECTION_TYPE.header]: "#D1603D",
      [SECTION_TYPE.session]: "#D0E37F",
      [SECTION_TYPE.break]: "#DDB967",
      [SECTION_TYPE.totals]: "#D1603D",
    } as const;

    const normalizedDom = normalized.body
      .map((section) => {
        const joined = section.body.join("<br/>");

        const color = sectionColor[section.sectionType];

        const style = `
          border: solid 2px ${color};
          padding: 8px 16px 4px;
        `;

        return `<p style='${style}' >${joined}</p>`;
      })
      .join("");

    const analyzedDom = `
    <p 
      style='
        padding: 8px 16px 4px;
        border: solid 2px ${sectionColor[SECTION_TYPE.totals]};
      '
      >
    ${Object.entries(analyzed)
      .map((item) => {
        return `${item[0]}: ${item[1]}`;
      })
      .join("<br/>")}
    </p>`;

    resultEle.innerHTML = analyzedDom + normalizedDom;
    result;
  });

  inputEle.addEventListener("change", fileChangeHandler);
};
