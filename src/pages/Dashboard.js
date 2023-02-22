/** @format */

import Chart from "modules/chart/Chart";
import Featured from "modules/featured/Featured";
import Heading from "components/heading/Heading";
import ListWork from "modules/listwork/ListWork";
import Navbar from "modules/navbar/Navbar";
import Sidebar from "modules/sidebar/Sidebar";
import Widget from "modules/widget/Widget";
import React from "react";
import styled from "styled-components";
import { DropdownProvider } from "contexts/dropdownContext";

const data = [
  {
    id: 1,
    count: 0,
    name: "To Be Confirmed",
  },
  {
    id: 2,
    count: 0,
    name: "To Be Picked Up",
  },
  {
    id: 3,
    count: 0,
    name: "Processed",
  },
  {
    id: 4,
    count: 0,
    name: "Received",
  },
  {
    id: 5,
    count: 0,
    name: "Cancelled",
  },
  {
    id: 6,
    count: 0,
    name: "Return / Refund",
  },
  {
    id: 7,
    count: 0,
    name: "product temporarily blocked",
  },
  {
    id: 8,
    count: 0,
    name: "out of stock",
  },
];

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
    padding: 20px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    .list-title {
      font-weight: bold;
      color: ${(props) => props.theme.gray};
      text-transform: uppercase;
      margin-bottom: 15px;
    }
  }
`;

const Dashboard = () => {
  return (
    <DashboardStyled>
      <DropdownProvider>
        <Sidebar></Sidebar>
      </DropdownProvider>
      <div className="db-container">
        <Navbar></Navbar>
        <div className="widgets">
          <Widget type="visits"></Widget>
          <Widget type="views"></Widget>
          <Widget type="orders"></Widget>
          <Widget type="rate"></Widget>
        </div>

        <div className="list-container card-shadow">
          <Heading
            title={"List work"}
            desc={"Things you will have to do"}
          ></Heading>
          <ListWork data={data}></ListWork>
        </div>
        <div className="charts">
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1}></Chart>
          <Featured></Featured>
        </div>
      </div>
    </DashboardStyled>
  );
};

export default Dashboard;
