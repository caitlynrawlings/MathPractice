import { pick, randInt, numericChoices } from "@/lib/utils";

export default function genMultiplication() {
  const a = randInt(12, 45);
  const b = randInt(4, 25);
  const pair = pick([
    ["boxes of crayons", "crayons"],
    ["rows of desks", "desks"],
    ["packs of stickers", "stickers"],
    ["bags of marbles", "marbles"],
    ["shelves of books", "books"],
  ]);
  const correct = a * b;

  return {
    prompt: `A teacher orders ${a} ${pair[0]}, with ${b} ${pair[1]} in each. How many ${pair[1]} did she order in total?`,
    choices: numericChoices(
      correct,
      [a + b, correct + a, correct - b, a * (b - 1)],
      (n) => `${n} ${pair[1]}`,
      Math.max(2, Math.round(correct * 0.1))
    ),
  };
}
