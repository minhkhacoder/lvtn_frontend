/** @format */
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import styled from "styled-components";

const FeaturedStyled = styled.div`
  flex: 2;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  padding: 10px;

  .top {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    color: ${(props) => props.theme.gray};
    text-transform: uppercase;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .bottom {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;

    .featured-chart {
      width: 100px;
      height: 100px;
    }

    .title {
      font-weight: 500;
      color: ${(props) => props.theme.gray};
    }

    .amount {
      font-size: 30px;
    }

    .desc {
      font-weight: 300;
      font-size: 12px;
      color: gray;
      text-align: center;
    }

    .summary {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .item {
        text-align: center;

        .item-title {
          font-size: 14px;
          color: ${(props) => props.theme.gray};
        }

        .itemResult {
          display: flex;
          align-items: center;
          margin-top: 10px;
          font-size: 14px;

          &.positive {
            color: green;
          }

          &.negative {
            color: red;
          }
        }
      }
    }
  }
`;

const Featured = () => {
  return (
    <FeaturedStyled>
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <HelpOutlineIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featured-chart">
          <CircularProgressbar
            value={70}
            text={"70%"}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: "#7451f8",
              textColor: "#7451f8",
              trailColor: "#ece8ff",
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">$420</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="item-title">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="item-title">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="item-title">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </FeaturedStyled>
  );
};

export default withErrorBoundary(Featured, {
  FallbackComponent: ErrorComponent,
});
