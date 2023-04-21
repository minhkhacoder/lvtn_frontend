/** @format */

import {
  GET_ALL_DAY_IN_MONTH_FAILURE,
  GET_ALL_DAY_IN_MONTH_REQUEST,
  GET_ALL_DAY_IN_MONTH_SUCCESS,
  GET_ALL_MONTH_IN_YEAR_FAILURE,
  GET_ALL_MONTH_IN_YEAR_REQUEST,
  GET_ALL_MONTH_IN_YEAR_SUCCESS,
  GET_ALL_WEEK_IN_YEAR_FAILURE,
  GET_ALL_WEEK_IN_YEAR_REQUEST,
  GET_ALL_WEEK_IN_YEAR_SUCCESS,
  GET_INTERVAL_SIX_MONTH_FAILURE,
  GET_INTERVAL_SIX_MONTH_REQUEST,
  GET_INTERVAL_SIX_MONTH_SUCCESS,
} from "store/types/revenueTypes";

const initialState = {
  revenues: null,
  error: null,
  isLoading: false,
};

const revenuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INTERVAL_SIX_MONTH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_INTERVAL_SIX_MONTH_SUCCESS:
      return {
        ...state,
        revenuesSixMonth: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_INTERVAL_SIX_MONTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_ALL_DAY_IN_MONTH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ALL_DAY_IN_MONTH_SUCCESS:
      return {
        ...state,
        revenuesDay: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_ALL_DAY_IN_MONTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_ALL_WEEK_IN_YEAR_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ALL_WEEK_IN_YEAR_SUCCESS:
      return {
        ...state,
        revenuesWeek: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_ALL_WEEK_IN_YEAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_ALL_MONTH_IN_YEAR_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ALL_MONTH_IN_YEAR_SUCCESS:
      return {
        ...state,
        revenuesMonth: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_ALL_MONTH_IN_YEAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default revenuesReducer;
