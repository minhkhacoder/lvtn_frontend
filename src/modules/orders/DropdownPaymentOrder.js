/** @format */

import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

const DropdownPaymentOrder = ({ setPayment }) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    setPayment(event.target.value);
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
          <em className="text-text2">Search by Payment</em>
        </MenuItem>
        <MenuItem value={"PAY01"} className="text-text2">
          COD
        </MenuItem>
        <MenuItem value={"PAY02"} className="text-text2">
          Stripe
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default DropdownPaymentOrder;
