import { pick, shuffle, finalizeChoices } from "@/lib/utils";

export default function linearEquation() {
  const names = [
    "Peter",
    "Emma",
    "Liam",
    "Sophia",
    "Noah",
    "Olivia",
    "Mason",
    "Ava",
  ];

  const jobs = [
    "babysits",
    "mows lawns",
    "walks dogs",
    "tutors students",
    "washes cars",
    "delivers newspapers",
  ];

  const item = pick([
    "evening",
    "job",
    "appointment",
    "shift",
  ]);

  const person = pick(names);
  const job = pick(jobs);

  // Flat fee and hourly rate
  const flat = pick([8, 10, 12, 15, 18, 20]);
  const rate = pick([4, 5, 6, 7, 8, 9]);

  const totalVar = person[0]
  const timeVar = pick(["t", "h", "x", "n"]);

  const correct = `${totalVar} = ${rate}${timeVar} + ${flat}`;

  const distractors = shuffle([
    `${totalVar} = ${flat}${timeVar} + ${rate}`,               // switched coefficients
    `${totalVar} = ${rate}(${timeVar} + ${flat})`,             // distributes incorrectly
    `${totalVar} = ${flat}(${timeVar} - 1) + ${rate}`,         // similar-looking incorrect form
    `${totalVar} = ${rate}${timeVar} - ${flat}`,               // subtracts fee
    `${totalVar} = ${flat} + ${timeVar}`,                      // missing rate
    `${totalVar} = ${rate} + ${flat}${timeVar}`,               // another switched version
  ]);

  const wrong = [];
  for (const d of distractors) {
    if (d !== correct && !wrong.includes(d)) {
      wrong.push(d);
    }
    if (wrong.length === 3) break;
  }

  return {
    prompt: `${person} ${job} for neighbors. ${person} charges a flat fee of $${flat} per ${item} plus $${rate} for each hour worked. If ${totalVar} represents the total amount earned and ${timeVar} represents the number of hours worked, which equation correctly models the relationship?`,
    choices: finalizeChoices(correct, wrong)
  };
}