/** @format */

import ErrorComponent from "components/common/ErrorComponent";
import Heading from "components/heading/Heading";
import React, { useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { themeMaterial } from "utils/constants";
import { ThemeProvider } from "@mui/material";
const AddProductStyled = styled.div`
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [fileImages, setFileImages] = useState([]);

  const categories = [
    {
      id: "CAT01",
      name: "Cycling",
      children: [
        {
          id: "CAT09",
          name: "Bikes",
          parent: "CAT01",
        },
        {
          id: "CAT10",
          name: "Glasses",
          parent: "CAT01",
        },
      ],
    },
    {
      id: "CAT02",
      name: "Golf",
      children: [
        {
          id: "CAT12",
          name: "Golf Clubs",
          parent: "CAT02",
        },
        {
          id: "CAT13",
          name: "Golf Balls",
          parent: "CAT02",
        },
      ],
    },
    {
      id: "CAT03",
      name: "Football",
    },
  ];

  const handleCapture = (e) => {
    if (e.target.files.length <= 9) {
      const files = [...e.target.files];
      setFileImages((prevState) => [...prevState, ...files]);
    } else {
      alert("Can only upload up to 9 images!");
    }
  };

  return (
    <ThemeProvider theme={themeMaterial}>
      <AddProductStyled className="card-shadow">
        <Heading title={"Add product"}></Heading>
        <div className="mx-auto mt-10 mb-5">
          <form className="grid grid-cols-1 gap-5">
            <div className="flex items-start justify-between gap-5">
              <h3 className="text-sm text-text">Upload images</h3>
              <div className="flex justify-start gap-10 w-[800px]">
                <div>
                  <input
                    accept="image/*"
                    id="icon-button-photo"
                    onChange={(e) => handleCapture(e)}
                    className="hidden"
                    multiple
                    type="file"
                  />
                  <Button variant="contained" color="primary">
                    <label
                      htmlFor="icon-button-photo"
                      className="cursor-pointer"
                    >
                      <PhotoCamera />
                    </label>
                  </Button>
                </div>
                <div className="w-full">
                  <div className="flex gap-3 w-[40px] h-[40px]">
                    {fileImages.map((item, index) => {
                      const url = URL.createObjectURL(item);
                      return (
                        <img
                          key={index}
                          src={url}
                          alt={index}
                          loading="lazy"
                          className="object-cover w-full h-full"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-between gap-5">
              <h3 className="text-sm text-text">Name</h3>
              <TextField
                type="text"
                label="Name product"
                // value={name}
                className="w-[800px]"
                color="secondary"
                size="small"
              />
            </div>
            <div className="flex items-start justify-between gap-5">
              <h3 className="text-sm text-text">Category</h3>
              <TextField
                type="text"
                label="Category"
                select
                value={category}
                className="w-[800px]"
                color="secondary"
                size="small"
              >
                <TreeView
                  aria-label="file system navigator"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{
                    flexGrow: 1,
                    maxWidth: 800,
                    overflowY: "auto",
                  }}
                >
                  {categories.map((cat) => (
                    <TreeItem key={cat.id} nodeId={cat.id} label={cat.name}>
                      {cat.children?.length > 0 &&
                        cat.children.map((child) => (
                          <TreeItem
                            key={child.id}
                            nodeId={child.id}
                            label={child.name}
                          />
                        ))}
                    </TreeItem>
                  ))}
                </TreeView>
              </TextField>
            </div>
            <div className="flex items-start justify-between gap-5">
              <h3 className="text-sm text-text">Material</h3>
              <TextField
                type="text"
                label="Material product"
                value={name}
                className="w-[800px]"
                color="secondary"
                size="small"
              />
            </div>
            <div className="flex items-start justify-between gap-5">
              <h3 className="text-sm text-text">Description</h3>
              <TextField
                type="text"
                label="Description"
                // value={name}
                className="w-[800px]"
                color="secondary"
                multiline
                minRows={8}
                size="auto"
              />
            </div>
          </form>
        </div>
      </AddProductStyled>
    </ThemeProvider>
  );
};

export default withErrorBoundary(AddProduct, {
  FallbackComponent: ErrorComponent,
});
