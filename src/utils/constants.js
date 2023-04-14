/** @format */
import { createTheme } from "@mui/material/styles";
export const theme = {
  primary: "#6002ee",
  secondary: "#7e3ff2",
  third: "#9965f4",
  four: "#b794f6",
  five: "#d4bff9",
  six: "#efe5fd",
  text: "#000",
  text1: "#808080",
  text2: "#A9A9A9",
  text3: "#E6E3E3",
};

export const themeMaterial = createTheme({
  palette: {
    primary: {
      main: "#6002ee",
    },
    secondary: {
      main: "#7e3ff2",
    },
    third: {
      main: "#9965f4",
    },
    darkgray: {
      main: "#A9A9A9",
    },
    dimgray: {
      main: "#696969",
    },
    gray: {
      main: "#808080",
    },
    gainsboro: {
      main: "#E6E3E3",
    },
    red: {
      main: "red",
    },
    yellow: {
      main: "#FFC107",
    },
    orange: {
      main: "#FF9800",
    },
    blue: {
      main: "#2196F3",
    },
    green: {
      main: "#4CAF50",
    },
  },
});
