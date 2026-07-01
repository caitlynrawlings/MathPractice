import { pick, numericChoices } from "@/lib/utils";

export default function genIceCreamScatter() {
  const baseSlopes = [8, 10, 12, 15];
  const baseIntercepts = [250, 300, 350];

  const m = pick(baseSlopes);
  const b = pick(baseIntercepts);

  const targetTemp = pick([18, 19, 20, 21, 22, 23, 24, 25]);

  // scatter data (IMPORTANT: x must be numeric for proper chart rendering)
  const temps = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28];

  const data = temps.map((t) => {
    const noise = pick([-30, -20, -10, 0, 10, 20, 30]);
    return {
      temperature: t,
      sales: m * t + b + noise,
    };
  });

  const correct = Math.round(m * targetTemp + b);

  const wrong = [
    Math.round(m * targetTemp + b + 50),
    Math.round(m * targetTemp + b - 50),
    Math.round(b + targetTemp),
    Math.round(m * targetTemp),
  ];

  const lineData = temps.map((t) => ({
  x: t,
  y: m * t + b,
}));

 const chart = {
  chartType: "scatter",

  meta: {
    title: "Ice Cream Sales vs Temperature",
    description: "Relationship between temperature and daily ice cream sales.",
  },

  xKey: "temperature",
  xAxisLabel: "Temperature (°C)",

  series: [
    {
      dataKey: "sales",
      label: "Sales ($)",
      valueFormat: "integer",
      valuePrefix: "$",
    },
  ],

  data,

  // 🔥 THIS is what enables best-fit line in SVG system
  trendline: {
    type: "linear"
  },

  // 🔥 dense grid control (SVG system supports this)
  grid: {
    xStep: 1,
    yStep: 50
  },

  interaction: {
    tooltip: false,
    hover: false
  }
};

  return {
    prompt: {
      text: `The scatterplot shows the relationship between ice cream shop sales and temperature. Based on the best-fit trend, which is the best estimate of sales when the temperature is ${targetTemp}°C?`,
      chart,
    },
    choices: numericChoices(
      correct,
      wrong,
      (n) => `$${n.toLocaleString()}`,
      5
    ),
  };
}