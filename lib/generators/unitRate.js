import { pick, randInt, money, numericChoices } from "@/lib/utils";

export default function genUnitRate() {
  const qty = randInt(3, 12);
  const unitPrice = pick([0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5]);
  const total = +(qty * unitPrice).toFixed(2);
  const item = pick([
    "pack of pencils",
    "box of granola bars",
    "bag of apples",
    "carton of juice boxes",
    "set of markers",
    "bundle of notebooks",
  ]);
  const unitName = pick(["pencil", "bar", "apple", "juice box", "marker", "notebook"]);
  const correct = unitPrice;

  return {
    prompt: `A ${item} with ${qty} ${unitName}s costs ${money(total)}. What is the price per ${unitName}?`,
    choices: numericChoices(correct, [total * qty, total - qty, correct + 0.25, correct - 0.25], money, 0.25),
  };
}
