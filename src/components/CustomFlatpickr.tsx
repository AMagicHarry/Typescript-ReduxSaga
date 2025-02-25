import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/themes/material_blue.css";
import flatpickr from "flatpickr";

interface FlatpickrProps {
  className?: string;
  value?: Date | [Date, Date] | number;
  onChange?: (_: Date) => void;
  options?: any;
  placeholder?: string;
}

const CustomFlatpickr = ({ className, value, options, placeholder, onChange }: FlatpickrProps) => {
  return (
    <>
      <Flatpickr
        className={className}
        data-enable-time
        value={value}
        options={options}
        onChange={onChange ? (e) => onChange(e[0]) : undefined}
        placeholder={placeholder}
      />
    </>
  )
}

export default CustomFlatpickr;