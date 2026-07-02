import { pick, finalizeChoices } from "@/lib/utils";

export default function genGrowingPattern() {
  const patterns = [
    {
      name: "adds 3",
      start: 4,
      step: 3,
    },
    {
      name: "adds 4",
      start: 2,
      step: 4,
    },
    {
      name: "adds 5",
      start: 3,
      step: 5,
    },
    {
      name: "adds 2",
      start: 5,
      step: 2,
    },
  ];

  const pattern = pick(patterns);

  const termToFind = pick([6, 7, 8]);

  const countAt = (n) => pattern.start + (n - 1) * pattern.step;

  const correct = countAt(termToFind);

  const wrong = [
    correct + pattern.step,
    correct - pattern.step,
    pattern.start * termToFind, // assumes multiplication instead of growing pattern
  ];

  // Build SVG
  const svgTerms = [];

  for (let term = 1; term <= 4; term++) {
    const blocks = countAt(term);

    const startX = 20 + (term - 1) * 85;
    const startY = 90;

    svgTerms.push(`
      <text x="${startX + 20}" y="18" font-size="11" text-anchor="middle">
        Term ${term}
      </text>
    `);

    for (let i = 0; i < blocks; i++) {
      const cols = 4;
      const x = startX + (i % cols) * 12;
      const y = startY - Math.floor(i / cols) * 12;

      svgTerms.push(`
        <rect
          x="${x}"
          y="${y}"
          width="10"
          height="10"
          fill="#60a5fa"
          stroke="#2563eb"
          stroke-width="0.5"
        />
      `);
    }
  }

  const svg = `
<svg width="360" height="130" viewBox="0 0 360 130">
  ${svgTerms.join("")}
</svg>
`.trim();

  return {
    prompt: {
      text: `The growing pattern of blocks is shown below. If the pattern continues, how many blocks will be in Term ${termToFind}?`,
      svg,
    },
    choices: finalizeChoices(correct, wrong),
  };
}