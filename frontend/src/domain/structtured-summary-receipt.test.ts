import { describe, expect, it } from "vitest";
import { extractNumber } from "./structured-summary-receipt";

describe("extractNumber", () => {
  it("returns int number", () => {
    const res = extractNumber("Subtotal Pick Records: 176");
    expect(res).toBe(176);
  });

  it("returns float number", () => {
    const res = extractNumber("Subtotal Pick Records: 176.1");
    expect(res).toBe(176.1);
  });
  it("returns undefined when there is no numbers", () => {
    const res = extractNumber("Subtotal Pick Records: aa");
    expect(res).toBe(undefined);
  });
});
