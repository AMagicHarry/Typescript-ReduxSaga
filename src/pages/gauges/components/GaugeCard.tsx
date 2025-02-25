import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Gauge } from "@/redux/gauges/reducers";
import { AppDispatch, RootState } from "@/redux/store";
import { updateGaugeValue } from "@/helpers";
import { getGauges } from "@/redux/actions";
import { toast } from "@/hooks/use-toast";

interface GaugeCardProps {
  gauge: Gauge;
  onInfo?: (_: Gauge) => void;
  onComment?: (_: Gauge) => void;
  onEdit?: (_: Gauge) => void;
  onSelect?: (_: Gauge) => void;
  selectable?: boolean;
  selected?: boolean;
  editable?: boolean;
  hideCategory?: boolean;
}

const GaugeCard: FC<GaugeCardProps> = ({
  gauge,
  onInfo,
  onComment,
  onEdit,
  onSelect,
  selectable,
  selected,
  editable,
  hideCategory,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, quarter, year, filter } = useSelector((state: RootState) => ({
    user: state.Auth.user,
    quarter: state.Gauge.quarter,
    year: state.Gauge.year,
    filter: state.Gauge.filter,
  }));

  const defaultValue =
    gauge.values.find((item) => item.quarter === quarter && item.year === year)
      ?.value || 0;

  const [measuredValue, setMeasuredValue] = useState<number>(defaultValue);

  useEffect(() => {
    setMeasuredValue(defaultValue);
  }, [defaultValue]);

  const handleSaveGaugeValue = () => {
    updateGaugeValue(gauge.id, {
      year,
      quarter,
      value: measuredValue,
    }).then(() => {
      toast({
        title: "Gauge Updated",
        description: "Gauge value updated successfully!",
      });
      dispatch(getGauges(filter));
    });
  };

  return (
    <div
      onClick={() => (onSelect ? onSelect(gauge) : {})}
      className="rounded-md border border-gray-300 px-4 py-3 relative flex flex-col"
    >
      {selectable && (
        <div className="flex items-center gap-2 mb-1">
          <input
            className="form-checkbox rounded text-primary"
            type="checkbox"
            checked={selected}
          />
          <p className="font-bold mr-1">{gauge.name}</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-1">
        <p className="font-bold">{gauge.name}</p>

        <div className="flex gap-2 -mr-1">
          {onInfo && (
            <button
              className="btn btn-primary shadow px-2 py-1"
              onClick={() => onInfo(gauge)}
            >
              <i className="mgc_information_line"></i>
            </button>
          )}
          {onEdit &&
            user.roles.some(
              (role: { id: number; name: string }) => role.name === "admin"
            ) && (
              <button className="btn btn-primary shadow px-2 py-1">
                <i className="mgc_edit_line"></i>
              </button>
            )}
          {onComment && (
            <button
              className="btn btn-primary shadow px-2 py-1"
              onClick={() => onComment(gauge)}
            >
              <i className="mgc_comment_line"></i>
            </button>
          )}
        </div>
      </div>

      <p className="mb-1 text-xs">{gauge.description}</p>

      <div className="mb-1">
        {gauge.entities?.map((entity) => (
          <div
            key={entity.id}
            className="inline-block text-blue-400 border border-blue-400 text-xs rounded px-1 py-0.5"
          >
            {entity.name}
          </div>
        ))}
      </div>

      {!hideCategory && (
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
      )}

      <div className="pt-3 flex-1 flex flex-col justify-end">
        <div className="flex pb-1">
          <div className="cursor-pointer inline-flex items-center px-2 rounded-s border border-r-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
            {gauge.unit}
          </div>
          <input
            type="number"
            min={0}
            className={`form-input rounded-none ${!editable ? 'rounded-r': ''} disabled:bg-gray-100 py-1.5 text-xs`}
            value={measuredValue.toString()}
            onChange={(e) => setMeasuredValue(+e.target.value)}
            disabled={!editable}
          />
          {editable && (
            <button
              className="cursor-pointer bg-primary disabled:bg-gray-300 inline-flex items-center px-2 rounded-e border-r border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400"
              onClick={handleSaveGaugeValue}
              disabled={defaultValue === measuredValue}
            >
              <i className="mgc_save_line mx-3 text-white"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GaugeCard;
