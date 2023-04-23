/** @format */

// @flow
import { Box, IconButton, Modal } from "@mui/material";
import * as React from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};
export const ModalMuiIcon = ({
  icon,
  children,
  handleOpen,
  handleClose,
  open,
  setOpen,
}) => {
  handleOpen = () => setOpen(true);
  handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>{icon}</IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
