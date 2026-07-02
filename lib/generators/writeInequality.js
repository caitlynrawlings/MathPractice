import { pick, finalizeChoices } from "@/lib/utils";

export default function genLinearInequalityGraph() {
  const slopes = [-3, -2, -1, 1, 2, 3];
  const intercepts = [-4, -3, -2, -1, 1, 2, 3, 4];

  const m = pick(slopes);
  const b = pick(intercepts);

  const isGreater = pick([true, false]);
  const inclusive = pick([true, false]);

  const sign = isGreater
    ? inclusive
      ? "≥"
      : ">"
    : inclusive
      ? "≤"
      : "<";

  const correct = `y ${sign} ${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;

  const oppositeSign = isGreater
    ? inclusive
      ? "≤"
      : "<"
    : inclusive
      ? "≥"
      : ">";

  const oppositeInclusive = isGreater
    ? inclusive
      ? ">"
      : "≥"
    : inclusive
      ? "<"
      : "≤";

  const wrong = [
    pick([`y ${oppositeSign} ${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`, `y ${oppositeSign} 1/${Math.abs(m)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`]),
    pick([`y ${oppositeInclusive} ${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`, `y ${oppositeInclusive} ${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)+1}`]),
    pick([`y ${sign} -1/${m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`, `y ${sign} ${-m}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)+1}`]),
  ];

  //---------------------------------------------------
  // SVG GRAPH
  //---------------------------------------------------

  const W = 300;
  const H = 300;
  const scale = 25;
  const originX = W / 2;
  const originY = H / 2;

  const toSvgX = (x) => originX + x * scale;
  const toSvgY = (y) => originY - y * scale;

  const x1 = -6;
  const y1 = m * x1 + b;

  const x2 = 6;
  const y2 = m * x2 + b;

  const sx1 = toSvgX(x1);
  const sy1 = toSvgY(y1);
  const sx2 = toSvgX(x2);
  const sy2 = toSvgY(y2);

  // Determine which side to shade
  let testX = 0;
  let testY = isGreater ? 6 : -6;

  const region =
    m * testX + b < testY
      ? `${sx1},${sy1} ${sx2},${sy2} 300,0 0,0`
      : `${sx1},${sy1} ${sx2},${sy2} 300,300 0,300`;

  const dash = inclusive ? "" : 'stroke-dasharray="7 5"';

  const svg = `
<svg width="320" height="320" viewBox="0 0 300 300">

  <!-- shaded region -->
  <polygon
      points="${region}"
      fill="#60a5fa"
      opacity="0.22"/>

  <!-- grid -->
  ${Array.from({ length: 13 }, (_, i) => {
    const p = i * scale;
    return `
      <line x1="${p}" y1="0" x2="${p}" y2="300"
        stroke="#ddd" stroke-width="1"/>
      <line x1="0" y1="${p}" x2="300" y2="${p}"
        stroke="#ddd" stroke-width="1"/>
    `;
  }).join("")}

  <!-- axes -->
  <line x1="0" y1="${originY}" x2="300" y2="${originY}"
        stroke="black" stroke-width="2"/>

  <line x1="${originX}" y1="0" x2="${originX}" y2="300"
        stroke="black" stroke-width="2"/>

  <!-- line -->
  <line
      x1="${sx1}"
      y1="${sy1}"
      x2="${sx2}"
      y2="${sy2}"
      stroke="#ef4444"
      stroke-width="3"
      ${dash}
  />

</svg>
`;

  return {
    prompt: {
      text: "Which of the following linear inequalities is represented by the graph below?",
      svg,
    },
    choices: finalizeChoices(correct, wrong),
  };
}