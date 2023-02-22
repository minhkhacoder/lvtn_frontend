/** @format */

import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import styled from "styled-components";

const HelpOutlineStyled = styled.div`
  color: ${(props) => props.theme.darkgray};
  cursor: pointer;
`;

const HelpOutline = ({ className }) => {
  return (
    <HelpOutlineStyled className={className}>
      <HelpOutlineIcon fontSize="small" />
    </HelpOutlineStyled>
  );
};

export default withErrorBoundary(HelpOutline, {
  FallbackComponent: ErrorComponent,
});
