import { setupSummaryReceiptParser } from "./parser.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div>
    <input 
      id="summary-receipt"
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
