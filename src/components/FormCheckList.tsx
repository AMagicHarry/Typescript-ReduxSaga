import React from "react";

interface FormCheckListProps {
  item: any
  itemIds: number[]
  handleCheckItem: any
}

const FormCheckList: React.FC<FormCheckListProps> = ({ item, itemIds , handleCheckItem }) => {
  return (
    <div key={item.id}>
      <input
        type="checkbox"
        className="form-checkbox text-primary"
        id={`formCheckbox-${item.id}`}
        value={item.id}
        checked={
          itemIds &&
          itemIds.includes(item.id) || false
        }
        onChange={(e) => {
          handleCheckItem(e, item)
        }}
      />
      <label
        className="ms-1.5"
        htmlFor={`formCheckbox-${item.id}`}
      >
        {item.name}
      </label>
    </div>
  )
}

export default FormCheckList;