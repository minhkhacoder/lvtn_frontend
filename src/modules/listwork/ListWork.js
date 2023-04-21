/** @format */

import React from "react";
import styled from "styled-components";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ListWorkStyled = styled.div`
  /* margin-top: 10px; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  .card {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    cursor: pointer;
  }
  .count {
    font-size: 20px;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
  }
  .name {
    font-size: 14px;
    text-transform: capitalize;
    color: ${(props) => props.theme.text};
  }
`;

const ListWork = ({ data }) => {
  const navigate = useNavigate();
  return (
    <ListWorkStyled>
      {data?.length > 0 &&
        data.map((item) => (
          <div
            key={item.id}
            className="card card-shadow"
            onClick={() => {
              navigate("/all-orders");
            }}
          >
            <span className="count">
              <CountUp start={0} end={item.count}></CountUp>
            </span>
            <span className="name">{item.name}</span>
          </div>
        ))}
      <div
        className="card card-shadow"
        onClick={() => {
          navigate("/all-orders");
        }}
      >
        <span className="count">
          <ArrowForwardIcon></ArrowForwardIcon>
        </span>
        <span className="name">Go to Orders</span>
      </div>
    </ListWorkStyled>
  );
};

export default ListWork;
