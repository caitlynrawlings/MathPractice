import { pick, finalizeChoices } from "@/lib/utils";

export default function genRectanglePerimeter() {
  const widthBase = pick([3, 4, 5, 6, 7, 8]);
  const slope = pick([2, 3]);
  const constant = pick([3, 5, 7, 9]);

  // width = w
  const w = widthBase;

  // length = slope*w + constant
  const l = slope * w + constant;

  const perimeter = 2 * (w + l);

  const correct = `Width = ${w} cm, Length = ${l} cm`;

  const wrong = [
    `Width = ${w + 1} cm, Length = ${l} cm`,
    `Width = ${w} cm, Length = ${l + 2} cm`,
    `Width = ${w - 1} cm, Length = ${l + 1} cm`,
    `Width = ${Math.max(1, w - 2)} cm, Length = ${l - 2} cm`,
  ].filter((x) => x !== correct);

  const prompt = `
A rectangle has a length that is ${slope === 2 ? "twice" : "three times"} its width ${constant >= 0 ? "plus" : "minus"} ${Math.abs(
    constant
  )}. The perimeter is ${perimeter} cm.

What are the dimensions of the rectangle?
  `.trim();

  return {
    prompt,
    choices: finalizeChoices(correct, wrong),
  };
}