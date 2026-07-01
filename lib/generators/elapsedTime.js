import { pick, randInt, pad2, finalizeChoices } from "@/lib/utils";

export default function genElapsedTime() {
  const startHour = randInt(1, 11);
  const startMin = pick([0, 15, 30, 45]);
  const ampm = pick(["AM", "PM"]);
  const duration = pick([25, 35, 40, 45, 50, 55, 65, 75, 90, 105, 120]);
  const activity = pick([
    "Soccer practice",
    "The piano lesson",
    "Math class",
    "The school assembly",
    "The field trip",
    "Art class",
    "Band rehearsal",
  ]);

  const hour24 = ampm === "PM" ? startHour + 12 : startHour;
  const base = new Date(2024, 0, 1, hour24, startMin);

  const format = (d) => {
    let h = d.getHours();
    const m = d.getMinutes();
    const suffix = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${pad2(m)} ${suffix}`;
  };

  const end = new Date(base.getTime() + duration * 60000);
  const correct = format(end);

  const offsets = [15, 30, -15, -30, 60].map((o) => format(new Date(base.getTime() + (duration + o) * 60000)));

  return {
    prompt: `${activity} starts at ${startHour}:${pad2(startMin)} ${ampm} and lasts ${duration} minutes. What time does it end?`,
    choices: finalizeChoices(correct, offsets),
  };
}
