import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GaugeInfoDialog from "./GaugeInfoDialog";
import { RootState } from "@/redux/store.ts";
import { Gauge } from "@/redux/gauges/reducers.ts";

import GaugeCard from "./GaugeCard";
import CommentDialog from "./CommentDialog";

const GaugesList = () => {
  const { gauges, loading, error } = useSelector((state: RootState) => ({
    gauges: state.Gauge.gauges,
    loading: state.Gauge.loading,
    error: state.Gauge.error,
    filter: state.Gauge.filter,
  }));

  const [selectedGauge, setSelectedGauge] = useState<Gauge | null>(null);
  const [isOpenCommentDialog, setIsOpenCommentDialog] = useState(false);
  const [isOpenInfoDialog, setIsOpenInfoDialog] = useState(false);
  const [existingCategories, setExistingCategories] = useState<any>({});

  const toggleCommentDialog = (gauge?: Gauge) => {
    setSelectedGauge(gauge ? gauge : null);
    setIsOpenCommentDialog(!!gauge);
  };

  const toggleInfoDialog = (gauge?: Gauge) => {
    setSelectedGauge(gauge ? gauge : null);
    setIsOpenInfoDialog(!!gauge);
  };

  useEffect(() => {
    let categories: any = {};
    gauges?.forEach((gauge: Gauge) => {
      const key =
        gauge.categories?.reduce(
          (res, category) => `${res}-${category.id}`,
          ""
        ) || "";
      if (categories[key]) {
        categories[key].gauges = [...categories[key].gauges, gauge];
      } else {
        categories[key] = {
          categories: gauge.categories,
          gauges: [gauge],
        };
      }
    });
    setExistingCategories(categories);
  }, [gauges]);

  return (
    <div className="relative pt-4">
      {
        loading && (
          <div className="absolute z-10 left-1/2 top-[45vh]">
            <div className="flex justify-center items-center">
              <div
                className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-primary rounded-full"
                role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        )
      }

      {Object.keys(existingCategories).map((key) => (
        <div key={key}>
          <div className="flex items-center flex-wrap text-xs bg-blue-500 px-4">
            {existingCategories[key].categories?.map((category: any, index: number) => (
              <div
                className="font-bold flex items-center text-white py-1.5"
                key={category.id}
              >
                {!!index && <i className="mgc_add_circle_line mx-1" />}
                <span className="whitespace-nowrap">{category.name}</span>
              </div>
            ))}
          </div>

          <div className="px-4 pt-3 pb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {existingCategories[key].gauges?.map((gauge: Gauge) => (
              <GaugeCard
                key={gauge.id}
                gauge={gauge}
                onInfo={toggleInfoDialog}
                onComment={toggleCommentDialog}
                onEdit={() => {}}
                hideCategory
                editable
              />
            ))}
          </div>
        </div>
      ))}

      <CommentDialog
        open={isOpenCommentDialog}
        toggleModal={() => toggleCommentDialog()}
        gauge={selectedGauge}
        type="Gauge"
      />
      <GaugeInfoDialog
        open={isOpenInfoDialog}
        toggleModal={() => toggleInfoDialog()}
        gauge={selectedGauge}
      />
    </div>
  );
};

export default GaugesList;
