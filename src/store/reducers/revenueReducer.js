/** @format */

import {
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
        revenues: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_INTERVAL_SIX_MONTH_FAILURE:
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
