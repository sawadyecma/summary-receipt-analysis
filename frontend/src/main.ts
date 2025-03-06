import { setupSummaryReceiptParser } from "./parser.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div
    >
    <label
    for="summary-receipt"
    >Choose your summary receipt:</label>
    <input 
      id="summary-receipt"
      name="summary-receipt"
      type="file" 
      accept="application/pdf" 
    />
    </div>
    <div id="parsed-result" />
  </div>
`;

setupSummaryReceiptParser(
  document.querySelector<HTMLInputElement>("#summary-receipt")!,
  document.querySelector<HTMLDivElement>("#parsed-result")!
);
