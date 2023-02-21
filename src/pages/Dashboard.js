/** @format */

import Chart from "components/chart/Chart";
import Featured from "components/featured/Featured";
import Navbar from "components/navbar/Navbar";
import Sidebar from "components/sidebar/Sidebar";
import Widget from "components/widget/Widget";
import React from "react";
import styled from "styled-components";

const DashboardStyled = styled.div`
  display: flex;
  .db-container {
    flex: 6;
  }
  .widgets,
  .charts {
    display: flex;
    padding: 20px;
    gap: 20px;
  }

  .charts {
    padding: 5px 20px;
  }

  .list-container {
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    padding: 20px;
    margin: 20px;

    .list-title {
      font-weight: 500;
      color: gray;
      margin-bottom: 15px;
    }
  }
`;

const Dashboard = () => {
  return (
    <DashboardStyled>
      <Sidebar></Sidebar>
      <div className="db-container">
        <Navbar></Navbar>
        <div className="widgets">
          <Widget type="visits"></Widget>
          <Widget type="views"></Widget>
          <Widget type="orders"></Widget>
          <Widget type="rate"></Widget>
        </div>
        <div className="charts">
          <Featured></Featured>
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1}></Chart>
        </div>
      </div>
    </DashboardStyled>
  );
};

export default Dashboard;
