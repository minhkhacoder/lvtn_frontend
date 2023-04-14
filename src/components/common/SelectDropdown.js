/** @format */

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { theme } from "utils/constants";
import PropTypes from "prop-types";

const SelectDropdown = ({ data, placeholder, onSelect, initialValue }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    onSelect(selectedOptions);
  };

  useEffect(() => {
    if (initialValue) setSelectedOptions(initialValue);
  }, [initialValue]);

  const options = data?.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  return (
    <div>
      <Select
        placeholder={placeholder}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        isSearchable={true}
        isClearable={true}
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
          clearIndicator: (base) => ({
            ...base,
            color: theme.secondary,
          }),
        }}
      />
    </div>
  );
};
SelectDropdown.propTypes = {
  data: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default SelectDropdown;
