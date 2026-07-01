import { pick, finalizeChoices } from "@/lib/utils";

export default function mostMoney() {
  const totalCoins = pick([7, 8, 9, 10]);
  const maxEach = pick([2, 3, 4]);

  let bestValue = -1;

  // At least one of each coin type
  for (let p = 1; p <= maxEach; p++) {
    for (let n = 1; n <= maxEach; n++) {
      for (let d = 1; d <= maxEach; d++) {
        for (let q = 1; q <= maxEach; q++) {
          if (p + n + d + q !== totalCoins) continue;

          const value = p + 5 * n + 10 * d + 25 * q;

          if (value > bestValue) {
            bestValue = value;
          }
        }
      }
    }
  }

  const correct = `$${(bestValue / 100).toFixed(2)}`;

  const wrong = [
    `$${((bestValue - pick([4, 5, 10])) / 100).toFixed(2)}`,
    `$${((bestValue - pick([14, 15])) / 100).toFixed(2)}`,
    `$${((bestValue + pick([2, 4, 6])) / 100).toFixed(2)}`,
  ].filter((v, i, arr) => v !== correct && arr.indexOf(v) === i);

  return {
    prompt: `Taylor has ${totalCoins} coins in a pocket. The coins are a mixture of pennies, nickels, dimes, and quarters, with at least one of each type of coin. Taylor has no more than ${maxEach} of any one type of coin. What is the largest amount of money Taylor could possibly have?`,
    choices: finalizeChoices(correct, wrong),
  };
}