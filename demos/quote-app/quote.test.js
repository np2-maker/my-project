import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { getRandomQuote } from './quote.js';

const KNOWN_QUOTES = [
  "The journey of a thousand miles begins with one step.",
  "Done is better than perfect.",
  "Small steps every day.",
  "Start before you're ready.",
  "Progress, not perfection."
];

describe('getRandomQuote', () => {
  it('returns a string', () => {
    const result = getRandomQuote();
    assert.equal(typeof result, 'string');
  });

  it('returned string is one of the 5 known quotes', () => {
    const result = getRandomQuote();
    assert.ok(
      KNOWN_QUOTES.includes(result),
      `Expected one of the known quotes but got: "${result}"`
    );
  });

  it('multiple calls all produce results from the known set', () => {
    for (let i = 0; i < 20; i++) {
      const result = getRandomQuote();
      assert.ok(
        KNOWN_QUOTES.includes(result),
        `Call ${i + 1}: unexpected value "${result}"`
      );
    }
  });

  it('returns a non-empty string', () => {
    const result = getRandomQuote();
    assert.ok(result.length > 0, 'Expected a non-empty string');
  });

  it('is deterministic when Math.random is seeded to return 0', () => {
    const original = Math.random;
    Math.random = () => 0;
    try {
      const result = getRandomQuote();
      assert.equal(result, KNOWN_QUOTES[0]);
    } finally {
      Math.random = original;
    }
  });

  it('is deterministic when Math.random is seeded to return just below 1', () => {
    const original = Math.random;
    // 0.999... * 5 floors to 4 → last quote
    Math.random = () => 0.9999;
    try {
      const result = getRandomQuote();
      assert.equal(result, KNOWN_QUOTES[4]);
    } finally {
      Math.random = original;
    }
  });

  it('covers the middle index when Math.random returns 0.5', () => {
    const original = Math.random;
    // 0.5 * 5 = 2.5 → floors to 2 → index 2
    Math.random = () => 0.5;
    try {
      const result = getRandomQuote();
      assert.equal(result, KNOWN_QUOTES[2]);
    } finally {
      Math.random = original;
    }
  });
});
