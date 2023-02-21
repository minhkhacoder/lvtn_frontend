/** @format */

import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import styled from "styled-components";

const WidgetStyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 10px;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  border-radius: 10px;
  height: 100px;

  .left,
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      font-weight: bold;
      font-size: 14px;
      color: ${(props) => props.theme.gray};
    }

    .counter {
      font-size: 28px;
      font-weight: 600;
    }

    .link {
      width: max-content;
      font-size: 12px;
      color: ${(props) => props.theme.dimgray};
    }

    .help {
      display: flex;
      align-items: center;
      justify-content: end;
      color: ${(props) => props.theme.darkgray};
      cursor: pointer;
    }
    .positive {
      color: #32cd32;
    }
    .negative {
      color: #ff0000;
    }

    .icon {
      font-size: 32px;
      padding: 5px;
      border-radius: 5px;
      align-self: flex-end;
    }
  }
`;

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "visits":
      data = {
        title: "VISITS",
        isPercent: false,
        icon: <TrendingDownIcon className="icon negative" />,
      };
      break;
    case "views":
      data = {
        title: "VIEWS",
        isPercent: false,
        icon: <TrendingDownIcon className="icon negative" />,
      };
      break;
    case "orders":
      data = {
        title: "ORDERS",
        isPercent: false,
        icon: <TrendingUpIcon className="icon positive" />,
      };
      break;
    case "rate":
      data = {
        title: "CONVERSION RATE",
        isPercent: true,
        icon: <TrendingUpIcon className="icon positive" />,
      };
      break;
    default:
      break;
  }

  return (
    <WidgetStyled>
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {amount} {data.isPercent && "%"}
        </span>
        <span className="link">with yesterday {diff}%</span>
      </div>
      <div className="right">
        <div className="help">
          <HelpOutlineIcon fontSize="small" />
        </div>
        {data.icon}
      </div>
    </WidgetStyled>
  );
};

export default withErrorBoundary(Widget, {
  FallbackComponent: ErrorComponent,
});
