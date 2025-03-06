import { isTextItem, TextItemsFromTextContent } from "../pdfjs-helper/helper";

export type Lines = Line[];

export type Line = {
  body: string[];
};

export const composeLinesFromTextItems = (
  items: TextItemsFromTextContent
): Lines => {
  let tempLine: string[] = [];
  let ret: Lines = [];
  items.forEach((item) => {
    if (isTextItem(item)) {
      tempLine.push(item.str);

      if (item.hasEOL) {
        tempLine = [];
        ret.push({
          body: tempLine,
        });
      }
    }
  });
  return ret;
};
