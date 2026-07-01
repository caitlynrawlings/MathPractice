import { pick, randInt, finalizeChoices } from "@/lib/utils";

export default function genDivisionRemainder() {
  const groups = randInt(4, 12);
  let total = randInt(50, 300);
  if (total % groups === 0) total += randInt(1, groups - 1);
  const quotient = Math.floor(total / groups);
  const remainder = total % groups;

  const pair = pick([
    ["students", "teams"],
    ["stickers", "bags"],
    ["cookies", "boxes"],
    ["pencils", "cups"],
    ["trading cards", "binders"],
  ]);

  const correct = `${quotient} each, ${remainder} left over`;
  const distractors = [
    `${remainder} each, ${quotient} left over`,
    `${quotient + 1} each, ${remainder} left over`,
    `${quotient} each, ${groups - remainder} left over`,
    `${quotient - 1} each, ${remainder + groups} left over`,
  ];

  return {
    prompt: `There are ${total} ${pair[0]} to be divided evenly among ${groups} ${pair[1]}. How many ${pair[0]} will be in each ${pair[1]}, and how many will be left over?`,
    choices: finalizeChoices(correct, distractors),
  };
}
