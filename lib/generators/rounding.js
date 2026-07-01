import { pick, randInt, numericChoices } from "@/lib/utils";

export default function genRounding() {
  const num = randInt(1000, 99999);
  const place = pick(["ten", "hundred", "thousand"]);
  const factor = place === "ten" ? 10 : place === "hundred" ? 100 : 1000;
  const correct = Math.round(num / factor) * factor;

  const wrongFactor1 = factor === 10 ? 100 : 10;
  const wrongFactor2 = factor === 1000 ? 100 : 1000;
  const mistakes = [
    Math.round(num / wrongFactor1) * wrongFactor1,
    Math.round(num / wrongFactor2) * wrongFactor2,
    Math.floor(num / factor) * factor,
  ];

  return {
    prompt: `Round ${num.toLocaleString()} to the nearest ${place}.`,
    choices: numericChoices(correct, mistakes, (n) => n.toLocaleString(), factor),
  };
}
