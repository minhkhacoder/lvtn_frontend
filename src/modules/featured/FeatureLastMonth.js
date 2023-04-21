/** @format */

import React from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useSelector } from "react-redux";
import CountUp from "react-countup";

const FeatureLastMonthStyled = styled.div`
  text-align: center;
  .title {
    font-size: 14px;
    color: ${(props) => props.theme.text};
  }

  .result {
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
`;

const FeatureLastMonth = ({ className }) => {
  const { revenuesMonth } = useSelector((state) => state.revenues);

  const month =
    revenuesMonth?.length > 0
      ? revenuesMonth[revenuesMonth?.length - 1]?.revenue
      : 0;
  const lastMonth =
    revenuesMonth?.length > 0
      ? revenuesMonth[revenuesMonth?.length - 2]?.revenue
      : 0;
  let total = month - lastMonth;

  return (
    <FeatureLastMonthStyled className={className}>
      <div className="title">Last Month</div>
      {total >= 0 ? (
        <div className="result positive">
          <KeyboardArrowUpOutlinedIcon fontSize="small" />

          <div className="result-amount">
            $<CountUp start={0.0} end={total} decimals={2}></CountUp>
          </div>
        </div>
      ) : (
        <div className="result negative">
          <KeyboardArrowDownIcon fontSize="small" />
          <div className="result-amount">
            $<CountUp start={0.0} end={total} decimals={2}></CountUp>
          </div>
        </div>
      )}
    </FeatureLastMonthStyled>
  );
};

export default FeatureLastMonth;
