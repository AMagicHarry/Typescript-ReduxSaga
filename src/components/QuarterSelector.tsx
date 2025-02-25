import { FC } from "react";
import Select from "react-select";

interface QuarterSelectorProps {
  year: number,
  onChangeYear: (_: number) => void,
  quarter: number,
  onChangeQuarter: (_: number) => void,
}

export const quarters = [
  {
    label: 'Q1',
    value: 1
  },
  {
    label: 'Q2',
    value: 2
  },
  {
    label: 'Q3',
    value: 3
  },
  {
    label: 'Q4',
    value: 4
  },
];

const QuarterSelector: FC<QuarterSelectorProps> = ({
  year,
  quarter,
  onChangeYear,
  onChangeQuarter
}) => {

  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 10 }, (_, i) => ({
    label: currentYear - i,
    value: currentYear - i,
  }));

  return (
    <div className="card p-4 grid grid-cols-2 mb-2 gap-4">
      <div className="">
        <p className="font-bold mb-1 text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
          Year
        </p>
        <Select
          className="text-xs h-8 [&>div]:!min-h-8 [&>div>div:nth-child(2)>div]:!py-0 [&>div>div:nth-child(2)>div]:!px-1"
          placeholder="Select Year..."
          options={years}
          value={years.find((item) => item.value === year)}
          onChange={(e) => onChangeYear(e?.value || 0)}
          styles={{
            input: (base) => ({
              ...base,
              "input:focus": {
                boxShadow: "none",
              },
            })
          }}
        ></Select>
      </div>

      <div className="">
        <p className="font-bold mb-1 text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
          Quarter
        </p>
        <div className="flex gap-x-3">
          {quarters.map((item) => (
            <button
              onClick={() => onChangeQuarter(item.value)}
              className={`flex-1 btn py-1 mt-0.5 shadow ${
                quarter === item.value ? "bg-primary text-white" : ""
              }`}
              key={item.value}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuarterSelector;
