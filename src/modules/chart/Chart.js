/** @format */
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import styled from "styled-components";

// const data = [
//   { name: "January", total: 1200 },
//   { name: "February", total: 2100 },
//   { name: "March", total: 800 },
//   { name: "April", total: 1600 },
//   { name: "May", total: 900 },
//   { name: "June", total: 1700 },
// ];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ChartStyled = styled.div`
  flex: 4;
  padding: 10px;
  color: ${(props) => props.theme.text};

  .title {
    margin-bottom: 20px;
    color: ${(props) => props.theme.text};
  }

  .chart-grid {
    stroke: rgb(228, 225, 225);
  }
`;

const Chart = ({ aspect, title, data }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const latestMonthlyRevenue = [];
  for (let i = 0; i < 6; i++) {
    const targetDate = new Date(currentYear, currentMonth - i, 1);
    const targetMonth = months[targetDate.getMonth()];
    const targetYear = targetDate.getFullYear();
    const targetRevenue = data.filter(
      (item) => item.year === targetYear && item.month === targetMonth
    );

    latestMonthlyRevenue.push({
      name: targetMonth,
      total: parseFloat(targetRevenue[0]?.revenue) || 0.0,
    });
  }
  return (
    <ChartStyled className="card-shadow">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={latestMonthlyRevenue.reverse()}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7451f8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7451f8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#7451f8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartStyled>
  );
};

export default withErrorBoundary(Chart, {
  FallbackComponent: ErrorComponent,
});
