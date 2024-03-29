/** @format */

import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./ErrorComponent";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const FormGroupInput = ({
  title,
  id,
  label,
  name,
  children,
  value,
  className = "",
  placeholder = "",
  type = "text",
  onChange,
  // Thêm props onChange
}) => {
  return (
    <div
      className={`flex flex-col items-start justify-between gap-2 ${className}`}
    >
      {title}
      <TextField
        id={id}
        name={name}
        type={type}
        label={label}
        value={value}
        fullWidth={true}
        color="secondary"
        size="small"
        placeholder={placeholder}
        className={className}
        onChange={onChange}
      >
        {children}
      </TextField>
    </div>
  );
};

FormGroupInput.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default withErrorBoundary(FormGroupInput, {
  FallbackComponent: ErrorComponent,
});
