import { COLORS } from "@/constants/colors";
import { Gauge } from "@/redux/gauges/reducers";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  CartesianGrid,
  Area,
} from "recharts";
import { quarters } from "@/components/QuarterSelector";

const EmissionsOvertimeChart = ({ gauges, year }: { gauges: Gauge[], year: number }) => {

  const data = quarters.map((quarter) => {
    return {
      ...gauges.reduce((res, gauge) => {
        const value = gauge.values.find(
          (item) => item.year === year && item.quarter === quarter.value
        );
        return {
          ...res,
          [gauge.id]: {
            name: gauge.name,
            value: (value?.value || 0) * gauge.scope1
          }
        };
      }, {}),
      quarter: quarter.label,
    };
  });

  return (
    <div className="card p-6">
      <div>
        <p className="text-lg font-medium mb-2">
          Cumulative CO2 Emissions Over Time
        </p>
        <p className="text-md">
          Quarterly progression of emissions
        </p>
      </div>
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Legend />
            {gauges.map((gauge, index) => (
              <Area
                key={gauge.id}
                type="monotone"
                dataKey={`${gauge.id}.value`}
                stackId="1"
                stroke={COLORS[index % COLORS.length]}
                fill={COLORS[index % COLORS.length]}
                fillOpacity={1}
                name={gauge.name}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmissionsOvertimeChart;
