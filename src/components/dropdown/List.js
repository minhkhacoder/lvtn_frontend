/** @format */

import React from "react";
import PropTypes from "prop-types";
import { useDropdown } from "contexts/dropdownContext";
import styled from "styled-components";

const ListStyled = styled.div`
  position: relative;
  z-index: 50;
  top: 100%;
  padding: 5px;
`;

const List = ({ children, className = "", open, props }) => {
  const { show } = useDropdown();

  return (
    <>
      {show && <ListStyled className={`${className}`}>{children}</ListStyled>}
    </>
  );
};

List.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  display: PropTypes.bool,
  show: PropTypes.bool,
  open: PropTypes.bool,
};

export default List;
