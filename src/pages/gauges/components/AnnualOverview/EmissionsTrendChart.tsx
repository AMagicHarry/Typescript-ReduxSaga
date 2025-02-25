import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { Gauge } from "@/redux/gauges/reducers";
import { quarters } from "@/components/QuarterSelector";

const EmissionsTrendChart = ({
  gauges,
  year,
}: {
  gauges: Gauge[];
  year: number;
}) => {
  const data = quarters.map((quarter) => {
    return {
      total: gauges.reduce((sum, gauge) => {
        const value = gauge.values.find(
          (item) => item.year === year && item.quarter === quarter.value
        );
        return sum + (value?.value || 0) * gauge.scope;
      }, 0),
      quarter: quarter.label,
    };
  });

  return (
    <div className="card p-6">
      <div>
        <p className="text-lg font-medium mb-2">Annual CO2 Emissions Trend</p>
        <p className="text-md">Total emissions per quarter</p>
      </div>
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#196b24"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmissionsTrendChart;
