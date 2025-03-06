import { setupCounter } from "./counter.ts";
import { setupSummaryReceiptParser } from "./parser.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
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

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
setupSummaryReceiptParser(
  document.querySelector<HTMLInputElement>("#summary-receipt")!,
  document.querySelector<HTMLDivElement>("#parsed-result")!
);
