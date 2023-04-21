/** @format */

import ErrorComponent from "components/common/ErrorComponent";
import { DropdownProvider } from "contexts/dropdownContext";
import Navbar from "modules/navbar/Navbar";
import Sidebar from "modules/sidebar/Sidebar";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUser } from "utils/cookies";
import { useEffect } from "react";

const LayoutDashboardStyled = styled.div`
  display: flex;
  .db-container {
    flex: 6;
  }
`;

const LayoutDashboard = () => {
  const user = getUser() === undefined ? undefined : JSON.parse(getUser());
  const naviagte = useNavigate();
  useEffect(() => {
    if (!user?.seller_id) naviagte("/login");
  }, [naviagte, user?.seller_id]);
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
