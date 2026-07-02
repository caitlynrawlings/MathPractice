import { pick, finalizeChoices, shuffle } from "@/lib/utils";

export default function genCardProbability() {
  const ranks = [
    "A", "2", "3", "4", "5", "6",
    "7", "8", "9", "10", "J", "Q", "K",
  ];

  const target = pick(ranks);
  const replacement = pick([true, false]);

  // Simulate previous draws
  const draws = Array.from({ length: 10 }, () => pick(ranks));

  const occurrences = draws.filter((c) => c === target).length;

  // ----- Correct answer -----
  // Whether or not the previous cards were replaced, the probability
  // of drawing a given rank from a full deck is still 4/52 = 1/13,
  // since the deck is restored before the next draw.
  const correct = "1/13";

  // ----- Build realistic wrong answers -----
  const wrongPool = [
    `${Math.max(occurrences, 1)}/10`,                 // experimental probability
    `${Math.max(occurrences, 1)}/13`,                 // wrong denominator
    `${Math.max(occurrences, 1)}/52`,                 // denominator confusion
    `${Math.max(occurrences - 1, 0)}/10`,
    `${occurrences + 1}/10`,
    "1/52",                              // confuses rank with exact card
    "1/4",
    "3/10",
    "3/8",
    "1/10",
    "1/12",
    "4/51",
    "4/48",
  ];

  // Remove duplicates and the correct answer
  const wrong = [...new Set(wrongPool)].filter((x) => x !== correct);

  return {
    prompt: `
Rick drew cards from a standard deck.

After each draw, the card was ${
      replacement
        ? "replaced and the deck was shuffled"
        : "not replaced"
    }.

His draws were:

${draws.join(", ")}

What is the probability that the next card drawn will be a ${target}?
    `.trim(),

    choices: finalizeChoices(correct, shuffle(wrong).slice(0,3)),
  };
}