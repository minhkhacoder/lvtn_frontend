/** @format */

import {
  CREATE_SALE_FAILURE,
  CREATE_SALE_REQUEST,
  CREATE_SALE_SUCCESS,
  GET_ALL_SALE_FAILURE,
  GET_ALL_SALE_REQUEST,
  GET_ALL_SALE_SUCCESS,
} from "store/types/saleType";
import Swal from "sweetalert2";
import api from "utils/api";

// ========== CREATE SALE ==============
export const createSaleRequest = () => ({
  type: CREATE_SALE_REQUEST,
});

export const createSaleSuccess = (sales) => ({
  type: CREATE_SALE_SUCCESS,
  payload: sales,
});

export const createSaleFailure = (error) => ({
  type: CREATE_SALE_FAILURE,
  payload: error,
});

export const createSale = (credentials) => {
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
    dispatch(createSaleRequest());
    try {
      const response = await api.postFormData("sale/create", credentials);
      if (response.success) {
        dispatch(createSaleSuccess(response));
        Toast.fire({
          icon: "success",
          title: response.message,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else
        Toast.fire({
          icon: "error",
          title: response.message,
        });
    } catch (error) {
      dispatch(createSaleFailure(error.message));
    }
  };
};

// ========== GET ALL SALES ==============
export const getAllSaleRequest = () => ({
  type: GET_ALL_SALE_REQUEST,
});

export const getAllSaleSuccess = (sales) => ({
  type: GET_ALL_SALE_SUCCESS,
  payload: sales,
});

export const getAllSaleFailure = (error) => ({
  type: GET_ALL_SALE_FAILURE,
  payload: error,
});

export const getAllSale = (sellerId) => {
  return async (dispatch) => {
    dispatch(getAllSaleRequest());
    try {
      const response = await api.get(`sale/all?sellerId=${sellerId}`);
      if (response.success) {
        dispatch(getAllSaleSuccess(response.data));
      } else throw Error(response.message);
    } catch (error) {
      dispatch(getAllSaleFailure(error.message));
    }
  };
};
