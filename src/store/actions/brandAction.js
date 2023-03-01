/** @format */

import {
  GET_ALL_BRAND_FAILURE,
  GET_ALL_BRAND_REQUEST,
  GET_ALL_BRAND_SUCCESS,
} from "store/types/brandTypes";
import api from "utils/api";

export const getAllBrandRequest = () => ({
  type: GET_ALL_BRAND_REQUEST,
});

export const getAllBrandSuccess = (categories) => ({
  type: GET_ALL_BRAND_SUCCESS,
  payload: categories,
});

export const getAllBrandFailure = (error) => ({
  type: GET_ALL_BRAND_FAILURE,
  payload: error,
});

export const getAllBrand = (credentials) => {
  return async (dispatch) => {
    dispatch(getAllBrandRequest());
    try {
      const response = await api.get("brand/all", credentials);
      if (response.success) {
        dispatch(getAllBrandSuccess(response));
      } else throw Error(response.message);
    } catch (error) {
      dispatch(getAllBrandFailure(error.message));
    }
  };
};
