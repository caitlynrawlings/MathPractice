import { pick, finalizeChoices } from "@/lib/utils";

export default function genOrderFractionsDecimalsPercentsRandom() {
  // helpers
  const randInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const randDecimal = () => {return { label: (Math.random() * 3).toFixed(2) + "", value: (Math.random() * 3).toFixed(2)}};

  const randFraction = () => {
    const num = randInt(1, 9);
    const den = pick([2, 3, 4, 5, 6, 8, 10, 12]);
    return { label: `${num}/${den}`, value: num / den };
  };

  const randPercent = () => {
    const p = pick([5, 10, 12, 15, 20, 25, 30, 40, 50, 75, 120, 150, 200, 250]);
    return { label: `${p}%`, value: p / 100 };
  };

  const randMixed = () => {
    const whole = randInt(1, 4);
    const frac = randFraction();
    return {
      label: `${whole} ${frac.label}`,
      value: whole + frac.value,
    };
  };

  const generators = [randDecimal, randFraction, randPercent, randMixed];

  // generate 6 unique items
  const items = [];
  
  while (items.length < 6) {
    const item = pick(generators)();

    if (!items.find((x) => Math.abs(x.value - item.value) < 0.01)) {
      items.push(item);
    }
  }
  console.log(items)

  // correct order (greatest → least)
  const sorted = [...items].sort((a, b) => b.value - a.value);
  const correct = sorted.map((x) => x.label).join(", ");

  // distractors
  const wrong = [
    [...sorted].reverse().map((x) => x.label).join(", "),
    [...items].sort(() => Math.random() - 0.5).map((x) => x.label).join(", "),
    [...items].sort(() => Math.random() - 0.5).map((x) => x.label).join(", "),
  ];

  return {
    prompt: `
Put the following numbers in order from greatest to least:

${items.map((x) => x.label).join(", ")}
    `.trim(),

    choices: finalizeChoices(correct, wrong),
  };
}