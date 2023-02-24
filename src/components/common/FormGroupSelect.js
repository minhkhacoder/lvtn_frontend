/** @format */

import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./ErrorComponent";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const FormGroupSelect = ({ title, label, children, value, className = "" }) => {
  return (
    <div className="flex flex-col items-start justify-between gap-2">
      {title}
      <TextField
        type="text"
        label={label}
        select
        value={value}
        fullWidth={true}
        color="secondary"
        size="small"
        className={className}
      >
        {children}
      </TextField>
    </div>
  );
};

FormGroupSelect.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.object,
  value: PropTypes.string,
  className: PropTypes.string,
};

export default withErrorBoundary(FormGroupSelect, {
  FallbackComponent: ErrorComponent,
});
