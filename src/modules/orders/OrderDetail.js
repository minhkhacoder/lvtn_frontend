/** @format */

import { IconButton, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { themeMaterial } from "utils/constants";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Heading from "components/heading/Heading";
import { getDetailOrder } from "store/actions/ordersAction";
import { formatDate } from "utils/formatDate";
import StatusOrder from "./StatusOrder";

const OrderDetailStyled = styled.div`
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const OrderDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const { orders } = useSelector((state) => state.orders);
  useEffect(() => {
    if (orderId) dispatch(getDetailOrder(orderId));
  }, [dispatch, orderId]);

  const detailOrder = orders?.length > 0 ? orders[0] : {};
  let totals = 0.0;
  for (let index = 0; index < detailOrder.details?.length; index++) {
    const element = detailOrder.details[index];
    totals += element.total;
  }

  return (
    <ThemeProvider theme={themeMaterial}>
      <OrderDetailStyled>
        <div className="flex items-center justify-start">
          <IconButton
            onClick={() => {
              navigate("/all-orders");
            }}
          >
            <KeyboardBackspaceIcon color="secondary" />
          </IconButton>
          <Heading title={"Order detail"}></Heading>
        </div>
        <div className="mt-5">
          <div className="flex flex-col gap-4 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-text">
                ORDER ID: {detailOrder?.or_id}
              </h3>
              <span className="text-base font-medium text-text1">
                Order date: {formatDate(detailOrder?.createdAt)}
              </span>
            </div>
            <div className="flex justify-end">
              <StatusOrder
                status={detailOrder.status}
                orderId={detailOrder.or_id}
              ></StatusOrder>
            </div>
          </div>

          <div className="flex flex-col mb-5">
            <strong className="text-lg">Customer infomation</strong>
            <span className="text-base text-text1">
              <strong>Name:</strong> {detailOrder.customer?.cus_userName}
            </span>
            <span className="text-base text-text1">
              <strong>Phone:</strong> {detailOrder.customer?.acc_phone}
            </span>
            <span className="text-base text-text1">
              <strong>Ship Address:</strong> {detailOrder.address}
            </span>
          </div>

          {detailOrder?.details?.map((item) => {
            return (
              <div className="flex gap-4 py-5 border-y" key={item.ordt_id}>
                <div className="w-[80px] h-[80px] border ">
                  <img
                    src={item.products?.image}
                    alt=""
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-text">
                      {item.products?.pro_name.length > 70
                        ? item.products?.pro_name.slice(0, 70) + "..."
                        : item.products?.pro_name}
                    </h3>
                    <div className="flex items-center justify-start gap-5 text-sm text-text1">
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.products?.pro_price}</span>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-text">
                    <span>${item.total}</span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex items-start justify-between mt-5">
            <div>
              <strong>Payment: </strong>
              <span className="text-base text-text1">
                {detailOrder.payment}
              </span>
            </div>
            <div className="flex flex-col justify-end gap-3">
              <div className="w-[150px] flex justify-between items-start">
                <strong>Ship fee: </strong>

                <span className="text-base text-text1">
                  ${detailOrder.ship}
                </span>
              </div>
              <div className="w-[150px] flex justify-between items-start">
                <strong>Total: </strong>

                <span className="text-base text-text1">
                  ${totals + detailOrder.ship}
                </span>
              </div>
            </div>
          </div>
        </div>
      </OrderDetailStyled>
    </ThemeProvider>
  );
};

export default OrderDetail;
