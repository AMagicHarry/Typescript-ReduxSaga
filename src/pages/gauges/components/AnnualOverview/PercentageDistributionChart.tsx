import { QUARTER_COLORS } from "@/constants/colors";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
  ReferenceLine,
} from "recharts";
import { Gauge } from "@/redux/gauges/reducers";
import { quarters } from "@/components/QuarterSelector";

const PercentageDistributionChart = ({ gauges, year }: { gauges: Gauge[], year: number }) => {
  const data = gauges.map((gauge) => {
    const total = gauge.values.filter((item) => item.year === year).reduce((sum, item) => sum + item.value, 0) || 1;

    return quarters.reduce((res, quarter) => ({
      ...res,
      [quarter.label]: (gauge.values.find((item) => item.year === year && item.quarter === quarter.value)?.value || 0)  * 100 / total
    }), { gauge: gauge.name });
  })

  return (
    <div className="card p-6 h-full">
      <div>
        <p className="text-lg font-medium mb-2">Distribution by Quarter</p>
        <p className="text-md">
          Percentage distribution of CO2 emissions
        </p>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis
              dataKey="gauge"
              height={100}
              fontSize={13}
              angle={-28}
              textAnchor="end"
            />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => `${(+value).toFixed(2)}%`} />
            <Legend />

            {Object.entries(QUARTER_COLORS).map(([quarter, color]) => (
              <Bar
                key={quarter}
                stackId="a"
                dataKey={quarter}
                fill={color}
                name={quarter}
              >
                <LabelList
                  dataKey={quarter}
                  content={({
                    x = 0,
                    y = 0,
                    width = 0,
                    height = 0,
                    value = 0,
                  }) => (
                    <text
                      x={+x + +width / 2}
                      y={+y + +height / 2 + 6}
                      fill="white"
                      color="white"
                      fontSize={13}
                      textAnchor="middle"
                    >
                      {!!value && `${Math.round(+value)}%`}
                    </text>
                  )}
                />
              </Bar>
            ))}

            {data.map((item) => (
              <ReferenceLine
                key={item.gauge}
                x={item.gauge}
                position="end"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PercentageDistributionChart;
