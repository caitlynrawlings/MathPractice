# The Word Problem Notebook

A grade 4 math practice app built with Next.js (App Router). Twelve word-problem
types, each generating fresh numbers on every question, plus a mixed-practice
mode that cycles randomly through all of them.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
app/
  layout.jsx        Root layout + global styles import
  page.jsx           Client component that owns app state (screen, score, streak)
  globals.css         Notebook-paper visual theme
components/
  Header.jsx          Home screen title/subtitle
  MixedCard.jsx        "Mixed Practice" call-to-action
  TypeGrid.jsx          Grid of skill cards
  TypeCard.jsx           Single skill card
  QuizScreen.jsx         Question card, score/streak pills, feedback
  ChoiceButton.jsx        Single answer-choice button
lib/
  utils.js             Shared random/formatting/choice-building helpers
  questionTypes.js       Registry mapping each skill to its generator + color
  generators/             One file per question type:
    percentTwoStep.js       Percent discount then markup (two-step)
    pictograph.js             Pictograph totals (with half/quarter symbols)
    percentOf.js               Percent of a number
    fractionOfSet.js             Fraction of a group
    elapsedTime.js                 Elapsed time
    rectangleShape.js                Perimeter & area
    unitRate.js                       Unit price
    rounding.js                        Rounding numbers
    multiplication.js                   Multiplication word problems
    divisionRemainder.js                  Division with remainders
    barGraph.js                             Bar graph totals
    makingChange.js                           Making change
```

## Adding a new question type

1. Create `lib/generators/yourType.js` exporting a default function that
   returns `{ prompt, choices }`, where `choices` is an array of
   `{ text, correct }` built with `finalizeChoices` or `numericChoices` from
   `lib/utils.js`.
2. Register it in `lib/questionTypes.js` (add the import + an entry in
   `QUESTION_TYPES` with an `id`, `name`, and `icon`).

That's it — it automatically shows up in the skill grid and in mixed practice.
