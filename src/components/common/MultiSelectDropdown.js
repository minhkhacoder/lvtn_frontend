/** @format */

import React, { useState } from "react";
import Select from "react-select";
import { theme } from "utils/constants";

const MultiSelectDropdown = ({ data, placeholder }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const options = data?.map((item) => ({
    value: item.id,
    label: item.label,
    options: item.childrens
      ? item.childrens.map((child) => ({
          value: child.id,
          label: child.label,
        }))
      : [],
  }));

  return (
    <div>
      <Select
        placeholder={placeholder}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        styles={{
          control: (base, { isFocused }) => ({
            ...base,
            backgroundColor: "white",
            color: theme.text,
            outline: isFocused ? `1.5px solid #9965f4` : "none",
          }),
          option: (styles, { isSelected }) => ({
            ...styles,
            backgroundColor: isSelected ? theme.five : null,
            color: theme.text,
            "&:hover": {
              backgroundColor: theme.six,
            },
            "&:focus": { outline: `2px solid ${theme.primary}` },
          }),
        }}
      />
    </div>
  );
};

export default MultiSelectDropdown;
