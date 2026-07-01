import { pick, numericChoices } from "@/lib/utils";

export default function genFractionOfSet() {
  const totals = [12, 16, 20, 24, 28, 30, 32, 36, 40, 48];
  const fracs = [
    { n: 1, d: 2 },
    { n: 1, d: 3 },
    { n: 1, d: 4 },
    { n: 2, d: 3 },
    { n: 3, d: 4 },
    { n: 1, d: 6 },
    { n: 5, d: 6 },
    { n: 2, d: 5 },
    { n: 3, d: 5 },
  ];

  let total, f;
  do {
    total = pick(totals);
    f = pick(fracs);
  } while (total % f.d !== 0);

  const correct = (total / f.d) * f.n;
  const item = pick(["stickers", "marbles", "crayons", "cookies", "baseball cards", "pencils", "seashells"]);
  const owner = pick(["Maria", "Jordan", "the class", "Mr. Lee's students", "Aisha", "the club"]);
  const trait = pick(["red", "given away", "new", "special edition", "shiny", "broken"]);
  const verb = owner === "the class" || owner === "Mr. Lee's students" || owner === "the club" ? "have" : "has";

  return {
    prompt: `${owner} ${verb} ${total} ${item}. If ${f.n}/${f.d} of them are ${trait}, how many ${item} is that?`,
    choices: numericChoices(correct, [total - correct, total / f.d, correct + f.d], (n) => `${n} ${item}`, f.d),
  };
}
