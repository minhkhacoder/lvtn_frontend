/** @format */

import Chart from "modules/chart/Chart";
import Featured from "modules/featured/Featured";
import Heading from "components/heading/Heading";
import ListWork from "modules/listwork/ListWork";
import Widget from "modules/widget/Widget";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUser } from "utils/cookies";
import { useDispatch, useSelector } from "react-redux";
import { getRevenueIntervalSixMonth } from "store/actions/revenuesAction";

const data = [
  {
    id: 1,
    count: 0,
    name: "Pending confirmation",
  },
  {
    id: 2,
    count: 0,
    name: "Confirmed",
  },
  {
    id: 3,
    count: 0,
    name: "Processing",
  },
  {
    id: 4,
    count: 0,
    name: "Shipped",
  },
  {
    id: 5,
    count: 0,
    name: "Completed",
  },
  {
    id: 6,
    count: 0,
    name: "Cancelled",
  },
  {
    id: 7,
    count: 0,
    name: "Return / Refund",
  },
  {
    id: 8,
    count: 0,
    name: "product temporarily blocked",
  },
];

const DashboardStyled = styled.div`
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
  const [revenueSixMonth, setRevenueSixMonth] = useState([]);
  const { revenues } = useSelector((state) => state.revenues);
  const user = JSON.parse(getUser());
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.seller_id) {
      dispatch(getRevenueIntervalSixMonth(user.seller_id));
    }
  }, [dispatch, user.seller_id]);

  useEffect(() => {
    if (revenues) {
      setRevenueSixMonth(revenues);
    }
  }, [revenues]);

  return (
    <DashboardStyled>
      {/* <div className="widgets">
        <Widget type="visits"></Widget>
        <Widget type="views"></Widget>
        <Widget type="orders"></Widget>
        <Widget type="rate"></Widget>
      </div> */}
      <div className="list-container card-shadow">
        <Heading
          title={"List work"}
          desc={"Things you will have to do"}
        ></Heading>
        <ListWork data={data}></ListWork>
      </div>

      <div className="charts">
        <Chart
          title="Last 6 Months (Revenue)"
          aspect={2 / 1}
          data={revenueSixMonth}
        ></Chart>
        <Featured></Featured>
      </div>
    </DashboardStyled>
  );
};

export default Dashboard;
