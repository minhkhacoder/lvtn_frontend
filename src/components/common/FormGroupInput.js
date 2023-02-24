/** @format */

import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./ErrorComponent";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const FormGroupInput = ({
  title,
  label,
  children,
  value,
  className = "",
  placeholder = "",
  type = "text",
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-2">
      {title}
      <TextField
        type={type}
        label={label}
        value={value}
        fullWidth={true}
        color="secondary"
        size="small"
        placeholder={placeholder}
        className={className}
      >
        {children}
      </TextField>
    </div>
  );
};

FormGroupInput.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default withErrorBoundary(FormGroupInput, {
  FallbackComponent: ErrorComponent,
});
