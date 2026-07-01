import { pick, numericChoices } from "@/lib/utils";

export default function pythagoreanTheorem() {
  // Nice Pythagorean triples
  const triples = [
    { a: 3, b: 4, c: 5 },
    { a: 5, b: 12, c: 13 },
    { a: 8, b: 15, c: 17 },
    { a: 7, b: 24, c: 25 },
    { a: 9, b: 12, c: 15 },
    { a: 20, b: 21, c: 29 },
  ];

  const scales = [10, 20, 50, 100, 200];

  const triple = pick(triples);
  const scale = pick(scales);

  const leg1 = triple.a * scale;
  const leg2 = triple.b * scale;
  const hypotenuse = triple.c * scale;

  const scenario = pick([
    "airplane",
    "ladder",
    "walking",
    "kite",
    "pole",
    "distance",
  ]);

  let prompt;
  let formatter = (n) => `${n.toLocaleString()} feet`;

  switch (scenario) {
    case "airplane":
      prompt = `An airplane takes off over a flat area. When it is ${leg1.toLocaleString()} feet above the ground, it has traveled ${leg2.toLocaleString()} feet horizontally. Approximately how many feet has the airplane flown through the air?`;
      break;

    case "ladder":
      prompt = `A ladder leans against a wall. The bottom of the ladder is ${leg2.toLocaleString()} feet from the wall, and the top reaches ${leg1.toLocaleString()} feet up the wall. About how long is the ladder?`;
      break;

    case "walking":
      prompt = `A person walks ${leg2.toLocaleString()} feet east and then ${leg1.toLocaleString()} feet north. Approximately how far is the person from the starting point?`;
      break;

    case "kite":
      prompt = `A kite is flying ${leg1.toLocaleString()} feet above the ground. The person holding the string is ${leg2.toLocaleString()} feet from the point directly beneath the kite. Approximately how long is the kite string?`;
      break;

    case "pole":
      prompt = `A support cable is attached to the top of a ${leg1.toLocaleString()}-foot pole. The cable is anchored ${leg2.toLocaleString()} feet from the base of the pole. Approximately how long is the cable?`;
      break;

    case "distance": {
      const x1 = pick([0, 1, 2, 3, 4, 5]);
      const y1 = pick([0, 1, 2, 3, 4, 5]);

      prompt = `What is the distance between the points (${x1}, ${y1}) and (${x1 + leg2}, ${y1 + leg1})?`;

      formatter = (n) => `${n.toLocaleString()} units`;
      break;
    }
  }

  return {
    prompt,
    choices: numericChoices(
      hypotenuse,
      [
        leg1,
        leg2,
        leg1 + leg2,
        Math.abs(leg2 - leg1),
      ],
      formatter,
      5
    ),
  };
}