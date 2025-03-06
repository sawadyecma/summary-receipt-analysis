import { newError, newResult, Result } from "./basic-type";

export type ExtractOneFileFromEvent = (
  ev: HTMLElementEventMap["change"]
) => Result<File>;

export const extractOneFileFromEvent: ExtractOneFileFromEvent = (
  ev
): Result<File> => {
  const tar = ev.currentTarget;

  if (!(tar instanceof HTMLInputElement)) {
    return newError("unexpected error happens");
  }

  const { files } = tar;
  if (!files) {
    return newError("input files are not found");
  }

  const file = files[0];

  console.log(file);

  if (file.type != "application/pdf") {
    return newError("file type must be pdf");
  }

  return newResult(file);
};
