import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Gauge, GaugeValueStatus } from "@/redux/gauges/reducers";
import { toast } from "@/hooks/use-toast";
import { approveGauges, getGauges, resetGauges } from "@/redux/actions";
import { useDispatch } from "react-redux";
import GaugeCard from "./GaugeCard";

const GaugesApproveList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { gauges, success, filter, year, quarter } = useSelector(
    (state: RootState) => ({
      gauges: state.Gauge.gauges,
      loading: state.Gauge.loading,
      error: state.Gauge.error,
      success: state.Gauge.approveSuccess,
      filter: state.Gauge.filter,
      year: state.Gauge.year,
      quarter: state.Gauge.quarter,
    })
  );

  const [selectedGauges, setSelectedGauges] = useState<number[]>([]);

  const handleSelectGauge = (gauge: Gauge) => {
    setSelectedGauges(
      selectedGauges.includes(gauge.id)
        ? selectedGauges.filter((item) => item !== gauge.id)
        : [...selectedGauges, gauge.id]
    );
  };

  useEffect(() => {
    dispatch(resetGauges());
    if (success) {
      toast({
        title: "Gauges were approved successfully",
      });
      dispatch(getGauges(filter));
    }
  }, [success]);

  const handleApprove = () => {
    if (selectedGauges.length) {
      dispatch(approveGauges(selectedGauges, year, quarter));
    }
  };

  const handleApproveAll = () => {
    if (gauges.length) {
      dispatch(
        approveGauges(
          gauges?.map((gauge: Gauge) => gauge.id),
          year,
          quarter
        )
      );
    }
  };

  const filteredGauges = gauges.filter((item: Gauge) =>
    item.values.some(
      (value) =>
        value.quarter === quarter &&
        value.year === year &&
        value.status === GaugeValueStatus.DRAFT
    )
  );

  return (
    <div>
      <div className="flex justify-end px-4 gap-2">
        <button
          onClick={handleApprove}
          type="button"
          disabled={!selectedGauges.length}
          className="btn bg-primary disabled:bg-gray-300 text-white"
        >
          Approve
        </button>
        <button
          onClick={handleApproveAll}
          disabled={!gauges.length}
          type="button"
          className="btn bg-primary disabled:bg-gray-300 text-white"
        >
          Approve All
        </button>
      </div>
      <div className="p-4 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        {filteredGauges?.map((gauge: Gauge) => (
          <GaugeCard
            key={gauge.id}
            gauge={gauge}
            onSelect={handleSelectGauge}
            selectable
            selected={selectedGauges.includes(gauge.id)}
          />
        ))}
      </div>
      {!filteredGauges.length && (
        <p className="text-center py-4">No items to approve.</p>
      )}
    </div>
  );
};

export default GaugesApproveList;
