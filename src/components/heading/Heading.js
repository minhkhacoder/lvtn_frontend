/** @format */

import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import styled from "styled-components";

const HeadingStyled = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    font-weight: bold;
    color: ${(props) => props.theme.gray};
    text-transform: uppercase;
  }
  .desc {
    font-size: 12px;
    color: ${(props) => props.theme.darkgray};
  }
`;

const Heading = ({ title, desc, className }) => {
  return (
    <HeadingStyled className={className}>
      <h1 className="title">{title}</h1>
      <p className="desc">{desc}</p>
    </HeadingStyled>
  );
};

export default withErrorBoundary(Heading, {
  FallbackComponent: ErrorComponent,
});
