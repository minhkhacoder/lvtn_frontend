/** @format */
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Heading from "components/heading/Heading";
import FormGroupTextArea from "components/common/FormGroupTextArea";
import FormGroupInput from "components/common/FormGroupInput";
import FormClassify from "components/common/FormClassify";
import ErrorComponent from "components/common/ErrorComponent";
import Button from "@mui/material/Button";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { themeMaterial } from "utils/constants";
import { Box, ThemeProvider } from "@mui/material";
import { getAllCategory } from "store/actions/categoryAction";
import { getAllBrand } from "store/actions/brandAction";
import MuiSelect from "components/common/MultiSelectDropdown";
import MultiSelectDropdown from "components/common/MultiSelectDropdown";
import SelectDropdown from "components/common/SelectDropdown";

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
  const [cateId, setCateId] = useState("");
  const [brandItem, setBrandItem] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [fileImages, setFileImages] = useState([]);
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.categories);
  const { brand } = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllBrand());
  }, [dispatch]);

  useEffect(() => {
    if (category) setCategories(category);
  }, [category]);

  useEffect(() => {
    if (brand) setBrands(brand);
  }, [brand]);

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
    if (scrollBottom < 80) {
      header.classList.add("is-sticky");
    } else {
      header.classList.remove("is-sticky");
    }
  };

  const handleSelectCateId = (id) => {
    setCateId(id);
  };

  const handleSelectBrand = (e) => {
    console.log(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={themeMaterial}>
      <AddProductStyled className="relative card-shadow">
        <Heading title={"Add product"}></Heading>
        <div className="mx-auto mt-10 mb-5">
          <Box
            className="grid grid-cols-1 gap-5"
            component="form"
            onSubmit={handleSubmit}
          >
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
              name="pro_name"
              id="pro_name"
              placeholder="Please limit product names to 120 characters or less"
            ></FormGroupInput>
            <div className="grid grid-cols-2 gap-5">
              <MultiSelectDropdown
                data={categories}
                placeholder={"Please enter the category of the product"}
              ></MultiSelectDropdown>
              <SelectDropdown
                data={brands}
                placeholder={"Please enter the brand of the product"}
              ></SelectDropdown>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <FormGroupInput
                name="pro_material"
                id="pro_material"
                placeholder="Please enter the material of the product"
              ></FormGroupInput>
              <FormGroupInput
                name="prod_name"
                id="prod_name"
                placeholder="Please enter the origin of the product"
              ></FormGroupInput>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <FormGroupInput
                name="pro_price"
                id="pro_price"
                placeholder="Please enter the price of the product"
              ></FormGroupInput>
              <FormGroupInput
                name="pro_quantity"
                id="pro_quantity"
                placeholder="Please enter the quantity of the product"
              ></FormGroupInput>
            </div>
            <FormGroupTextArea
              // label="Description"
              name="pro_desc"
              id="pro_desc"
              minRows={6}
              placeholder="Please enter the description of the product"
            ></FormGroupTextArea>
            <FormClassify></FormClassify>
            <div className="save">
              <Button variant="contained" color="error">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </div>
          </Box>
        </div>
      </AddProductStyled>
    </ThemeProvider>
  );
};

export default withErrorBoundary(AddProduct, {
  FallbackComponent: ErrorComponent,
});
