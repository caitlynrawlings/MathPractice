import genPercentTwoStep from "@/lib/generators/percentTwoStep";
import genPictograph from "@/lib/generators/pictograph";
import genPercentOf from "@/lib/generators/percentOf";
import genFractionOfSet from "@/lib/generators/fractionOfSet";
import genElapsedTime from "@/lib/generators/elapsedTime";
import genRectangleShape from "@/lib/generators/rectangleShape";
import genUnitRate from "@/lib/generators/unitRate";
import genRounding from "@/lib/generators/rounding";
import genMultiplication from "@/lib/generators/multiplication";
import genDivisionRemainder from "@/lib/generators/divisionRemainder";
import genBarGraph from "@/lib/generators/barGraph";
import genMakingChange from "@/lib/generators/makingChange";
import combinations from "./generators/combinations";
import pondWalk from "./generators/pondWalk";
import linearEquation from "./generators/linearEquation";
import mostMoney from "./generators/mostMoney";
import testMedian from "./generators/testMedian";
import classTime from "./generators/classTime";
import pythagoreanTheorem from "./generators/pythagoreanTheorem";
import marblePicker from "./generators/marblePicker";
import genIceCreamScatter from "./generators/iceCreamScatter";
import genDiceSumProbability from "./generators/diceSum";
import genMeanFromFrequencyTable from "./generators/testAverage";
import genRoundDecimals from "./generators/roundDecimals";
import genGrowingPattern from "./generators/findPattern";

export const QUESTION_TYPES = [
  { id: "percentTwoStep", name: "Percent Discount & Markup", icon: "📱", generate: genPercentTwoStep },
  { id: "pictograph", name: "Pictograph Totals", icon: "📚", generate: genPictograph },
  { id: "percentOf", name: "Percent of a Number", icon: "✏️", generate: genPercentOf },
  { id: "fractionOfSet", name: "Fraction of a Group", icon: "🍬", generate: genFractionOfSet },
  { id: "elapsedTime", name: "Elapsed Time", icon: "⏰", generate: genElapsedTime },
  { id: "rectangleShape", name: "Perimeter & Area", icon: "📐", generate: genRectangleShape },
  { id: "unitRate", name: "Unit Price", icon: "🛒", generate: genUnitRate },
  { id: "rounding", name: "Rounding Numbers", icon: "🔢", generate: genRounding },
  { id: "multiplication", name: "Multiplication Word Problems", icon: "✖️", generate: genMultiplication },
  { id: "divisionRemainder", name: "Division with Remainders", icon: "➗", generate: genDivisionRemainder },
  { id: "barGraph", name: "Bar Graph Totals", icon: "📊", generate: genBarGraph },
  { id: "makingChange", name: "Making Change", icon: "💰", generate: genMakingChange },
  { id: "combinations", name: "Combinations", icon: "", generate: combinations },
  { id: "pondWalk", name: "Pond Walk", icon: "", generate: pondWalk },
  { id: "linearEquation", name: "Linear Equation", icon: "", generate: linearEquation },
  { id: "mostMoney", name: "Most Money", icon: "", generate: mostMoney },
  { id: "testMedian", name: "Test Median", icon: "", generate: testMedian },
  { id: "classTime", name: "Class Time", icon: "", generate: classTime },
  { id: "pythagoreanTheorem", name: "Pythagorean Theorem", icon: "", generate: pythagoreanTheorem },
  { id: "marblePicker", name: "Marble Picker", icon: "", generate: marblePicker },
  // { id: "iceCreamScatter", name: "Ice Cream Sales", icon: "", generate: genIceCreamScatter },
  { id: "diceSum", name: "Dice Sum", icon: "", generate: genDiceSumProbability },
  { id: "testAvg", name: "Test Average", icon: "", generate: genMeanFromFrequencyTable },
  { id: "roundDecimals", name: "Round Decimals", icon: "", generate: genRoundDecimals },
  { id: "findPattern", name: "Found Pattern", icon: "", generate: genGrowingPattern },

];

export const PALETTE = ["#E8623D", "#4A90A4", "#F2B705", "#6E9887", "#B15CC7", "#D65D8A", "#3E7CB1", "#C97B2E"];

export const colorForType = (id) => {
  const idx = QUESTION_TYPES.findIndex((t) => t.id === id);
  return PALETTE[idx % PALETTE.length];
};

export const getType = (id) => QUESTION_TYPES.find((t) => t.id === id) || null;

/**
 * Picks a random type, optionally avoiding a given id (used for mixed mode
 * so the same skill doesn't repeat twice in a row).
 */
export const pickRandomType = (excludeId) => {
  const pool = excludeId ? QUESTION_TYPES.filter((t) => t.id !== excludeId) : QUESTION_TYPES;
  const list = pool.length ? pool : QUESTION_TYPES;
  return list[Math.floor(Math.random() * list.length)];
};
