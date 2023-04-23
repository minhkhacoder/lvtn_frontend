/** @format */

// @flow

import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "store/actions/productAction";
import styled from "styled-components";
const DataTableStyled = styled.div`
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 8px !important;
  }
  .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
    height: auto !important;
  }
`;

export const DataTable = ({ selectProductId }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1000);

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const fetchData = useCallback(() => {
    dispatch(getAllProducts(page, limit));
  }, [dispatch, limit, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (products) {
      setData(products);
    }
  }, [products]);

  const columns = React.useMemo(
    () => [
      { field: "id", headerName: "ID", width: 130 },
      {
        field: "image",
        headerName: "Image",
        width: 150,
        renderCell: (params) => (
          <img
            src={params.value[0]}
            alt="product"
            style={{ width: 40, height: 40, objectFit: "contain" }}
          />
        ),
      },
      { field: "name", headerName: "Name", width: 350 },
      { field: "price", headerName: "Price", width: 130 },
      // { field: "average_rating", headerName: "Rating", width: 130 },
    ],
    []
  );
  // console.log(data);
  const handleSelectionChange = useCallback(
    (newSelection) => {
      selectProductId(newSelection);
    },
    [selectProductId]
  );

  return (
    <DataTableStyled style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={handleSelectionChange}
      />
    </DataTableStyled>
  );
};
