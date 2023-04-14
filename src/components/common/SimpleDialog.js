/** @format */

// @flow
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";

export const SimpleDialog = ({ onClose, selectedValue, open, data }) => {
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Change Status Order</DialogTitle>
      <List sx={{ pt: 0 }}>
        {data.map((item) => (
          <ListItem disableGutters key={uuidv4()}>
            <ListItemButton
              onClick={() => handleListItemClick(item)}
              key={uuidv4()}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
