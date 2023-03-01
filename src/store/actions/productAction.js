/** @format */

import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
} from "store/types/productTypes";
import api from "utils/api";

export const createProductRequest = () => ({
  type: CREATE_PRODUCT_REQUEST,
});

export const createProductSuccess = (categories) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: categories,
});

export const createProductFailure = (error) => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error,
});

export const createProduct = (credentials) => {
  return async (dispatch) => {
    dispatch(createProductRequest());
    try {
      const response = await api.get("product/seller/create", credentials);
      if (response.success) {
        dispatch(createProductSuccess(response));
      } else throw Error(response.message);
    } catch (error) {
      dispatch(createProductFailure(error.message));
    }
  };
};
