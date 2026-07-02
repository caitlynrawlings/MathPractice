import { pick, finalizeChoices } from "@/lib/utils";

export default function genEstimateAverage() {
  const scenarios = [
    {
      item: "candy bars",
      place: "football home games",
      buyer: "the football concession stand",
    },
    {
      item: "tickets",
      place: "school plays",
      buyer: "the drama club",
    },
    {
      item: "water bottles",
      place: "soccer tournaments",
      buyer: "the booster club",
    },
    {
      item: "pizza slices",
      place: "basketball games",
      buyer: "the snack stand",
    },
    {
      item: "programs",
      place: "concerts",
      buyer: "the music department",
    },
    {
      item: "cupcakes",
      place: "bake sales",
      buyer: "the student council",
    },
  ];

  const scenario = pick(scenarios);

  // Number of events
  const events = pick([4, 5, 6, 7, 8, 9, 10]);

  // Pick a nice average, then make the total close to it
  const estimatedAverage = pick([
    30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
  ]);

  const total =
    estimatedAverage * events +
    pick([-8, -6, -5, -3, -2, -1, 1, 2, 3, 5, 6, 8]);

  const exactAverage = total / events;

  const correct = (Math.round(exactAverage / 10) * 10);

  const wrong = [
    exactAverage.toFixed(1), // computes exact average instead of estimating
    String(Math.floor(exactAverage / 10) * 10 === correct ? correct - 5 : Math.floor(exactAverage / 10) * 10), // rounds down
    String(Math.ceil(exactAverage / 10) * 10 === correct ? correct + 5 : Math.ceil(exactAverage / 10) * 10), // rounds up
    String(Math.round(exactAverage) === correct ? correct + 1 : Math.round(exactAverage)), // nearest whole number
  ]

  return {
    prompt: `After a lesson on rounding and estimation, a teacher tells students that ${scenario.buyer} purchased ${total} ${scenario.item} to sell during ${events} ${scenario.place}. The teacher asks the students to estimate the average number of ${scenario.item} that will be sold at each ${events === 1 ? scenario.place.slice(0, -1) : scenario.place}. Which of the following is the best estimate?`,
    choices: finalizeChoices(String(correct), wrong),
  };
}