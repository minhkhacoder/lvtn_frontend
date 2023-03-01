/** @format */

import {
  GET_ALL_CATEGORY_FAILURE,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
} from "store/types/categoryTypes";
import api from "utils/api";

export const getAllCategoryRequest = () => ({
  type: GET_ALL_CATEGORY_REQUEST,
});

export const getAllCategorySuccess = (categories) => ({
  type: GET_ALL_CATEGORY_SUCCESS,
  payload: categories,
});

export const getAllCategoryFailure = (error) => ({
  type: GET_ALL_CATEGORY_FAILURE,
  payload: error,
});

export const getAllCategory = (credentials) => {
  return async (dispatch) => {
    dispatch(getAllCategoryRequest());
    try {
      const response = await api.get("category/all", credentials);
      if (response.success) {
        dispatch(getAllCategorySuccess(response));
      } else throw Error(response.message);
    } catch (error) {
      dispatch(getAllCategoryFailure(error.message));
    }
  };
};
