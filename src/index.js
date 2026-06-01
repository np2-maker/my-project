/**
 * Adds two numbers. Accepts only finite numbers — rejects NaN, ±Infinity,
 * strings, and other non-numeric types. Number.isFinite is used (rather than
 * typeof) because it catches all of those invalid cases in a single check.
 */
export function addNumbers(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError(
      `addNumbers expects two finite numbers, got: ${a}, ${b}`,
    );
  }
  return a + b;
}
