/** @format */

import {
  GET_INTERVAL_SIX_MONTH_FAILURE,
  GET_INTERVAL_SIX_MONTH_REQUEST,
  GET_INTERVAL_SIX_MONTH_SUCCESS,
} from "store/types/revenueTypes";
import api from "utils/api";

export const getIntervalSixMonthRequest = () => ({
  type: GET_INTERVAL_SIX_MONTH_REQUEST,
});

export const getIntervalSixMonthSuccess = (revenues) => ({
  type: GET_INTERVAL_SIX_MONTH_SUCCESS,
  payload: revenues,
});

export const getIntervalSixMonthFailure = (error) => ({
  type: GET_INTERVAL_SIX_MONTH_FAILURE,
  payload: error,
});

export const getRevenueIntervalSixMonth = (sellerId) => {
  return async (dispatch) => {
    dispatch(getIntervalSixMonthRequest());
    try {
      const response = await api.get(
        `revenue/interval-six-month?sellerId=${sellerId}`
      );
      if (response.success) {
        dispatch(getIntervalSixMonthSuccess(response.data));
      } else throw Error(response.message);
    } catch (error) {
      dispatch(getIntervalSixMonthFailure(error.message));
    }
  };
};
