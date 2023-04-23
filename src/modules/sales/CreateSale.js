/** @format */

// @flow
import FormGroupInput from "components/common/FormGroupInput";
import { useState } from "react";
import Heading from "components/heading/Heading";
import * as React from "react";

import styled from "styled-components";
import { Box, Button } from "@mui/material";
import { DataTable } from "./DataTable";
import DateTimePickerMui from "components/common/DateTimePickerMui";
import { useDispatch } from "react-redux";
import { createSale } from "store/actions/saleAction";

const CreateSaleStyled = styled.div`
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

export const CreateSale = ({ handleClose }) => {
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const dispatch = useDispatch();
  const handleSelectSaleProduct = (selectedProducts) => {
    setSelectedProducts(selectedProducts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = new FormData();
    formData.append("name", data.get("name"));
    formData.append("ps_value", data.get("ps_value"));
    formData.append("dateStart", dateStart);
    formData.append("dateEnd", dateEnd);
    for (let index = 0; index < selectedProducts.length; index++) {
      formData.append("pro_id", selectedProducts[index]);
    }

    dispatch(createSale(formData));
    handleClose();
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  };
  return (
    <CreateSaleStyled>
      <Box
        className="grid grid-cols-1 gap-5"
        component="form"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col pb-4">
          <Heading title={"Create sale"}></Heading>

          <div className="flex flex-col gap-3 w-[400px] py-4">
            <div className="flex items-start justify-between gap-4">
              <span className="text-text2">
                <strong>Sale name</strong>
              </span>
              <FormGroupInput
                name="name"
                id="name"
                placeholder="Sale name"
                className="w-[300px]"
              ></FormGroupInput>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="text-text2">
                <strong>Start Date</strong>
              </span>
              <DateTimePickerMui
                selectDate={setDateStart}
                className="w-[300px]"
              ></DateTimePickerMui>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-text2">
                <strong>End Date</strong>
              </span>
              <DateTimePickerMui
                selectDate={setDateEnd}
                className="w-[300px]"
              ></DateTimePickerMui>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="text-text2">
                <strong>Sale name</strong>
              </span>
              <FormGroupInput
                name="ps_value"
                id="ps_value"
                placeholder="Percent"
                className="w-[300px]"
              ></FormGroupInput>
            </div>
          </div>
        </div>

        <DataTable selectProductId={handleSelectSaleProduct}></DataTable>
        <div className="flex justify-end gap-4 pt-4">
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Create
          </Button>
        </div>
      </Box>
    </CreateSaleStyled>
  );
};
