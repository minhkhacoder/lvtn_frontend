/** @format */

import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";

const Chart = () => {
  return <div></div>;
};

export default withErrorBoundary(Chart, {
  FallbackComponent: ErrorComponent,
});
