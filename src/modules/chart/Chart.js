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

const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
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

const Chart = ({ aspect, title }) => {
  return (
    <ChartStyled className="card-shadow">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
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
            dataKey="Total"
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
