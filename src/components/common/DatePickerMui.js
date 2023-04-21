/** @format */

import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider } from "@mui/material";
import { themeMaterial } from "utils/constants";

export default function DatePickerMui({ selectDate }) {
  const [value, setValue] = React.useState("");

  return (
    <ThemeProvider theme={themeMaterial}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            let formattedValue = dayjs(newValue.$d).format("YYYY-MM-DD");
            selectDate(formattedValue);
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
