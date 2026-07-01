import { pick, finalizeChoices } from "@/lib/utils";

export default function genPercentTwoStep() {
  const price = pick([200, 250, 300, 350, 400, 450, 500, 600, 800]);
  const d = pick([10, 15, 20, 25, 30, 40]);
  const m = pick([5, 8, 10, 12, 15, 20]);
  const item = pick([
    "tablet",
    "bicycle",
    "gaming console",
    "pair of headphones",
    "backpack",
    "skateboard",
    "electric scooter",
  ]);
  const store = pick([
    "electronics store",
    "sporting goods store",
    "department store",
    "online retailer",
    "hobby shop",
  ]);

  const dDec = (1 - d / 100).toFixed(2);
  const mDec = (1 + m / 100).toFixed(2);
  const dRaw = (d / 100).toFixed(2);
  const mRaw = (m / 100).toFixed(2);
  const dInv = (1 + d / 100).toFixed(2);

  const correct = `${price} × ${dDec} × ${mDec}`;
  const distractors = [
    `${price} × ${dRaw} × ${mRaw}`,
    `${price} × ${dInv} × ${mDec}`,
    `${price} − ${dRaw} + ${mRaw}`,
    `${price} × ${dDec} − ${mRaw}`,
  ];

  return {
    prompt: `A ${store} sells a ${item} for $${price}. To boost sales, the manager discounts the price by ${d}%. Later, the price increases by ${m}% to cover new costs. Which expression best represents the final price after both changes?`,
    choices: finalizeChoices(correct, distractors),
  };
}
