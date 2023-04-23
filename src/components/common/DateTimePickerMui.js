/** @format */

import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ThemeProvider } from "@mui/material";
import { themeMaterial } from "utils/constants";

export default function DateTimePickerMui({ selectDate, className = "" }) {
  const [value, setValue] = React.useState("");

  return (
    <ThemeProvider theme={themeMaterial}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          className={className}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            let formattedValue = dayjs(newValue.$d).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            selectDate(formattedValue);
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
