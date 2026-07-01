import { pick, finalizeChoices } from "@/lib/utils";

export default function marblePicker() {
  const colors = [
    { name: "red", hex: "#e53935" },
    { name: "blue", hex: "#1e88e5" },
    { name: "green", hex: "#43a047" },
    { name: "yellow", hex: "#fdd835" },
  ];

  const usedColors = pick([
    colors.slice(0, 3),
    colors.slice(1, 4),
    colors.slice(0, 4),
  ]);

  const counts = {};
  let total = 0;

  usedColors.forEach((c) => {
    counts[c.name] = pick([2, 3, 4, 5, 6]);
    total += counts[c.name];
    console.log(c.name, counts[c.name])
  });

  const replacement = pick([true, false]);

  const drawFirst = pick(usedColors);
  const drawSecond = pick(usedColors);

  const sameColor = drawFirst.name === drawSecond.name;

  const p = (num, den) => `${num}/${den}`;

  const firstProb = p(counts[drawFirst.name], total);

  let secondProb;

  if (replacement) {
    secondProb = p(counts[drawSecond.name], total);
  } else {
    if (sameColor) {
      secondProb = p(counts[drawSecond.name] - 1, total - 1);
    } else {
      secondProb = p(counts[drawSecond.name], total - 1);
    }
  }

  const correct = `${firstProb} • ${secondProb}`;

  const wrong = [
    replacement
      ? `${firstProb} • ${p(counts[drawSecond.name] - 1, total - 1)}`
      : `${firstProb} • ${p(counts[drawSecond.name], total)}`,

    `${p(Math.max(counts[drawFirst.name], counts[drawSecond.name])+1, total)} • ${p(counts[drawFirst.name], total)}`,

    `${p(Math.min(counts[drawFirst.name], counts[drawSecond.name])-1, total)} • ${p(counts[drawFirst.name], total-1)}`,
  ];

  const balls = usedColors.flatMap((c) =>
  Array.from({ length: counts[c.name] }).map(() => c.hex)
);

// shuffle (Fisher-Yates)
for (let i = balls.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [balls[i], balls[j]] = [balls[j], balls[i]];
}

  const svg = `
<svg width="340" height="280" viewBox="0 0 300 280">
  <!-- Bag -->
  <path d="M 40 20 
           A 20 20 0 0 0 40 40 
           L 40 200 
           A 20 20 0 0 0 60 220 
           L 200 220 
           A 20 20 0 0 0 220 200 
           L 220 40 
           A 20 20 0 0 0 220 20" 
        fill="#f5f5f5" stroke="#999" stroke-width="1"/>

  <text x="130" y="15" text-anchor="middle" font-size="12">
    Marble Bag
  </text>

  <!-- Balls -->
  ${balls
    .map((color, i) => {
      const cols = 5;
      const x = 70 + (i % cols) * 30;
      const y = 60 + Math.floor(i / cols) * 30;

      return `<circle cx="${x}" cy="${y}" r="8" fill="${color}" />`;
    })
    .join("")}
</svg>
`.trim();

  return {
    prompt: {
        text: `
            A bag contains marbles shown below.

            A marble is drawn ${replacement ? "with replacement" : "without replacement"}, and then a second marble is drawn.

            Which expression represents the probability of drawing a ${drawFirst.name} marble first and a ${drawSecond.name} marble second?
                `.trim(),
        svg: svg
    },

    choices: finalizeChoices(correct, wrong),
  };
}