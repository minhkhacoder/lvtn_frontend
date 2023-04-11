/** @format */

import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
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
  console.log(credentials);
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
