import {
  ScatterChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ChartsRenderer({ spec }) {
  if (!spec?.data) return null;

  const yKey = spec.series?.[0]?.dataKey;

  // OPTIONAL: best-fit line support
  const lineData = spec.bestFitLine;
  console.log(lineData)

  return (
    <div style={{ width: "100%", height: 340 }}>
      <ResponsiveContainer>
        <ScatterChart>

          {/* GRID: dense integer grid */}
          <CartesianGrid
            strokeDasharray="0"
            vertical={true}
            horizontal={true}
          />

          {/* X axis: integer ticks */}
          <XAxis
            type="number"
            dataKey={spec.xKey}
            domain={["0", "dataMax + 2"]}
            tickCount={10}
          />

          {/* Y axis: integer ticks */}
          <YAxis
            type="number"
            dataKey={yKey}
            domain={["0", "dataMax + 50"]}
            tickCount={10}
          />

          {/* SCATTER POINTS */}
          <Scatter
            data={spec.data}
            dataKey={yKey}
            fill="#3b82f6"
          />

          {/* BEST FIT LINE (optional) */}
          {lineData && (
            <Line
              type="linear"
              data={lineData}
              dataKey="y"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          )}

        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}