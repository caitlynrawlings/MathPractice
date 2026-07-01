import { pick, finalizeChoices } from "@/lib/utils";

export default function testMedian() {
  const score = pick([65, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95]);

  const subjects = [
    "mathematics",
    "science",
    "history",
    "English",
    "geography",
  ];

  const assessments = [
    "test",
    "quiz",
    "exam",
    "assessment",
    "unit test",
  ];

  const subject = pick(subjects);
  const assessment = pick(assessments);

  const correct = pick([
    `Half of the students scored ${score}% or below.`,
    `Half of the class earned a score of ${score}% or less.`,
    `${score}% is the middle score when all of the scores are arranged from least to greatest.`,
    `When the scores are ordered, ${score}% is the middle value.`,
  ]);

  const wrong = [
    pick([
      `The highest score on the ${assessment} was ${score}%.`,
      `No student scored higher than ${score}%.`,
    ]),
    pick([
      `${score}% was the most common score on the ${assessment}.`,
      `More students earned ${score}% than any other score.`,
    ]),
    pick([
      `The average score on the ${assessment} was ${score}%.`,
      `The mean score for the class was ${score}%.`,
    ]),
  ];

  return {
    prompt: `A ${subject} teacher determines that the median score on the most recent ${assessment} was ${score}%. Which statement is the most accurate interpretation of this result?`,
    choices: finalizeChoices(correct, wrong),
  };
}