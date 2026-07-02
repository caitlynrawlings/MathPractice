import { pick, finalizeChoices } from "@/lib/utils";

export default function genParallelLinesAngles() {
  const given = pick([42, 56, 64, 68, 72, 75, 105, 112, 118, 124, 135]);

  const types = [
    {
      name: "corresponding",
      correct: given,
      relation:
        "Corresponding angles are congruent."
    },
    {
      name: "alternate exterior",
      correct: given,
      relation:
        "Alternate exterior angles are congruent."
    },
    {
      name: "vertical",
      correct: given,
      relation:
        "Vertical angles are congruent."
    },
    {
      name: "same-side exterior",
      correct: 180 - given,
      relation:
        "Same-side interior angles are supplementary."
    },
  ];

  const type = pick(types);

  const correct = `${type.correct}°`;

  const wrong = [
    type.correct === given ? 180 - given : given,
    Math.abs(90 - given),
    pick([type.correct / 2, type.correct + 2, type.correct - 2]),
  ].map((x) => `${x}°`);

  let xLabel = "";

switch (type.name) {
  case "vertical":
    xLabel = `<text x="100" y="90" font-size="16">x</text>`;
    break;

  case "alternate exterior":
    xLabel = `<text x="180" y="190" font-size="16">x</text>`;
    break;

  case "same-side exterior":
    xLabel = `<text x="210" y="190" font-size="16">x</text>`;
    break;

  case "corresponding":
    xLabel = `<text x="200" y="160" font-size="16">x</text>`;
    break;
}

  const svg = `
<svg width="340" height="240" viewBox="0 0 340 240">

  <!-- parallel lines -->
  <line x1="30" y1="70" x2="310" y2="70"
        stroke="black" stroke-width="2"/>

  <line x1="30" y1="170" x2="310" y2="170"
        stroke="black" stroke-width="2"/>

  <!-- labels -->
  <text x="315" y="75" font-size="14">ℓ₁</text>
  <text x="315" y="175" font-size="14">ℓ₂</text>

  <!-- transversal -->
  <line x1="90" y1="20"
        x2="220" y2="220"
        stroke="black"
        stroke-width="2"/>

  <!-- angle labels -->
  <text x="120" y="58" font-size="16">${given}°</text>

  ${
    xLabel
  }

</svg>
`;

  return {
    prompt: {
      text: `In the figure below, lines ℓ₁ and ℓ₂ are parallel and are cut by a transversal.

If the marked angle measures ${given}°, what is the measure of x?`,
      svg,
    },

    choices: finalizeChoices(correct, wrong),
  };
}