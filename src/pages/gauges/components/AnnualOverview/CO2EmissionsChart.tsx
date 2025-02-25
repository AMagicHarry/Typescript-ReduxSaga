import { Gauge } from "@/redux/gauges/reducers";
import {
  Bar,
  BarChart,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const CO2EmissionsChart = ({
  gauges,
  year,
  quarter,
}: {
  gauges: Gauge[];
  year: number;
  quarter: number;
}) => {
  const data = gauges.map((gauge) => ({
    name: gauge.name,
    value:
      (gauge.values.find(
        (item) => item.year === year && item.quarter === quarter
      )?.value || 0) * gauge.scope,
  }));

  return (
    <div className="card p-6">
      <div>
        <p className="text-lg font-medium mb-2">CO2 Emissions</p>
        <p className="text-md">Q{quarter} {year} Overview</p>
      </div>
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              height={120}
              fontSize={14}
              angle={-28}
              textAnchor="end"
            />

            <YAxis />
            <Tooltip />
            <Bar dataKey="value" name="Emissions" fill="#196b24" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CO2EmissionsChart;
