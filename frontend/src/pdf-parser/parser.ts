import * as PDFJS from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import { isTextItem } from "../pdfjs-helper/helper";
import { composeLinesFromTextItems, Lines } from "./lines";
import { extractOneFileFromEvent } from "../util/dom-util";
import { TextContent } from "pdfjs-dist/types/src/display/api";

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

    let pageTexts: TextContent[] = [];

    // NOTE: The first page is 1
    for (let i = 1; i <= numPages; i++) {
      console.log({ i });
      const page = await pdf.getPage(i);
      // const tree = await page.getStructTree();
      const text = await page.getTextContent();
      pageTexts.push(text);

      console.log(`${i} has been completed`);
    }

    let res = "";

    const pageLines: Lines = [];
    pageTexts.forEach((text) => {
      text.items.forEach((item) => {
        if (isTextItem(item)) {
          res += item.str;
        }
      });

      const lines = composeLinesFromTextItems(text.items);
      pageLines.push(...lines);
    });

    callback(res, pageLines);
  };

  return { fileChangeHandler };
};
