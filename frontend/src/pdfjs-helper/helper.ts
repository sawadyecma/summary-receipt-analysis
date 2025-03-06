import { TextContent, TextItem } from "pdfjs-dist/types/src/display/api";

export type TextItemsFromTextContent = TextContent["items"];

export const isTextItem = (
  textItem: TextItemsFromTextContent[number]
): textItem is TextItem => {
  return textItem.hasOwnProperty("str");
};
