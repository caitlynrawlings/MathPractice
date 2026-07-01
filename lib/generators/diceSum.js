import { pick, finalizeChoices } from "@/lib/utils";

export default function genDiceSumProbability() {
  // target sum (keep it small for clean probabilities)
  const targetSum = pick([3, 4, 5, 6, 7, 8, 9, 10, 11]);

  // all possible dice outcomes (1–6 each)
  const outcomes = [];

  for (let d1 = 1; d1 <= 6; d1++) {
    for (let d2 = 1; d2 <= 6; d2++) {
      outcomes.push({ d1, d2, sum: d1 + d2 });
    }
  }

  const matching = outcomes.filter((o) => o.sum === targetSum).length;
  const total = 36;

  const correct = `${matching}/${total}`;

  const wrong = [
    `${matching}/${30}`, // wrong total sample space
    `${matching - 1}/${total}`,
    `${matching + 1}/${total}`,
  ];

  // build 6x6 dice table SVG (like your example grid)
  const cellSize = 28;

  const svg = `
<svg width="260" height="260" viewBox="0 0 260 260">
  <text x="130" y="15" text-anchor="middle" font-size="12">
    Sum of Two Dice
  </text>

  <!-- Column labels -->
  ${Array.from({ length: 6 })
    .map((_, i) => {
      const x = 40 + i * cellSize;
      return `<text x="${x}" y="30" font-size="10">${i + 1}</text>`;
    })
    .join("")}

  <!-- Row labels -->
  ${Array.from({ length: 6 })
    .map((_, i) => {
      const y = 55 + i * cellSize;
      return `<text x="15" y="${y}" font-size="10">${i + 1}</text>`;
    })
    .join("")}

  <!-- Grid + sums -->
  ${Array.from({ length: 6 })
    .map((_, r) =>
      Array.from({ length: 6 })
        .map((_, c) => {
          const d1 = r + 1;
          const d2 = c + 1;
          const sum = d1 + d2;

          const x = 30 + c * cellSize;
          const y = 40 + r * cellSize;

          const highlight =
            sum === targetSum ? "fill:#ffe082;stroke:#f57f17" : "stroke:#999";

          return `
            <rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}"
              fill="#fff" ${highlight} stroke-width="1"/>
            <text x="${x + 9}" y="${y + 18}" font-size="10">${sum}</text>
          `;
        })
        .join("")
    )
    .join("")}
</svg>
`.trim();

  return {
    prompt: {
      text: `
A probability model for rolling two six-sided dice is shown below.

Each cell represents the sum of the two dice.

What is the probability of rolling a sum of ${targetSum}?
      `.trim(),
      svg,
    },

    choices: finalizeChoices(correct, wrong),
  };
}