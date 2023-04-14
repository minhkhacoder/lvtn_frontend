/** @format */

import {
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_DETAIL_ORDER_FAILURE,
  GET_DETAIL_ORDER_REQUEST,
  GET_DETAIL_ORDER_SUCCESS,
  UPDATE_STATUS_ORDER_FAILURE,
  UPDATE_STATUS_ORDER_REQUEST,
  UPDATE_STATUS_ORDER_SUCCESS,
} from "store/types/ordersTypes.js";

const initialState = {
  orders: null,
  error: null,
  isLoading: false,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.data,
        total: action.payload.total,
        isLoading: false,
        error: null,
      };
    case GET_ALL_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_DETAIL_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_DETAIL_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_DETAIL_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_STATUS_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UPDATE_STATUS_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case UPDATE_STATUS_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default ordersReducer;
