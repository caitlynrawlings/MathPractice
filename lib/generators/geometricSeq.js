import { pick, finalizeChoices } from "@/lib/utils";

export default function genGeometricSequence() {
  const firstTerm = pick([1, 2, 3, 4, 5, 6, 8, 9]);
  const ratio = pick([2, 3, 4, 5]);

  const termNumber = pick([4, 5, 6, 7, 8]);

  const givenTerm = firstTerm * Math.pow(ratio, termNumber - 1);

  const correct = String(firstTerm);

  const wrong = [
    // divides one time too few
    String(givenTerm / Math.pow(ratio, termNumber - 2)),

    // multiplies instead of dividing
    String(givenTerm * ratio),

    // assumes it cannot be determined
    "Cannot be determined",

    // uses one extra division
    String(givenTerm / Math.pow(ratio, termNumber)),
  ];

  return {
    prompt: `The ${termNumber}${ordinalSuffix(termNumber)} term of a geometric sequence is ${givenTerm}, and the common ratio is ${ratio}. What is the first term of the sequence?`,
    choices: finalizeChoices(correct, wrong),
  };
}

function ordinalSuffix(n) {
  if (n % 10 === 1 && n % 100 !== 11) return "st";
  if (n % 10 === 2 && n % 100 !== 12) return "nd";
  if (n % 10 === 3 && n % 100 !== 13) return "rd";
  return "th";
}