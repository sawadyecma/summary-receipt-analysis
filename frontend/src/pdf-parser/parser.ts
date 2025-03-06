import * as PDFJS from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

import { isTextItem } from "../pdfjs-helper/helper";
import { composeLinesFromTextItems, Lines } from "./lines";
import { extractOneFileFromEvent } from "../util/dom-util";

PDFJS.GlobalWorkerOptions.workerSrc = pdfWorker;

export const composeFileChangeHandler = (
  callback: (result: string, lines: Lines) => void
) => {
  const fileChangeHandler = async (ev: HTMLElementEventMap["change"]) => {
    const extracted = extractOneFileFromEvent(ev);
    if (extracted.error) {
      alert(extracted.error.message);
      return;
    }

    const file = extracted.result;

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
        if (isTextItem(item)) {
          res += item.str;
        }
      });
      const lines = composeLinesFromTextItems(text.items);
      console.log({ lines });

      callback(res, lines);
    }
  };

  return { fileChangeHandler };
};
