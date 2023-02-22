/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDropdown } from "contexts/dropdownContext";
import styled from "styled-components";

const OptionStyled = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.theme.gray};
`;

const Option = ({
  className = "",
  onClick = () => {},
  children = "",
  to = "",
}) => {
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  if (to) {
    return (
      <OptionStyled className={`${className}`}>
        <Link to={to} style={{ display: "block" }}>
          {children}
        </Link>
      </OptionStyled>
    );
  }
  return (
    <div className={`${className}`} onClick={handleClick}>
      {children}
    </div>
  );
};

Option.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  setShow: PropTypes.bool,
  className: PropTypes.string,
  to: PropTypes.string,
};

export default Option;
