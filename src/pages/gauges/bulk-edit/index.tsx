import { PageBreadcrumb } from "@/components";
import GaugeFilter from "../components/GaugeFilter";

import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import {
  OptionIcon,
  BoxSelectIcon,
  FingerprintIcon,
  BoxIcon,
} from "lucide-react";
import GaugesSelectList from "./GaugesSelectList.tsx";

const GaugesBulkEdit = () => {
  const steps = [
    {
      title: "Select Gauges",
      icon: BoxSelectIcon,
    },
    {
      title: "Properties",
      icon: OptionIcon,
    },
    {
      title: "Categories",
      icon: BoxIcon,
    },
    {
      title: "Finalize",
      icon: FingerprintIcon,
    },
  ];

  const [selectedGauges, setSelectedGauges] = useState<number[]>([]);

  const handleSelectGauge = (id: number) => {
    setSelectedGauges(
      selectedGauges.includes(id)
        ? selectedGauges.filter((item) => item !== id)
        : [...selectedGauges, id]
    );
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <PageBreadcrumb
          title="Gauges"
          name="Gauges"
          breadCrumbItems={["Gauges", "Bulk Edit"]}
        />

        <div className="flex gap-3 mx-auto flex-1">
          <GaugeFilter />

          <div className="card flex-1 pt-6 h-full flex flex-col">
            <ProgressBar steps={steps} currentStep={0} />

            <GaugesSelectList />

            <div className="flex justify-between px-4 pb-4">
              <button
                className="btn border-gray-400 text-xs px-2 py-1"
              >
                <i className="mgc_arrow_left_fill mr-1"></i>
                Previous Step
              </button>
              <button
                className="btn border-gray-400 text-xs px-2 py-1"
              >
                Next Step
                <i className="mgc_arrow_right_fill ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GaugesBulkEdit;
