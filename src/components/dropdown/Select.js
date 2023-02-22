/** @format */

import React from "react";
import PropTypes from "prop-types";
import { useDropdown } from "contexts/dropdownContext";
import styled from "styled-components";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SelectStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 12px;
  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
  li {
    display: flex;
    align-items: center;
    padding: 5px;
    cursor: pointer;
    span {
      font-size: 13px;
      font-weight: 600;
      color: ${(props) => props.theme.gray};
      margin-left: 10px;
    }
  }
`;

const Select = ({ placeholder = "", className = "", children = "" }) => {
  const { toggle, show } = useDropdown();
  return (
    <SelectStyled className="select" onClick={toggle}>
      <li>
        {children}
        <span>{placeholder}</span>
      </li>
      {show ? (
        <KeyboardArrowUpIcon fontSize="small" className="text-gray" />
      ) : (
        <KeyboardArrowDownIcon fontSize="small" className="text-gray" />
      )}
    </SelectStyled>
  );
};

Select.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  toggle: PropTypes.func,
  show: PropTypes.string,
  iconRight: PropTypes.string,
  children: PropTypes.object,
};

export default Select;
