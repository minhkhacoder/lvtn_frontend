/** @format */
import {
  CREATE_SALE_FAILURE,
  CREATE_SALE_REQUEST,
  CREATE_SALE_SUCCESS,
  GET_ALL_SALE_FAILURE,
  GET_ALL_SALE_REQUEST,
  GET_ALL_SALE_SUCCESS,
} from "store/types/saleType";

const initialState = {
  sales: null,
  error: null,
  isLoading: false,
};

const saleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SALE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_SALE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case CREATE_SALE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_ALL_SALE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ALL_SALE_SUCCESS:
      return {
        ...state,
        sales: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_ALL_SALE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default saleReducer;
