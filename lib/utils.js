// Small random-number and formatting helpers shared by every question generator.

export const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const pick = (arr) => arr[randInt(0, arr.length - 1)];

export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const money = (n) => `$${Number(n).toFixed(2)}`;

export const pad2 = (n) => String(n).padStart(2, "0");

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Builds a shuffled 4-choice list from a correct label + candidate distractor labels.
 * Dedupes against the correct answer and against each other.
 */
export function finalizeChoices(correctLabel, rawDistractors) {
  const seen = new Set([correctLabel]);
  const distractors = [];
  for (const d of rawDistractors) {
    const label = String(d);
    if (!seen.has(label)) {
      seen.add(label);
      distractors.push(label);
    }
    if (distractors.length === 3) break;
  }
  // Rare fallback so we always end up with 4 unique choices.
  let salt = 1;
  while (distractors.length < 3) {
    const label = `${correctLabel} `.repeat(salt).trim() + "\u200B".repeat(salt);
    if (!seen.has(label)) {
      seen.add(label);
      distractors.push(label);
    }
    salt++;
  }
  return shuffle([
    { text: correctLabel, correct: true },
    ...distractors.map((t) => ({ text: t, correct: false })),
  ]);
}

/**
 * Numeric convenience wrapper: pass likely "student mistake" values plus a
 * format function; guaranteed offset fillers are added automatically.
 */
export function numericChoices(correctNum, mistakes, format = (n) => String(n), step) {
  const s = step ?? Math.max(1, Math.round(Math.abs(correctNum) * 0.1) || 1);
  const raw = [correctNum + s, correctNum - s, correctNum + 2 * s, correctNum - 2 * s, ...mistakes].filter(
    (n) => n !== correctNum
  );
  return finalizeChoices(format(correctNum), raw.map(format));
}
