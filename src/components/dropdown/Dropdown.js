/** @format */

import React from "react";
import PropTypes from "prop-types";
import { DropdownProvider } from "contexts/dropdownContext";

const Dropdown = ({ children, className = "", ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className={`relative inline-block w-full ${className}`}>
        {children}
      </div>
    </DropdownProvider>
  );
};

Dropdown.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Dropdown;
