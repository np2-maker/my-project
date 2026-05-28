const QUOTES = [
  "The journey of a thousand miles begins with one step.",
  "Done is better than perfect.",
  "Small steps every day.",
  "Start before you're ready.",
  "Progress, not perfection."
];

export function getRandomQuote() {
  const index = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[index];
}
