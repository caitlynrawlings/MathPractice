import { pick, numericChoices } from "@/lib/utils";

export default function genBarGraph() {
  const category = pick([
    { title: "pets owned by students", labels: ["Dogs", "Cats", "Fish", "Birds"] },
    { title: "votes for favorite lunch", labels: ["Pizza", "Tacos", "Pasta", "Salad"] },
    { title: "minutes of reading", labels: ["Mon", "Tue", "Wed", "Thu"] },
    { title: "fruit sold at the stand", labels: ["Apples", "Bananas", "Oranges", "Grapes"] },
  ]);
  const values = category.labels.map(() => pick([5, 10, 15, 20, 25, 30, 35, 40]));
  const correct = values.reduce((a, b) => a + b, 0);
  const lines = category.labels.map((l, i) => `${l} - ${values[i]}`).join(", ");

  return {
    prompt: `A bar graph shows ${category.title}: ${lines}. What is the total shown on the graph?`,
    choices: numericChoices(
      correct,
      [correct - Math.min(...values), correct - Math.max(...values), correct + Math.min(...values)],
      (n) => String(n),
      5
    ),
  };
}
