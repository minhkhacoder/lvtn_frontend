/** @format */

import ErrorComponent from "components/common/ErrorComponent";
import { DropdownProvider } from "contexts/dropdownContext";
import Navbar from "modules/navbar/Navbar";
import Sidebar from "modules/sidebar/Sidebar";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const LayoutDashboardStyled = styled.div`
  display: flex;
  .db-container {
    flex: 6;
  }
`;

const LayoutDashboard = () => {
  return (
    <LayoutDashboardStyled>
      <DropdownProvider>
        <Sidebar></Sidebar>
        <div className="db-container">
          <Navbar></Navbar>
          <Outlet></Outlet>
        </div>
      </DropdownProvider>
    </LayoutDashboardStyled>
  );
};

export default withErrorBoundary(LayoutDashboard, {
  FallbackComponent: ErrorComponent,
});
