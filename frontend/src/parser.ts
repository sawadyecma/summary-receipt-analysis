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

  const isPdf = PDFJS.isPdfFile(file);

  const arrayBuffer = await file.arrayBuffer();
  const doc = PDFJS.getDocument(arrayBuffer);
  const pdf = await doc.promise;

  // NOTE: The first page is 1
  const page = await pdf.getPage(1);
  console.log({ page });

  const tree = await page.getStructTree();
  console.log({ tree });

  const text = await page.getTextContent();
  console.log({ text });

  console.log({ isPdf });
};

export const setupSummaryReceiptParser = (element: HTMLInputElement) => {
  element.addEventListener("change", fileChangeHandler);
};
