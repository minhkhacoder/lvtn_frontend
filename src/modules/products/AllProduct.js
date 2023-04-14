/** @format */

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import Heading from "components/heading/Heading";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "store/actions/productAction";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { themeMaterial } from "utils/constants";
const AllProductStyled = styled.div`
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const AllProduct = () => {
  const [productsList, setProductsList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totals, setTotals] = useState(0);
  const { products, total } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllProducts(page, limit));
  }, [dispatch, limit, page]);

  useEffect(() => {
    if (products) setProductsList(products);
    if (total) setTotals(total);
  }, [products, setTotals, total]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const updateProduct = (id) => {
    navigate(`/update-product/${id}`);
  };

  const deleteProduct = (id) => {};

  return (
    <ThemeProvider theme={themeMaterial}>
      <AllProductStyled className="relative card-shadow">
        <Heading title={"All product"}></Heading>
        <Table className="mt-5">
          <TableHead>
            <TableRow className="bg-six text-text">
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsList.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-slate-50 text-text1"
              >
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    width="50"
                    height="50"
                  />
                </TableCell>
                <TableCell>
                  {product.name.length > 30
                    ? product.name.slice(0, 30) + "..."
                    : product.name}
                </TableCell>
                <TableCell>{product.category.cat_name}</TableCell>
                <TableCell>{"$" + product.price.toString()}</TableCell>
                <TableCell>
                  {product.average_rating} ({product.rat_count} ratings)
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => updateProduct(product.id)}>
                    <EditIcon color="secondary" />
                  </IconButton>
                  <IconButton onClick={() => deleteProduct(product.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={parseInt(totals / limit) + 1}
          page={page}
          onChange={handleChange}
          className="mt-3"
        />
      </AllProductStyled>
    </ThemeProvider>
  );
};

export default AllProduct;
