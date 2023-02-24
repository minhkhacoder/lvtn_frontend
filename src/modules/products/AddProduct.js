/** @format */

import ErrorComponent from "components/common/ErrorComponent";
import Heading from "components/heading/Heading";
import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { themeMaterial } from "utils/constants";
import { ThemeProvider } from "@mui/material";
import FormGroupSelect from "components/common/FormGroupSelect";
import FormGroupInput from "components/common/FormGroupInput";
import FormGroupTextArea from "components/common/FormGroupTextArea";
import FormClassify from "components/common/FormClassify";

const AddProductStyled = styled.div`
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  .save {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 20px;
  }
  .is-sticky {
    box-shadow: 0 -2px 6px 0 rgb(0 0 0 / 12%);
    padding: 20px 40px;
    width: 1042px;
    position: fixed;
    z-index: 999;
    bottom: 0;
    right: 20px;
    background-color: #fff;
    animation: 1s ease-in-out;
  }
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

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  const isSticky = (e) => {
    const header = document.querySelector(".save");
    const scrollBottom = window.scrollY;
    console.log(window.scrollY);
    if (scrollBottom < 80) {
      header.classList.add("is-sticky");
    } else {
      header.classList.remove("is-sticky");
    }
  };

  return (
    <ThemeProvider theme={themeMaterial}>
      <AddProductStyled className="relative card-shadow">
        <Heading title={"Add product"}></Heading>
        <div className="mx-auto mt-10 mb-5">
          <form className="grid grid-cols-1 gap-5">
            <div className="flex items-start justify-between gap-5">
              <h3 className="text-sm text-text">Upload images</h3>
              <div className="flex justify-start gap-10 w-[800px]">
                <>
                  <input
                    accept="image/*"
                    id="icon-button-photo"
                    onChange={(e) => handleCapture(e)}
                    className="hidden"
                    multiple
                    type="file"
                  />
                  <Button variant="contained" color="secondary">
                    <label
                      htmlFor="icon-button-photo"
                      className="cursor-pointer"
                    >
                      <PhotoCamera />
                    </label>
                  </Button>
                </>
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
            <FormGroupInput
              label="Name"
              placeholder="Please limit product names to 120 characters or less"
            ></FormGroupInput>
            <div className="grid grid-cols-2 gap-5">
              <FormGroupSelect label="Category">
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
              </FormGroupSelect>
              <FormGroupSelect label="Brand">
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
              </FormGroupSelect>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <FormGroupInput
                label="Material"
                placeholder="Please enter the material of the product"
              ></FormGroupInput>
              <FormGroupInput
                label="Origin"
                placeholder="Please enter the origin of the product"
              ></FormGroupInput>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <FormGroupInput
                label="Price"
                placeholder="Please enter the price of the product"
              ></FormGroupInput>
              <FormGroupInput
                label="Quantity"
                placeholder="Please enter the quantity of the product"
              ></FormGroupInput>
            </div>
            <FormGroupTextArea
              label="Description"
              minRows={6}
              placeholder="Please enter the description of the product"
            ></FormGroupTextArea>

            <FormClassify></FormClassify>
          </form>
        </div>
        <div className="save">
          <Button variant="contained" color="error">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </div>
      </AddProductStyled>
    </ThemeProvider>
  );
};

export default withErrorBoundary(AddProduct, {
  FallbackComponent: ErrorComponent,
});
