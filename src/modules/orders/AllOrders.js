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
  Tooltip,
} from "@mui/material";
import Heading from "components/heading/Heading";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrders, getAllOrdersFilter } from "store/actions/ordersAction";
import styled from "styled-components";
import { themeMaterial } from "utils/constants";
import { getUser } from "utils/cookies";
import { formatDate } from "utils/formatDate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StatusOrder from "./StatusOrder";
import FormGroupInput from "components/common/FormGroupInput";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DropdownStatusOrder from "./DropdownStatusOrder";
import DropdownPaymentOrder from "./DropdownPaymentOrder";
import DatePickerMui from "components/common/DatePickerMui";

const AllOrdersStyled = styled.div`
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 8px !important;
  }
  .css-1h7a7rk-MuiInputBase-root-MuiOutlinedInput-root.Mui-error
    .MuiOutlinedInput-notchedOutline {
    border-color: rgba(0, 0, 0, 0.23) !important;
    border-width: 1px !important;
  }
  .css-1h7a7rk-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused
    .MuiOutlinedInput-notchedOutline {
    border-color: #9965f4 !important;
    border-width: 2px !important;
  }
`;

const AllOrders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [pay, setPay] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totals, setTotals] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(getUser());

  const { orders, total } = useSelector((state) => state.orders);

  useEffect(() => {
    if (orderId || phone || status || pay || dateStart || dateEnd) {
      dispatch(
        getAllOrdersFilter(
          orderId,
          phone,
          status,
          pay,
          dateStart,
          dateEnd,
          page,
          limit
        )
      );
    } else {
      dispatch(getAllOrders(user.seller_id, page, limit));
    }
  }, [
    dateEnd,
    dateStart,
    dispatch,
    limit,
    orderId,
    page,
    pay,
    phone,
    status,
    user.seller_id,
  ]);

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
    dispatch(
      getAllOrdersFilter(
        orderId,
        phone,
        status,
        pay,
        dateStart,
        dateEnd,
        page,
        limit
      )
    );
    setTotals(0);
  };

  return (
    <ThemeProvider theme={themeMaterial}>
      <AllOrdersStyled className="relative card-shadow">
        <div className="flex items-center justify-start gap-2">
          <Heading title={"All orders"}></Heading>
          <Tooltip title="Reset page">
            <IconButton
              onClick={() => {
                window.location.reload();
              }}
            >
              <RestartAltIcon color="secondary"></RestartAltIcon>
            </IconButton>
          </Tooltip>
        </div>
        <div className="flex flex-col items-end justify-end gap-4 py-3">
          <div className="flex items-center justify-end gap-4 py-3">
            <FormGroupInput
              name="pro_id"
              id="pro_id"
              placeholder="Search by ID"
              onChange={(e) => setOrderId(e.target.value)}
            ></FormGroupInput>
            <FormGroupInput
              name="phone"
              id="phone"
              placeholder="Search by phone"
              onChange={(e) => setPhone(e.target.value)}
            ></FormGroupInput>
            <DropdownStatusOrder setStatus={setStatus}></DropdownStatusOrder>
            <DropdownPaymentOrder setPayment={setPay}></DropdownPaymentOrder>
          </div>
          <div className="flex gap-4">
            <div className="flex items-end gap-2">
              <span className="text-base text-text2">Date Start</span>
              <DatePickerMui selectDate={setDateStart}></DatePickerMui>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-base text-text2">Date End</span>
              <DatePickerMui selectDate={setDateEnd}></DatePickerMui>
            </div>
          </div>
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
