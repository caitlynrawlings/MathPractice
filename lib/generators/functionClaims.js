import { pick, finalizeChoices } from "@/lib/utils";

export default function genFunctionClaims() {
  const a = pick([-4, -3, -2, 2, 3, 4, 5]);
  const b = pick([-8, -5, -3, -1, 2, 4, 6]);

  const f = (x) => a * x + b;

  const functionText =
    b === 0
      ? `${a}x`
      : b > 0
      ? `${a}x + ${b}`
      : `${a}x - ${Math.abs(b)}`;

  const claimType = pick([
    "additive",
    "commutative",
    "equal",
    "greater",
    "less",
    "double",
  ]);

  let prompt;
  let correct;
  let wrong = [];

  switch (claimType) {
    case "additive": {
      const x1 = pick([1, 2, 3, 4, 5]);
      const x2 = pick([2, 3, 4, 5, 6]);

      const lhs = f(x1) + f(x2);
      const rhs = f(x1 + x2);

      prompt = `A function is defined by

f(x) = ${functionText}

A student claims that

f(${x1}) + f(${x2}) = f(${x1 + x2})

Is the student's claim correct?`;

      correct = `No. Since f(${x1}) + f(${x2}) = ${lhs}, while f(${x1 + x2}) = ${rhs}.`;

      wrong = [
        "Yes, because the inputs add.",
        "Yes. Linear functions are additive.",
        `Yes, because ${x1} + ${x2} = ${x1 + x2}.`,
        `No. Because f(${x1 + x2}) = ${lhs}.`,
      ];
      break;
    }

    case "commutative": {
      const x1 = pick([2, 3, 4, 5]);
      const x2 = pick([6, 7, 8]);

      prompt = `A function is defined by

f(x) = ${functionText}

A student claims that

f(${x1} + ${x2}) = f(${x2} + ${x1})

Is the student's claim correct?`;

      correct = `Yes. Since ${x1} + ${x2} = ${x2} + ${x1}, both expressions evaluate to f(${x1 + x2}).`;

      wrong = [
        "No. The order of addition matters.",
        "No. The inputs are different.",
        "Yes. Linear functions are additive.",
        `No. f(${x1 + x2}) is undefined.`,
      ];
      break;
    }

    case "equal": {
      const x1 = pick([1, 2, 3]);
      const x2 = pick([5, 6, 7]);

      prompt = `A function is defined by

f(x) = ${functionText}

A student claims that

f(${x1}) = f(${x2})

Is the student's claim correct?`;

      correct = `No. Since f(${x1}) = ${f(x1)} and f(${x2}) = ${f(x2)}.`;

      wrong = [
        "Yes. Equal functions always give equal outputs.",
        "Yes. The function is linear.",
        `No. Because f(${x2}) = ${f(x1)}.`,
        "Yes. The outputs are always the same.",
      ];
      break;
    }

    case "greater": {
      const x1 = pick([5, 6, 7]);
      const x2 = pick([1, 2, 3]);

      const trueStatement = f(x1) > f(x2);

      prompt = `A function is defined by

f(x) = ${functionText}

A student claims that

f(${x1}) > f(${x2})

Is the student's claim correct?`;

      if (trueStatement) {
        correct = `Yes. Since f(${x1}) = ${f(x1)} and f(${x2}) = ${f(x2)}, ${f(
          x1
        )} > ${f(x2)}.`;

        wrong = [
          "No. Larger inputs always give smaller outputs.",
          "No. The outputs are equal.",
          "Yes. Because the inputs are different.",
          `No. Since ${f(x1)} < ${f(x2)}.`,
        ];
      } else {
        correct = `No. Since f(${x1}) = ${f(x1)} and f(${x2}) = ${f(
          x2
        )}, ${f(x1)} is not greater than ${f(x2)}.`;

        wrong = [
          "Yes. Larger inputs always produce larger outputs.",
          "Yes. Because the function is linear.",
          `Yes. Since ${f(x1)} > ${f(x2)}.`,
          "No. Because linear functions cannot be compared.",
        ];
      }

      break;
    }

    case "less": {
      const x1 = pick([1, 2, 3]);
      const x2 = pick([6, 7, 8]);

      const trueStatement = f(x1) < f(x2);

      prompt = `A function is defined by

f(x) = ${functionText}

A student claims that

f(${x1}) < f(${x2})

Is the student's claim correct?`;

      if (trueStatement) {
        correct = `Yes. Since f(${x1}) = ${f(x1)} and f(${x2}) = ${f(
          x2
        )}, ${f(x1)} < ${f(x2)}.`;

        wrong = [
          "No. The outputs are equal.",
          "No. Smaller inputs always have larger outputs.",
          `Yes. Because ${x1} < ${x2}.`,
          `No. Since ${f(x1)} > ${f(x2)}.`,
        ];
      } else {
        correct = `No. Since f(${x1}) = ${f(x1)} and f(${x2}) = ${f(
          x2
        )}, ${f(x1)} is not less than ${f(x2)}.`;

        wrong = [
          "Yes. Smaller inputs always produce smaller outputs.",
          "Yes. The function is linear.",
          `Yes. Since ${f(x1)} < ${f(x2)}.`,
          "No. Because functions cannot be compared.",
        ];
      }

      break;
    }

    case "double": {
      const x = pick([1, 2, 3, 4]);

      prompt = `A function is defined by

f(x) = ${functionText}

A student claims that

f(${2 * x}) = 2f(${x})

Is the student's claim correct?`;

      const lhs = f(2 * x);
      const rhs = 2 * f(x);

      if (lhs === rhs) {
        correct = `Yes. Both sides equal ${lhs}.`;
      } else {
        correct = `No. Since f(${2 * x}) = ${lhs}, while 2f(${x}) = ${rhs}.`;
      }

      wrong = [
        "Yes. Doubling the input always doubles the output.",
        "Yes. This is true for every linear function.",
        `No. Both sides equal ${lhs}.`,
        `Yes. Because ${2 * x} = 2 × ${x}.`,
      ];

      break;
    }
  }

  return {
    prompt,
    choices: finalizeChoices(correct, wrong),
  };
}