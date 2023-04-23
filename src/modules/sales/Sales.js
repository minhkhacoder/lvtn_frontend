/** @format */

import { IconButton, ThemeProvider, Tooltip } from "@mui/material";
import React from "react";
import { themeMaterial } from "utils/constants";
import styled from "styled-components";
import Heading from "components/heading/Heading";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ModalMui } from "components/common/ModalMui";
import { CreateSale } from "./CreateSale";
import { useState } from "react";
import { AllSale } from "./AllSale";

const SalesStyled = styled.div`
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Sales = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ThemeProvider theme={themeMaterial}>
      <SalesStyled className="relative card-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2">
            <Heading title={"All sales"}></Heading>
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
          <ModalMui
            title={"Create"}
            setOpen={setOpen}
            open={open}
            handleClose={handleOpen}
            handleOpen={handleClose}
          >
            <CreateSale handleClose={handleClose}></CreateSale>
          </ModalMui>
        </div>
        <AllSale></AllSale>
      </SalesStyled>
    </ThemeProvider>
  );
};

export default Sales;
