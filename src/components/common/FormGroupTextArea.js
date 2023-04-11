/** @format */

import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./ErrorComponent";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const FormGroupTextArea = ({
  label,
  value,
  id,
  name,
  className = "",
  placeholder = "",
  type = "text",
  minRows = 1,
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-2">
      <TextField
        id={id}
        name={name}
        type={type}
        label={label}
        value={value}
        className={className}
        color="secondary"
        multiline
        minRows={minRows}
        size="auto"
        placeholder={placeholder}
        fullWidth={true}
      />
    </div>
  );
};

FormGroupTextArea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  minRows: PropTypes.number,
};

export default withErrorBoundary(FormGroupTextArea, {
  FallbackComponent: ErrorComponent,
});
