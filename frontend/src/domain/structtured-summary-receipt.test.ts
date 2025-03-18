import { describe, expect, it } from "vitest";
import { extractDatetime, extractNumber } from "./structured-summary-receipt";
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

describe("extractDatetime", () => {
  it("returns correct date from a line with texts", () => {
    const arg = "Session End Time: 11/02/2025 09:11";
    const res = extractDatetime(arg);

    expect(res).toEqual(new Date(2025, 1, 11, 9, 11));
  });

  it("returns nothing", () => {
    const arg = "Session End Time: 11/02/2025  09:11";
    const res = extractDatetime(arg);

    expect(res).toEqual(undefined);
  });
});
