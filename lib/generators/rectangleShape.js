import { pick, randInt, numericChoices } from "@/lib/utils";

export default function genRectangleShape() {
  const length = randInt(4, 20);
  const width = randInt(3, 15);
  const unit = pick(["feet", "meters", "inches", "yards"]);
  const shape = pick(["garden", "classroom rug", "poster", "sandbox", "bulletin board", "playground"]);
  const askPerimeter = Math.random() < 0.5;

  const perimeter = 2 * (length + width);
  const area = length * width;
  const correctNum = askPerimeter ? perimeter : area;
  const format = (n) => (askPerimeter ? `${n} ${unit}` : `${n} sq ${unit}`);

  const otherFormula = askPerimeter ? area : perimeter;
  const mistakes = [otherFormula, length + width];

  return {
    prompt: `A rectangular ${shape} is ${length} ${unit} long and ${width} ${unit} wide. What is the ${
      askPerimeter ? "perimeter" : "area"
    } of the ${shape}?`,
    choices: numericChoices(correctNum, mistakes, format, Math.max(1, Math.round(correctNum * 0.1))),
  };
}
