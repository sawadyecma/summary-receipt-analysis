import { composeSummaryReceipt, SESSION_TYPE } from "../domain/summary-receipt";
import { composeFileChangeHandler } from "./parser";

export const setupSummaryReceiptParser = (
  inputEle: HTMLInputElement,
  resultEle: HTMLElement
) => {
  const { fileChangeHandler } = composeFileChangeHandler((result, lines) => {
    const plain = `
    <p
      style="border: solid 2px black;"
    >
      ${result}
    </p>`;

    const linesDom = `<div>
    ${lines
      .map((line) => {
        const joined = line.body.join("");
        console.log({ joined });
        return `<p>${joined}</p>`;
      })
      .join("")}
    </div>`;

    const normalized = composeSummaryReceipt(lines);

    const sectionColor = {
      [SESSION_TYPE.header]: "#D1603D",
      [SESSION_TYPE.session]: "#D0E37F",
      [SESSION_TYPE.break]: "#DDB967",
      [SESSION_TYPE.totals]: "#D1603D",
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
