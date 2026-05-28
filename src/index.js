export function addNumbers(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError(
      `addNumbers expects two finite numbers, got: ${a}, ${b}`,
    );
  }
  return a + b;
}
