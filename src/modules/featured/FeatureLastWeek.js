/** @format */

import React from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useSelector } from "react-redux";
import CountUp from "react-countup";

const FeatureLastWeekStyled = styled.div`
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

const FeatureLastWeek = ({ className }) => {
  const { revenuesWeek } = useSelector((state) => state.revenues);

  const week =
    revenuesWeek?.length > 0
      ? revenuesWeek[revenuesWeek?.length - 1]?.revenue
      : 0;
  const lastWeek =
    revenuesWeek?.length > 0
      ? revenuesWeek[revenuesWeek?.length - 2]?.revenue
      : 0;
  let total = week - lastWeek;

  return (
    <FeatureLastWeekStyled className={className}>
      <div className="title">Last Week</div>
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
    </FeatureLastWeekStyled>
  );
};

export default FeatureLastWeek;
