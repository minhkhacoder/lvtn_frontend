/** @format */

import React from "react";
import styled from "styled-components";

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
    color: ${(props) => props.theme.darkgray};
  }
`;

const ListWork = ({ data }) => {
  return (
    <ListWorkStyled>
      {data?.length > 0 &&
        data.map((item) => (
          <div key={item.id} className="card card-shadow">
            <span className="count">{item.count}</span>
            <span className="name">{item.name}</span>
          </div>
        ))}
    </ListWorkStyled>
  );
};

export default ListWork;
