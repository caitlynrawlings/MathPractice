import { pick, finalizeChoices } from "@/lib/utils";

export default function genMeanFromFrequencyTable() {
  const scores = [60, 70, 80, 90, 100];

  // randomized student counts (keeps structure valid)
  const counts = scores.map(() => pick([2, 3, 4, 5, 6, 7, 8]));

  // weighted mean calculation
  let totalStudents = 0;
  let totalScore = 0;

  scores.forEach((score, i) => {
    totalStudents += counts[i];
    totalScore += score * counts[i];
  });

  const correct = Math.round(totalScore / totalStudents);

  const wrong = [
    correct + pick([-5, -3, 3, 5]),
    correct + pick([-8, 8]),
    correct - pick([2, 4, 6]),
  ];

  // SVG table
  const svg = `
<svg width="320" height="220" viewBox="0 0 320 220">
  <text x="160" y="18" text-anchor="middle" font-size="12">
    Quiz Score Distribution
  </text>

  <!-- headers -->
  <text x="60" y="40" font-size="10">Score</text>
  <text x="200" y="40" font-size="10">Students</text>

  <!-- rows -->
  ${scores
    .map((score, i) => {
      const y = 65 + i * 25;
      return `
        <text x="60" y="${y}" font-size="10">${score}</text>
        <text x="200" y="${y}" font-size="10">${counts[i]}</text>
      `;
    })
    .join("")}

  <!-- grid lines -->
  <line x1="30" y1="50" x2="290" y2="50" stroke="#ccc"/>
  <line x1="30" y1="190" x2="290" y2="190" stroke="#ccc"/>
</svg>
`.trim();

  return {
    prompt: {
      text: `
Mrs. Kade gave a math quiz to her students.

The table shows the scores and number of students receiving each score.

What is the closest estimate of the average (mean) score?
      `.trim(),
      svg,
    },

    choices: finalizeChoices(
      correct,
      wrong,
      (n) => String(n)
    ),
  };
}