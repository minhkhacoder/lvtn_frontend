/** @format */
import { easeQuadInOut } from "d3-ease";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
import HelpOutline from "components/icons/HelpOutline";
import Heading from "components/heading/Heading";
import AnimatedProgressProvider from "components/common/AnimatedProgressProvider";

const FeaturedStyled = styled.div`
  flex: 2;
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
      color: ${(props) => props.theme.darkgray};
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

        .item-result {
          display: flex;
          align-items: center;
          margin-top: 10px;
          font-size: 14px;
          &.positive {
            color: #32cd32;
          }
          &.negative {
            color: #ff0000;
          }
        }
      }
    }
  }
`;

const Featured = () => {
  let percentage = 70;
  return (
    <FeaturedStyled className="card-shadow">
      <div className="top">
        <Heading title="Total Revenue"></Heading>
        <HelpOutline className="flex items-center"></HelpOutline>
      </div>
      <div className="bottom">
        <div className="featured-chart">
          <AnimatedProgressProvider
            valueStart={0}
            valueEnd={percentage}
            duration={1.4}
            easingFunction={easeQuadInOut}
          >
            {(value) => {
              const roundedValue = Math.round(value);
              return (
                <CircularProgressbar
                  value={value}
                  text={`${roundedValue}%`}
                  styles={buildStyles({
                    pathTransition: "none",
                    pathColor: "#7451f8",
                    textColor: "#7451f8",
                    trailColor: "#ece8ff",
                  })}
                />
              );
            }}
          </AnimatedProgressProvider>
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">$420</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="item-title">Target</div>
            <div className="item-result negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="result-amount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="item-title">Last Week</div>
            <div className="item-result positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="result-amount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="item-title">Last Month</div>
            <div className="item-result positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="result-amount">$12.4k</div>
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
