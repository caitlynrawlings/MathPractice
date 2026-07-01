import { pick, numericChoices } from "@/lib/utils";

export default function pondWalk() {
  const radius = pick([8, 10, 12, 14, 16, 18]);

  const pi = 3.14;

  const fullCircumference = 2 * pi * radius;
  const correct = fullCircumference / 2; // half the pond

  const quarter = fullCircumference / 4;
  const full = fullCircumference;
  const offByRadius = correct + radius;

  const r = radius;

  return {
    prompt: `Sally walked around a circular pond. The pond has a radius of ${r} meters. If she walked halfway around the pond, how far did she walk? (Use π = 3.14)`,
    choices: numericChoices(
      correct,
      [full, quarter, offByRadius],
      (n) => String(Math.round(n * 100) / 100),
      5
    ),
  };
}