/** @format */

import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_FAILURE,
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "store/types/productTypes";
import Swal from "sweetalert2";
import api from "utils/api";

export const createProductRequest = () => ({
  type: CREATE_PRODUCT_REQUEST,
});

export const createProductSuccess = () => ({
  type: CREATE_PRODUCT_SUCCESS,
});

export const createProductFailure = (error) => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error,
});

export const createProduct = (credentials) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  return async (dispatch) => {
    dispatch(createProductRequest());
    try {
      const response = await api.postFormData(
        "product/seller/create",
        credentials
      );

      if (response.success) {
        dispatch(createProductSuccess());
        Toast.fire({
          icon: "success",
          title: response.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: response.message,
        });
        throw Error(response.message);
      }
    } catch (error) {
      dispatch(createProductFailure(error.message));
    }
  };
};

// ============= GET ALL PRODUCT ===============
export const getAllProductRequest = () => ({
  type: GET_ALL_PRODUCT_REQUEST,
});

export const getAllProductSuccess = (products) => ({
  type: GET_ALL_PRODUCT_SUCCESS,
  payload: products,
});

export const getAllProductFailure = (error) => ({
  type: GET_ALL_PRODUCT_FAILURE,
  payload: error,
});

export const getAllProducts = (page, limit) => {
  return async (dispatch) => {
    dispatch(getAllProductRequest());
    try {
      const response = await api.get(
        `product/seller/all?sellerId=SELLER01&page=${page}&limit=${limit}`
      );

      const products = response.data.map((product) => {
        return {
          ...product,
          value: 0,
        };
      });
      if (response.success) {
        dispatch(
          getAllProductSuccess({ data: products, total: response.total })
        );
      } else {
        throw Error(response.message);
      }
    } catch (error) {
      dispatch(getAllProductFailure(error.message));
    }
  };
};

// ============= GET PRODUCT DETAIL===============
export const getProductRequest = () => ({
  type: GET_PRODUCT_REQUEST,
});

export const getProductSuccess = (products) => ({
  type: GET_PRODUCT_SUCCESS,
  payload: products,
});

export const getProductFailure = (error) => ({
  type: GET_PRODUCT_FAILURE,
  payload: error,
});

export const getProductDetail = (id) => {
  return async (dispatch) => {
    dispatch(getProductRequest());
    try {
      const response = await api.get(`product/seller?proId=${id}`);
      if (response.success) {
        dispatch(getProductSuccess(response.data));
      } else {
        throw Error(response.message);
      }
    } catch (error) {
      dispatch(getProductFailure(error.message));
    }
  };
};

//=========== UPDATE PRODUCT ===========
export const updateProductRequest = () => ({
  type: UPDATE_PRODUCT_REQUEST,
});

export const updateProductSuccess = () => ({
  type: UPDATE_PRODUCT_SUCCESS,
});

export const updateProductFailure = (error) => ({
  type: UPDATE_PRODUCT_FAILURE,
  payload: error,
});

export const updateProduct = (credentials) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  return async (dispatch) => {
    dispatch(updateProductRequest());
    try {
      const response = await api.putFormData(
        "product/seller/update",
        credentials
      );

      if (response.success) {
        dispatch(updateProductSuccess());
        Toast.fire({
          icon: "success",
          title: response.message,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        Toast.fire({
          icon: "error",
          title: response.message,
        });
        throw Error(response.message);
      }
    } catch (error) {
      dispatch(updateProductFailure(error.message));
    }
  };
};

//=========== DELETE PRODUCT ===========
export const deleteProductRequest = () => ({
  type: DELETE_PRODUCT_REQUEST,
});

export const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailure = (error) => ({
  type: DELETE_PRODUCT_FAILURE,
  payload: error,
});

export const deleteProductById = (credentials) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  return async (dispatch) => {
    dispatch(deleteProductRequest());
    try {
      const response = await api.delete("product/seller/delete", credentials);

      if (response.success) {
        dispatch(deleteProductSuccess());
        Toast.fire({
          icon: "success",
          title: response.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: response.message,
        });
        throw Error(response.message);
      }
    } catch (error) {
      dispatch(deleteProductFailure(error.message));
    }
  };
};
