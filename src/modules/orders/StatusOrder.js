/** @format */

import { Chip } from "@mui/material";
import { SimpleDialog } from "components/common/SimpleDialog";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateStatusOrder } from "store/actions/ordersAction";

const data = [
  {
    id: 0,
    name: "Pending",
  },
  {
    id: 1,
    name: "Confirmed",
  },
  {
    id: 2,
    name: "Processing",
  },
  {
    id: 3,
    name: "Shipped",
  },
  {
    id: 4,
    name: "Completed",
  },
  {
    id: 5,
    name: "Cancelled",
  },
  {
    id: 6,
    name: "Return",
  },
];

const StatusOrder = ({ status, orderId }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(() => {
    if (selectedValue !== "") {
      dispatch(updateStatusOrder(orderId, selectedValue.id));
    }
  }, [dispatch, selectedValue]);

  switch (status) {
    case 0:
      return (
        <>
          <Chip
            label="Pending"
            color="warning"
            size="small"
            onClick={handleClickOpen}
          />
          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            data={data}
          />
        </>
      );
    case 1:
      return (
        <>
          <Chip
            label="Confirmed"
            color="info"
            size="small"
            onClick={handleClickOpen}
          />
          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            data={data}
          />
        </>
      );
    case 2:
      return (
        <>
          <Chip
            label="Processing"
            color="info"
            size="small"
            onClick={handleClickOpen}
          />
          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            data={data}
          />
        </>
      );
    case 3:
      return (
        <>
          <Chip
            label="Shipped"
            color="success"
            size="small"
            onClick={handleClickOpen}
          />
          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            data={data}
          />
        </>
      );
    case 4:
      return (
        <>
          <Chip
            label="Completed"
            color="primary"
            size="small"
            onClick={handleClickOpen}
          />
          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            data={data}
          />
        </>
      );
    case 5:
      return (
        <>
          <Chip label="Cancelled" color="error" size="small" />
        </>
      );
    case 6:
      return (
        <>
          <Chip label="Return" color="error" size="small" />
        </>
      );
    default:
      return null;
  }
};

export default StatusOrder;
