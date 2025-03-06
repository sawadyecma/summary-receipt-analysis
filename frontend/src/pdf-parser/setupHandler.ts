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

    resultEle.innerHTML = `
      ${plain}
    <div>
    ${lines
      .map((line) => {
        const joined = line.body.join("");
        console.log({ joined });
        return `<p>${joined}</p>`;
      })
      .join("")}
    </div>
    `;
    result;
  });

  inputEle.addEventListener("change", fileChangeHandler);
};
