import { PageBreadcrumb } from "@/components";
import PercentageDistributionChart from "@/pages/gauges/components/AnnualOverview/PercentageDistributionChart.tsx";
import EmissionsOvertimeChart from "@/pages/gauges/components/AnnualOverview/EmissionsOvertimeChart.tsx";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import QuarterSelector from "@/components/QuarterSelector";
import GaugeFilter from "../gauges/components/GaugeFilter";
import { updateQuarter, updateYear } from "@/redux/actions";
import { Gauge } from "@/redux/gauges/reducers";
import CO2EmissionsChart from "../gauges/components/AnnualOverview/CO2EmissionsChart";

const ChartList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { year, quarter, gauges } = useSelector((state: RootState) => ({
    year: state.Gauge.year,
    quarter: state.Gauge.quarter,
    gauges: state.Gauge.gauges,
  }));

  const setYear = (year: number) => {
    dispatch(updateYear(year));
  };

  const setQuartar = (quarter: number) => {
    dispatch(updateQuarter(quarter));
  };

  gauges.forEach((gauge: Gauge) => {});

  return (
    <>
      <div className="flex justify-between">
        <PageBreadcrumb title="My Charts" name="My Charts" />
      </div>

      <div className="flex gap-3 mx-auto">
        <GaugeFilter />

        <div className="flex-1">
          <QuarterSelector
            year={year}
            quarter={quarter}
            onChangeYear={setYear}
            onChangeQuarter={setQuartar}
          />
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="col-span-2">
              <EmissionsOvertimeChart year={year} gauges={gauges} />
            </div>
            <CO2EmissionsChart year={year} quarter={quarter} gauges={gauges} />
            <PercentageDistributionChart year={year} gauges={gauges} />

            {/* <EmissionsTrendChart year={year} gauges={gauges} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartList;
