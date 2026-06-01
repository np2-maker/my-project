import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { addNumbers } from "./index.js";

describe("addNumbers", () => {
  it("adds two positive numbers", () => {
    assert.equal(addNumbers(2, 3), 5);
  });

  it("adds negative numbers", () => {
    assert.equal(addNumbers(-4, -6), -10);
  });

  it("adds a positive and a negative number", () => {
    assert.equal(addNumbers(10, -3), 7);
  });

  it("handles zero", () => {
    assert.equal(addNumbers(0, 0), 0);
    assert.equal(addNumbers(5, 0), 5);
  });

  it("adds decimals", () => {
    assert.equal(addNumbers(0.1, 0.2), 0.1 + 0.2);
    assert.equal(addNumbers(1.5, 2.5), 4);
  });

  it("is commutative (a + b equals b + a)", () => {
    assert.equal(addNumbers(7, 9), addNumbers(9, 7));
  });

  const invalidInputs = [
    ["NaN", NaN],
    ["Infinity", Infinity],
    ["-Infinity", -Infinity],
    ["a string", "5"],
    ["null", null],
    ["undefined", undefined],
    ["an object", {}],
    ["a BigInt", 10n],
  ];

  for (const [label, value] of invalidInputs) {
    it(`throws TypeError when the first argument is ${label}`, () => {
      assert.throws(() => addNumbers(value, 1), TypeError);
    });

    it(`throws TypeError when the second argument is ${label}`, () => {
      assert.throws(() => addNumbers(1, value), TypeError);
    });
  }

  it("throws TypeError when both arguments are invalid", () => {
    assert.throws(() => addNumbers(NaN, undefined), TypeError);
  });
});
