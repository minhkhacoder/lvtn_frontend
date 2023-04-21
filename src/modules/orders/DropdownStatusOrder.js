/** @format */

import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

const DropdownStatusOrder = ({ setStatus }) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    setStatus(event.target.value);
  };
  return (
    <FormControl sx={{ minWidth: 210, minHeight: 40 }}>
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value={""}>
          <em className="text-text2">Search by status</em>
        </MenuItem>
        <MenuItem value={0} className="text-text2">
          Pending
        </MenuItem>
        <MenuItem value={1} className="text-text2">
          Confirmed
        </MenuItem>
        <MenuItem value={2} className="text-text2">
          Shipping
        </MenuItem>
        <MenuItem value={3} className="text-text2">
          Delivered
        </MenuItem>
        <MenuItem value={4} className="text-text2">
          Completed
        </MenuItem>
        <MenuItem value={5} className="text-text2">
          Cancelled
        </MenuItem>
        <MenuItem value={6} className="text-text2">
          Return
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default DropdownStatusOrder;
