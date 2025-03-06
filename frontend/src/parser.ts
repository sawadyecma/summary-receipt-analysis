const fileChangeHandler = (ev: HTMLElementEventMap["change"]) => {
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
};

export const setupSummaryReceiptParser = (element: HTMLInputElement) => {
  element.addEventListener("change", fileChangeHandler);
};
