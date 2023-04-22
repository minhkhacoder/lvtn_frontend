/** @format */

import {
  CREATE_BRAND_FAILURE,
  CREATE_BRAND_REQUEST,
  CREATE_BRAND_SUCCESS,
  GET_ALL_BRAND_FAILURE,
  GET_ALL_BRAND_REQUEST,
  GET_ALL_BRAND_SUCCESS,
} from "store/types/brandTypes";
import Swal from "sweetalert2";
import api from "utils/api";

export const getAllBrandRequest = () => ({
  type: GET_ALL_BRAND_REQUEST,
});

export const getAllBrandSuccess = (brands) => ({
  type: GET_ALL_BRAND_SUCCESS,
  payload: brands,
});

export const getAllBrandFailure = (error) => ({
  type: GET_ALL_BRAND_FAILURE,
  payload: error,
});

export const getAllBrand = () => {
  return async (dispatch) => {
    dispatch(getAllBrandRequest());
    try {
      const response = await api.get("brand/all");
      if (response.success) {
        dispatch(getAllBrandSuccess(response));
      } else throw Error(response.message);
    } catch (error) {
      dispatch(getAllBrandFailure(error.message));
    }
  };
};

// ========== CREATE BRAND ==============
export const createBrandRequest = () => ({
  type: CREATE_BRAND_REQUEST,
});

export const createBrandSuccess = (brands) => ({
  type: CREATE_BRAND_SUCCESS,
  payload: brands,
});

export const createBrandFailure = (error) => ({
  type: CREATE_BRAND_FAILURE,
  payload: error,
});

export const createBrand = (credentials) => {
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
    dispatch(createBrandRequest());
    try {
      const response = await api.post("brand/create", credentials);
      if (response.success) {
        dispatch(createBrandSuccess(response));
        Toast.fire({
          icon: "success",
          title: response.message,
        });
      } else throw Error(response.message);
    } catch (error) {
      dispatch(createBrandFailure(error.message));
    }
  };
};
