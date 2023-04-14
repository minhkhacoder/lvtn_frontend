/** @format */

import {
  Button,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import Heading from "components/heading/Heading";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "store/actions/ordersAction";
import styled from "styled-components";
import { themeMaterial } from "utils/constants";
import { getUser } from "utils/cookies";
import { formatDate } from "utils/formatDate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StatusOrder from "./StatusOrder";
import FormGroupInput from "components/common/FormGroupInput";
import { getDetailOrder } from "store/actions/ordersAction";

const AllOrdersStyled = styled.div`
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const AllOrders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totals, setTotals] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(getUser());

  const { orders, total } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getAllOrders(user.seller_id, page, limit));
  }, [dispatch, limit, page, user.seller_id]);

  useEffect(() => {
    if (orders) setOrdersList(orders);
    if (total && orderId === "") setTotals(total);
  }, [orderId, orders, setTotals, total]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleOpenOrderDetail = (orderId) => {
    navigate(`/order-detail/${orderId}`);
  };

  const handleSearch = () => {
    if (orderId !== "") {
      dispatch(getDetailOrder(orderId));
      setTotals(0);
    }
  };

  return (
    <ThemeProvider theme={themeMaterial}>
      <AllOrdersStyled className="relative card-shadow">
        <Heading title={"All orders"}></Heading>
        <div className="flex items-center justify-end gap-4 py-3">
          <FormGroupInput
            name="pro_id"
            id="pro_id"
            placeholder="Search by ID"
            onChange={(e) => setOrderId(e.target.value)}
          ></FormGroupInput>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
        <Table className="mt-5">
          <TableHead>
            <TableRow className="bg-six text-text">
              <TableCell>ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {ordersList?.map((item) => (
              <TableRow
                key={item.or_id}
                className="hover:bg-slate-50 text-text1"
              >
                <TableCell>{item.or_id}</TableCell>
                <TableCell>{item.customer?.cus_userName}</TableCell>
                <TableCell>{item.customer?.acc_phone}</TableCell>
                <TableCell>{item.payment}</TableCell>
                <TableCell>
                  {item.address.length > 30
                    ? item.address.slice(0, 30) + "..."
                    : item.address}
                </TableCell>
                <TableCell>
                  <StatusOrder
                    status={item.status}
                    orderId={item.or_id}
                  ></StatusOrder>
                </TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenOrderDetail(item.or_id)}>
                    <VisibilityIcon color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={parseInt(totals / limit) + 1}
          page={page}
          onChange={handleChange}
          className="mt-3"
        />
      </AllOrdersStyled>
    </ThemeProvider>
  );
};

export default AllOrders;
