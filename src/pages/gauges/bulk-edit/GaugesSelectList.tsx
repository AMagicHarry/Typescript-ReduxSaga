import { format } from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { Gauge } from "@/redux/gauges/reducers.ts";

const GaugesSelectList = () => {
  const { gauges, loading, error } = useSelector(
    (state: RootState) => ({
      gauges: state.Gauge.gauges,
      loading: state.Gauge.loading,
      error: state.Gauge.error,
    })
  );

  const [selectedGauges, setSelectedGauges] = useState<number[]>([])

  const handleSelectGauge = (id: number) => {
    setSelectedGauges(selectedGauges.includes(id) ? selectedGauges.filter((item) => item !== id) : [...selectedGauges, id])
  }

  return (
    <div className="flex-1">
      <div className="p-4 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        {gauges.map((gauge: Gauge) => (
          <div
            key={gauge.id}
            onClick={() => handleSelectGauge(gauge.id)}
            className="rounded-md border cursor-pointer border-gray-300 px-4 py-3 relative flex flex-col"
          >
            <div className="flex items-center gap-2 mb-1">
              <input
                className="form-checkbox rounded text-primary"
                type="checkbox"
                checked={selectedGauges.includes(gauge.id)}
              />
              <p className="font-bold mr-1">{gauge.name}</p>
            </div>
            <div className="text-primary text-xs whitespace-nowrap">
              {format(new Date(gauge.started_on), "yyyy MMM")} ~{" "}
              {gauge.ended_on && format(new Date(gauge.ended_on), "yyyy MMM")}
            </div>
            <p className="mb-1 text-xs">{gauge.description}</p>
            <div className="mb-1">
              {gauge.entities.map((entity) => (
                <div
                  key={entity.id}
                  className="inline-block text-blue-400 border border-blue-400 text-xs rounded px-1 py-0.5"
                >
                  {entity.name}
                </div>
              ))}
            </div>
            <div className="flex items-center flex-wrap">
              {gauge.categories?.map((category) => (
                <div
                  className="text-primary text-xs font-bold flex items-center"
                  key={category.id}
                >
                  <div className="rounded-full mx-2 w-1 h-1 bg-primary"></div>
                  <span className="whitespace-nowrap">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaugesSelectList;
