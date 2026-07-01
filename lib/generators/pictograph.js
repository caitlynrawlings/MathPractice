import { pick, randInt, numericChoices } from "@/lib/utils";

export default function genPictograph() {
  const item = pick(["books", "cupcakes", "stickers", "tickets", "seashells", "trading cards"]);
  const unit = pick([8, 12, 16, 20]);
  let fullA = randInt(2, 4);
  let hasHalfA = Math.random() < 0.6;
  const fullB = randInt(3, 6);
  let fullC = randInt(1, 4);
  let hasQuarterC = Math.random() < 0.6;
  if (!hasHalfA && !hasQuarterC) hasHalfA = true;

  const totalA = unit * fullA + (hasHalfA ? unit / 2 : 0);
  const totalB = unit * fullB;
  const totalC = unit * fullC + (hasQuarterC ? unit / 4 : 0);
  const correct = totalA + totalB + totalC;

  return {
    prompt: `A pictograph displays ${item} sold data where each symbol represents ${unit} ${item}. Monday shows ${fullA} full symbols${
      hasHalfA ? " and one half symbol" : ""
    }. Tuesday shows ${fullB} full symbols. Wednesday shows ${fullC} full symbols${
      hasQuarterC ? " and one quarter symbol" : ""
    }. What is the total number of ${item} sold across all three days?`,
    choices: numericChoices(
      correct,
      [correct - unit / 2, correct + unit / 2, correct - unit / 4, correct + unit / 4],
      (n) => `${n} ${item}`,
      unit / 4
    ),
  };
}
