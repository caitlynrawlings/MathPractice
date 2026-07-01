import { pick, numericChoices } from "@/lib/utils";

export default function genPercentOf() {
  const Y = pick([20, 40, 60, 80, 100, 120, 150, 160, 200, 240, 280, 300]);
  const X = pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 90]);
  const correct = Math.round((Y * X) / 100);

  const templates = [
    (x, y) =>
      `A recipe calls for ${y} grams of flour. If a baker uses ${x}% of it for a test batch, how many grams does she use?`,
    (x, y) => `There are ${y} marbles in a jar. ${x}% of them are blue. How many marbles are blue?`,
    (x, y) => `A school has ${y} students. ${x}% of them ride the bus. How many students ride the bus?`,
    (x, y) => `A farmer picks ${y} apples. He sells ${x}% of them at the market. How many apples does he sell?`,
    (x, y) =>
      `A class raised $${y} for a field trip. They spent ${x}% of it on snacks. How much did they spend on snacks?`,
  ];
  const template = pick(templates);

  return {
    prompt: template(X, Y),
    choices: numericChoices(
      correct,
      [Y - X, Math.round((Y * X) / 10), Y - correct],
      (n) => String(n),
      Math.max(2, Math.round(correct * 0.15))
    ),
  };
}
