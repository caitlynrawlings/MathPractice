import { pick, finalizeChoices } from "@/lib/utils";

export default function genRoundDecimals() {
  const places = [
    { name: "nearest tenth", decimals: 1 },
    { name: "nearest hundredth", decimals: 2 },
    { name: "nearest thousandth", decimals: 3 },
  ];

  const place = pick(places);

  // Generate a decimal with 4 decimal places so every rounding place is meaningful
  const whole = pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20]);
  const decimalPart = Math.floor(Math.random() * 9000) + 1000; // 1000–9999
  const number = Number(`${whole}.${decimalPart}`);

  const correct = Number(number.toFixed(place.decimals));
  console.log(decimalPart.places)
  console.log(correct)

  const factor = 1 / Math.pow(10, place.decimals);

// Common mistake: one increment above/below the correct answer
const offByOne = pick([
  Number((correct + factor).toFixed(place.decimals)),
  Number((correct - factor).toFixed(place.decimals)),
]);

// Rounded to the wrong place value
const roundToWrongPlace =
  place.decimals === 1
    ? Number(number.toFixed(2)) // rounded to hundredths instead of tenths
    : Number(number.toFixed(place.decimals - 1));

// Move the incorrectly rounded answer one place-value up or down
const roundToWrong = Number(
  (
    roundToWrongPlace +
    pick([factor, -factor])
  ).toFixed(place.decimals)
);

console.log(offByOne, roundToWrong, roundToWrongPlace);

  const wrong = [
    roundToWrongPlace,
    roundToWrong,
    offByOne
  ].map(num => num === correct ? Number(num + (factor / 10)).toFixed(place.decimals+1) : num);

  return {
    prompt: `Round ${number.toFixed(4)} to the ${place.name}.`,
    choices: finalizeChoices(
      correct.toFixed(place.decimals),
      wrong
    ),
  };
}