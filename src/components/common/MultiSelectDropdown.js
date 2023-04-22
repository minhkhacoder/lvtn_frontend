/** @format */

import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { theme } from "utils/constants";
import PropTypes from "prop-types";

const MultiSelectDropdown = ({
  data,
  placeholder,
  onSelect,
  initialValue,
  handleCreateOption,
}) => {
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
    options: item.childrens
      ? item.childrens.map((child) => ({
          value: child.id,
          label: child.label,
        }))
      : [],
  }));

  return (
    <div>
      <CreatableSelect
        placeholder={placeholder}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        isSearchable={true}
        isClearable={true}
        onCreateOption={handleCreateOption}
        createOptionPosition="first"
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

MultiSelectDropdown.propTypes = {
  data: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  handleCreateOption: PropTypes.func,
};

export default MultiSelectDropdown;
