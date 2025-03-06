import * as PDFJS from "pdfjs-dist";

import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorker;

const fileChangeHandler = async (ev: HTMLElementEventMap["change"]) => {
  const tar = ev.currentTarget;

  if (!(tar instanceof HTMLInputElement)) {
    alert("unexpected error happens");
    return;
  }

  const { files } = tar;
  if (!files) {
    alert("input files are not found");
    return;
  }

  const file = files[0];

  console.log(file);

  if (file.type != "application/pdf") {
    alert("file type must be pdf");
    return;
  }

  const arrayBuffer = await file.arrayBuffer();
  const doc = PDFJS.getDocument(arrayBuffer);
  const pdf = await doc.promise;

  const numPages = pdf.numPages;
  console.log({ numPages });

  // NOTE: The first page is 1
  for (let i = 1; i <= numPages; i++) {
    console.log({ i });
    const page = await pdf.getPage(i);
    const tree = await page.getStructTree();
    const text = await page.getTextContent();

    console.log({ page, tree });
    console.log({ text });

    let res = "";
    text.items.forEach((item) => {
      Object.prototype.hasOwnProperty;
      if (item.hasOwnProperty("str")) {
        // @ts-ignore
        res += item.str;
      }
    });
    console.log(res);
  }
};

export const setupSummaryReceiptParser = (element: HTMLInputElement) => {
  element.addEventListener("change", fileChangeHandler);
};
