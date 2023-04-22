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
import CloseIcon from "@mui/icons-material/Close";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { themeMaterial } from "utils/constants";
import { Box, IconButton, ThemeProvider } from "@mui/material";
import { getAllCategory } from "store/actions/categoryAction";
import { createBrand, getAllBrand } from "store/actions/brandAction";
import MultiSelectDropdown from "components/common/MultiSelectDropdown";
import SelectDropdown from "components/common/SelectDropdown";
import { getUser } from "utils/cookies";
import { getProductDetail, updateProduct } from "store/actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { deleteImage } from "store/actions/imagesAction";
import { createProducer, getAllProducer } from "store/actions/producerAction";

const { v4: uuidv4 } = require("uuid");
const UpdateProductStyled = styled.div`
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

const UpdateProduct = () => {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [producers, setProducers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedProducer, setSelectedProducer] = useState([]);
  const [fileImages, setFileImages] = useState([]);
  const [selectedImageDelete, setSelectedImageDetele] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useSelector((state) => state.categories);
  const { brand } = useSelector((state) => state.brands);
  const { products } = useSelector((state) => state.products);
  const { producer } = useSelector((state) => state.producers);
  const { id } = useParams();
  const user = JSON.parse(getUser());

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllBrand());
    dispatch(getProductDetail(id));
    dispatch(getAllProducer());
  }, [dispatch, id]);

  useEffect(() => {
    if (category) setCategories(category);
  }, [category]);

  useEffect(() => {
    if (brand) setBrands(brand);
  }, [brand]);

  useEffect(() => {
    if (producer) setProducers(producer);
  }, [producer]);

  useEffect(() => {
    if (products?.length > 0) {
      setProduct(products[0]);
      setSelectedCategory({
        value: products[0].category["cat_id"],
        label: products[0].category["cat_name"],
      });
      setSelectedBrand({
        value: products[0].brand["bra_id"],
        label: products[0].brand["bra_name"],
      });
      setSelectedProducer({
        value: products[0].producer["prod_id"],
        label: products[0].producer["prod_name"],
      });
      setFileImages(products[0].image);
    }
  }, [products]);

  const handleCapture = (e) => {
    if (e.target.files.length <= 9) {
      const files = [...e.target.files];
      setFileImages((prevState) => [...prevState, ...files]);
    } else {
      alert("Can only upload up to 9 images!");
    }
  };

  const handleDeleteImageItem = (index) => {
    setSelectedImageDetele((prevState) => {
      let url = fileImages[index];
      const newState = [...prevState];
      newState.push(url);
      return newState;
    });
    setFileImages((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
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

  const handleSelectedCategory = (selectedOptions) => {
    setSelectedCategory(selectedOptions);
  };

  const handleSelectedBrand = (selectedOptions) => {
    setSelectedBrand(selectedOptions);
  };

  const handleSelectedProducer = (selectedOptions) => {
    setSelectedProducer(selectedOptions);
  };

  const handleCreateOptionBrand = (inputValue) => {
    dispatch(createBrand({ name: inputValue }));
    dispatch(getAllBrand());
  };

  const handleCreateOptionProducer = (inputValue) => {
    dispatch(createProducer({ name: inputValue }));
    dispatch(getAllProducer());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = new FormData();
    formData.append("id", product["id"]);
    formData.append("seller_id", user["seller_id"]);
    formData.append("cat_id", selectedCategory["value"]);
    formData.append("bra_id", selectedBrand["value"]);
    formData.append("prod_id", selectedProducer["value"]);
    formData.append("pro_name", data.get("pro_name"));
    formData.append("pro_desc", data.get("pro_desc"));
    formData.append("pro_material", data.get("pro_material"));
    formData.append("pro_price", data.get("pro_price"));
    formData.append("pro_quantity", data.get("pro_quantity"));
    for (let index = 0; index < fileImages.length; index++) {
      formData.append("pro_image", fileImages[index]);
    }

    if (data.getAll("cla_group")) {
      formData.append("cla_group", data.getAll("cla_group"));
      formData.append("cla_name", data.getAll("cla_name"));
    }

    if (selectedImageDelete.length > 0) {
      for (let index = 0; index < selectedImageDelete.length; index++) {
        const formData = new FormData();
        formData.append("img_url", selectedImageDelete[index]);
        dispatch(deleteImage(formData));
      }
      setSelectedImageDetele([]);
    }

    dispatch(updateProduct(formData));
    event.target.reset();

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  };

  return (
    <ThemeProvider theme={themeMaterial}>
      <UpdateProductStyled className="relative card-shadow">
        <div className="flex items-center justify-start">
          <IconButton
            onClick={() => {
              navigate("/all-products");
            }}
          >
            <KeyboardBackspaceIcon color="secondary" />
          </IconButton>
          <Heading title={"Update product"}></Heading>
        </div>

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
                  <div className="flex gap-3">
                    {fileImages.map((item, index) => {
                      let url;
                      if (typeof item === "string") {
                        url = item;
                      } else {
                        url = URL.createObjectURL(item);
                      }

                      return (
                        <div
                          className="relative w-[40px] h-[40px]"
                          key={uuidv4()}
                        >
                          <img
                            src={url}
                            alt={index}
                            loading="lazy"
                            className="object-cover w-full h-full border rounded-md shadow-sm border-text2 hover:shadow-lg"
                          />
                          <div
                            className="absolute top-0 right-0 cursor-pointer"
                            onClick={() => handleDeleteImageItem(index)}
                          >
                            <CloseIcon fontSize="16" color="secondary" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <FormGroupInput
              name="pro_name"
              id="pro_name"
              value={product.name || ""}
              placeholder="Please limit product names to 120 characters or less"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            ></FormGroupInput>
            <div className="grid grid-cols-2 gap-5">
              <MultiSelectDropdown
                data={categories}
                initialValue={selectedCategory}
                onSelect={handleSelectedCategory}
                placeholder={"Please enter the category of the product"}
              ></MultiSelectDropdown>
              <SelectDropdown
                data={brands}
                onSelect={handleSelectedBrand}
                handleCreateOption={handleCreateOptionBrand}
                placeholder={"Please enter the brand of the product"}
                initialValue={selectedBrand}
              ></SelectDropdown>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <FormGroupInput
                name="pro_material"
                id="pro_material"
                value={product.material || ""}
                placeholder="Please enter the material of the product"
                onChange={(e) =>
                  setProduct({ ...product, material: e.target.value })
                }
              ></FormGroupInput>
              <SelectDropdown
                data={producers}
                onSelect={handleSelectedProducer}
                handleCreateOption={handleCreateOptionProducer}
                placeholder={"Please enter the producer of the product"}
                initialValue={selectedProducer}
              ></SelectDropdown>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <FormGroupInput
                name="pro_price"
                id="pro_price"
                value={product.price || ""}
                placeholder="Please enter the price of the product"
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              ></FormGroupInput>
              <FormGroupInput
                name="pro_quantity"
                id="pro_quantity"
                value={product.quantity?.toString() || ""}
                placeholder="Please enter the quantity of the product"
                onChange={(e) =>
                  setProduct({ ...product, quantity: e.target.value })
                }
              ></FormGroupInput>
            </div>
            <FormGroupTextArea
              // label="Description"
              name="pro_desc"
              id="pro_desc"
              value={product.desc || ""}
              minRows={6}
              placeholder="Please enter the description of the product"
              onChange={(e) => setProduct({ ...product, desc: e.target.value })}
            ></FormGroupTextArea>
            <FormClassify data={product.classify}></FormClassify>
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
      </UpdateProductStyled>
    </ThemeProvider>
  );
};

export default withErrorBoundary(UpdateProduct, {
  FallbackComponent: ErrorComponent,
});
