import { pick, randInt, money, numericChoices } from "@/lib/utils";

export default function genMakingChange() {
  const price = +(randInt(100, 1900) / 100).toFixed(2);
  const bills = [5, 10, 20, 50].filter((b) => b > price);
  const paid = bills.length ? pick(bills) : 20;
  const correct = +(paid - price).toFixed(2);
  const item = pick(["book", "toy", "lunch combo", "art supply set", "board game", "backpack"]);

  return {
    prompt: `A student buys a ${item} for ${money(price)} and pays with a $${paid} bill. How much change should the student get back?`,
    choices: numericChoices(correct, [paid + price, price - paid, correct + 1, correct - 0.5], money, 0.5),
  };
}
