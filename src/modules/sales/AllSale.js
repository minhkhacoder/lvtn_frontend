/** @format */

// @flow
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSale } from "store/actions/saleAction";
import styled from "styled-components";
import { getUser } from "utils/cookies";
import { formatDateTime } from "utils/formatDate";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { ModalMuiIcon } from "components/common/ModalMuiIcon";
import { UpdateSale } from "./UpdateSale";
const AllSaleStyled = styled.div``;

export const AllSale = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const user = JSON.parse(getUser());
  const { sales } = useSelector((state) => state.sales);

  React.useEffect(() => {
    dispatch(getAllSale(user.seller_id));
  }, [dispatch, user.seller_id]);

  const data = sales ? sales : [];
  return (
    <>
      <Table className="mt-5">
        <TableHead>
          <TableRow className="bg-six text-text">
            <TableCell>ID</TableCell>
            <TableCell>Sale Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 &&
            data.map((item) => (
              <TableRow key={item.id} className="hover:bg-slate-50 text-text1">
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nameSale}</TableCell>
                <TableCell>{formatDateTime(item.dateStart)}</TableCell>
                <TableCell>{formatDateTime(item.dateEnd)}</TableCell>
                <TableCell>{item.value}%</TableCell>
                <TableCell>
                  <div className="flex">
                    <ModalMuiIcon
                      icon={<EditIcon color="secondary" />}
                      setOpen={setOpen}
                      open={open}
                      handleClose={handleOpen}
                      handleOpen={handleClose}
                    >
                      <UpdateSale
                        handleClose={handleClose}
                        sale={item}
                      ></UpdateSale>
                    </ModalMuiIcon>
                    <IconButton onClick={() => {}}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};
