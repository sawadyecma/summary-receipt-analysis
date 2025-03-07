import { composeSummaryReceipt } from "../domain/summary-receipt";
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

    const normalizedDom = normalized.body
      .map((section) => {
        const joined = section.body.join("<br/>");
        console.log({ joined });
        return `<p>${joined}</p>`;
      })
      .join("");

    resultEle.innerHTML = plain + normalizedDom;
    result;
  });

  inputEle.addEventListener("change", fileChangeHandler);
};
