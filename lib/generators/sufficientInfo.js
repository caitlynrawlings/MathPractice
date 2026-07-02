import { pick, finalizeChoices } from "@/lib/utils";

export default function genSufficientInformation() {
  const scenarios = [
    {
      prompt:
        "Emma built a circular flower garden. The garden has a radius of 8 feet. She planted flowers in 1/4 of the garden and surrounded the garden with a fence that is 3 feet tall.",

      cannot: "What is the volume of soil in the garden?",

      can: [
        "What is the area of the garden?",
        "What is the area covered by flowers?",
        "How many feet of fencing does Emma need?"
      ]
    },

    {
      prompt:
        "Liam built a rectangular garden that is 12 feet long and 9 feet wide. He used 1/2 of the garden for vegetables and painted the fence green.",

      cannot: "How much soil is in the garden?",

      can: [
        "What is the area of the garden?",
        "What is the perimeter of the garden?",
        "What is the area used for vegetables?"
      ]
    },

    {
      prompt:
        "Sophia made a circular patio with a diameter of 16 feet. She covered 3/8 of the patio with outdoor furniture. The surrounding wall is 2 feet high.",

      cannot: "What is the volume of the concrete in the patio?",

      can: [
        "What is the area of the patio?",
        "What is the area covered by furniture?",
        "How many feet long is the outside edge of the patio?"
      ]
    },

    {
      prompt:
        "Noah built a square sandbox with sides measuring 10 feet. One-fourth of the sandbox is shaded by a canopy.",

      cannot: "How many cubic feet of sand are in the sandbox?",

      can: [
        "What is the area of the sandbox?",
        "What is the perimeter of the sandbox?",
        "What is the area under the canopy?"
      ]
    },

    {
      prompt:
        "Olivia created a triangular garden with an area of 50 sq ft and she used 80 lbs of soil to fill it. She is going plant roses in half of the garden.",

      cannot: "What the perimeter around the garden is?",

      can: [
        "How deep is the garden?",
        "What is the area planted with roses?",
        "How many square feet are not planted with roses?"
      ]
    },

    {
      prompt:
        "Jole created a square garden with an area of 50 sq ft and used 70 lbs of soil to fill it. He is going plant roses in 10% of the garden.",

      cannot: "How many rose plants can Jole plant?",

      can: [
        "How much fencing would be needed to go around the garden?",
        "What is the area planted with roses?",
        "How many square feet are not planted with roses?"
      ]
    }
  ];

  const s = pick(scenarios);

  const wrong = [...s.can];

  return {
    prompt: `${s.prompt}

Which of the following questions CANNOT be answered using only the information provided?`,

    choices: finalizeChoices(s.cannot, wrong),
  };
}