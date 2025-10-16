import { getDates, getCommemorativeDatesForYear } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
import assert from "node:assert";
import test, { describe } from "node:test";

describe("getDates()", () => {
  test("second Tuesday of October 2024 is 8", () => {
    const day = getDates(2024, 10, "tuesday", "second");
    assert.ok(day instanceof Date);
    assert.strictEqual(day.getFullYear(), 2024);
    assert.strictEqual(day.getMonth(), 9);
    assert.strictEqual(day.getDate(), 8);
  });
  test("last Saturday of February 2020 is 29", () => {
    const day = getDates(2020, 2, "saturday", "last");
    assert.strictEqual(day.getDate(), 29);
  });
});

describe("Invalid names and input values",()=>{
  test("should return undefined for an invalid day name",()=>{
    assert.strictEqual(getDates(2025,5,"Thuriday","second"),undefined);
  });
  test("should return undefined for an invalid occurrence name",()=>{
    assert.strictEqual(getDates(2025,5,"thursday","sixth"),undefined);
  });
});

describe("Input case sensitivity", () => {
  test("should work correctly with mixed case input", () => {
    const result = getDates(2025, 5, "Monday", "First");
    assert.ok(result instanceof Date);
  });
});

describe("getCommemorativeDatesForYear()", () => {
  test("Ada Lovelace Day on correct dates", () => {
    const y2024 = getCommemorativeDatesForYear(2024, daysData);
    assert.strictEqual(y2024["2024-10-08"], "Ada Lovelace Day");

    const y2025 = getCommemorativeDatesForYear(2025, daysData);
    assert.strictEqual(y2025["2025-10-14"], "Ada Lovelace Day");
  });

    test("International Binturong Day on correct dates",()=>{
      const y2026=getCommemorativeDatesForYear(2026,daysData);
      assert.strictEqual(y2026["2026-05-09"],"International Binturong Day");
  });
});
