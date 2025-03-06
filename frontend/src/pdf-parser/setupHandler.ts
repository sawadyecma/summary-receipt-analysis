import { composeFileChangeHandler } from "./parser";

export const setupSummaryReceiptParser = (
  inputEle: HTMLInputElement,
  resultEle: HTMLElement
) => {
  const { fileChangeHandler } = composeFileChangeHandler((result) => {
    resultEle.innerHTML = `
    <p
      style="border: solid 2px black;"
    >
      ${result}
    </p>`;
    result;
  });

  inputEle.addEventListener("change", fileChangeHandler);
};
