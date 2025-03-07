import { describe, expect, test } from "vitest";
import { Lines } from "../pdf-parser/lines";
import { composeSummaryReceipt } from "./summary-receipt";

const testData: { lines: Lines } = {
  lines: [
    {
      body: ["Name:", " ", "Bubbles,", " ", "Jackson"],
    },
    {
      body: ["Employee", " ", "ID:", " ", "126167"],
    },
    {
      body: ["Pick", " ", "Date:", " ", "11/02/2025"],
    },
    {
      body: ["Start", " ", "Time:", " ", "11/02/2025", " ", "06:30"],
    },
    {
      body: ["End", " ", "Time:", " ", "11/02/2025", " ", "12:02"],
    },
    {
      body: ["Attendance", " ", "Hrs:", " ", "5.53", ""],
    },
    {
      body: ["Session", ""],
    },
    {
      body: ["Location:", " ", "[Bengeo]608"],
    },
    {
      body: ["Variety:", " ", "Victoria"],
    },
    {
      body: ["Pay", " ", "Type:", " ", "Per", " ", "Unit"],
    },
    {
      body: ["Unit:", " ", "125g", " ", "Driscoll's"],
    },
    {
      body: ["Piece", " ", "Rate:", " ", "0.71"],
    },
    {
      body: ["Target", " ", "Pick", " ", "Rate:", " ", "48.00"],
    },
    {
      body: [
        "Session",
        " ",
        "Start",
        " ",
        "Time:",
        " ",
        "11/02/2025",
        " ",
        "06:30",
      ],
    },
    {
      body: [
        "Session",
        " ",
        "End",
        " ",
        "Time:",
        " ",
        "11/02/2025",
        " ",
        "09:11",
      ],
    },
    {
      body: ["Session", " ", "Hrs:", " ", "2.68"],
    },
    {
      body: ["Role:", " ", "Picker"],
    },
    {
      body: ["Individual", " ", "Pick", " ", "Records"],
    },
    {
      body: ["07:13", " ", "38.00"],
    },
    {
      body: ["07:49", " ", "40.00"],
    },
    {
      body: ["08:30", " ", "42.00"],
    },
    {
      body: ["08:53", " ", "16.00"],
    },
    {
      body: ["No.", " ", "of", " ", "Pick", " ", "Records:", " ", "4"],
    },
    {
      body: ["Subtotal", " ", "Pick", " ", "Records:", " ", "136.0"],
    },
    {
      body: ["Actual", " ", "Pick", " ", "Rate:", " ", "50.75", ""],
    },
    {
      body: ["Break", ""],
    },
    {
      body: ["Break", " ", "Type:", " ", "Paid", " ", "Break"],
    },
    {
      body: ["Start", " ", "Time:", " ", "11/02/2025", " ", "09:11"],
    },
    {
      body: ["End", " ", "Time:", " ", "11/02/2025", " ", "09:26"],
    },
    {
      body: ["Break", " ", "Hrs:", " ", "0.25", ""],
    },
    {
      body: ["Session", ""],
    },
    {
      body: ["Location:", " ", "[Bengeo]609"],
    },
    {
      body: ["Variety:", " ", "Victoria"],
    },
    {
      body: ["Pay", " ", "Type:", " ", "Per", " ", "Unit"],
    },
    {
      body: ["Unit:", " ", "125g", " ", "Driscoll's"],
    },
    {
      body: ["Piece", " ", "Rate:", " ", "0.71"],
    },
    {
      body: ["Target", " ", "Pick", " ", "Rate:", " ", "48.00"],
    },
    {
      body: [
        "Session",
        " ",
        "Start",
        " ",
        "Time:",
        " ",
        "11/02/2025",
        " ",
        "09:26",
      ],
    },
    {
      body: [
        "Session",
        " ",
        "End",
        " ",
        "Time:",
        " ",
        "11/02/2025",
        " ",
        "12:00",
      ],
    },
    {
      body: ["Session", " ", "Hrs:", " ", "2.57"],
    },
    {
      body: ["Role:", " ", "Picker"],
    },
    {
      body: ["Individual", " ", "Pick", " ", "Records"],
    },
    {
      body: ["09:50", " ", "39.00"],
    },
    {
      body: ["10:20", " ", "38.00"],
    },
    {
      body: ["10:52", " ", "40.00"],
    },
    {
      body: ["11:29", " ", "39.00"],
    },
    {
      body: ["11:54", " ", "20.00"],
    },
    {
      body: ["No.", " ", "of", " ", "Pick", " ", "Records:", " ", "5"],
    },
    {
      body: ["Subtotal", " ", "Pick", " ", "Records:", " ", "176.0"],
    },
    {
      body: ["Actual", " ", "Pick", " ", "Rate:", " ", "68.48", ""],
    },
    {
      body: ["Totals", ""],
    },
    {
      body: [
        "Total",
        " ",
        "Pick",
        " ",
        "Records",
        " ",
        "by",
        " ",
        "-",
        " ",
        "125g",
        " ",
        "Driscoll's:",
        " ",
        "312.00",
      ],
    },
    {
      body: ["Total", " ", "Session", " ", "Hrs:", " ", "5.25"],
    },
    {
      body: ["Total", " ", "Picker", " ", "Hrs:", " ", "5.25"],
    },
    {
      body: ["Total", " ", "Paid", " ", "Break", " ", "Hrs:", " ", "0.25"],
    },
    {
      body: ["Total", " ", "Paid", " ", "Hrs:", " ", "5.50"],
    },
    {
      body: ["Avg", " ", "Pick", " ", "Rate:", " ", "59.61"],
    },
    {
      body: ["Supervisor:", " ", "Michael,", " ", "Jackson"],
    },
  ],
};

describe("normalize lines", () => {
  test("case1", () => {
    expect(composeSummaryReceipt(testData.lines)).toMatchSnapshot();
  });
});
