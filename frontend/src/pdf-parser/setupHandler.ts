import { composeSummaryReceipt, SECTION_TYPE } from "../domain/summary-receipt";
import { composeFileChangeHandler } from "./parser";

export const setupSummaryReceiptParser = (
  inputEle: HTMLInputElement,
  resultEle: HTMLElement
) => {
  const { fileChangeHandler } = composeFileChangeHandler((result, lines) => {
    const normalized = composeSummaryReceipt(lines);

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

    resultEle.innerHTML = normalizedDom;
    result;
  });

  inputEle.addEventListener("change", fileChangeHandler);
};
