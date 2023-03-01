/** @format */

import {
  GET_ALL_BRAND_FAILURE,
  GET_ALL_BRAND_REQUEST,
  GET_ALL_BRAND_SUCCESS,
} from "store/types/brandTypes";

const initialState = {
  brand: null,
  error: null,
  isLoading: false,
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BRAND_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ALL_BRAND_SUCCESS:
      return {
        ...state,
        brand: action.payload.data,
        isLoading: false,
        error: null,
      };
    case GET_ALL_BRAND_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default brandReducer;
