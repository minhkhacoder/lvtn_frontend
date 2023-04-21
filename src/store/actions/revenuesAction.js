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
import api from "utils/api";
import { getWeekNumber } from "utils/getWeekNumber";

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

// ========= GET ALL DAY IN MONTH ================
export const getAllDayInMonthRequest = () => ({
  type: GET_ALL_DAY_IN_MONTH_REQUEST,
});

export const getAllDayInMonthSuccess = (revenues) => ({
  type: GET_ALL_DAY_IN_MONTH_SUCCESS,
  payload: revenues,
});

export const getAllDayInMonthFailure = (error) => ({
  type: GET_ALL_DAY_IN_MONTH_FAILURE,
  payload: error,
});

export const getRevenueDayInMonth = (sellerId, month, year) => {
  return async (dispatch) => {
    dispatch(getAllDayInMonthRequest());
    try {
      const response = await api.get(
        `revenue/day-in-month?sellerId=${sellerId}&month=${month}&year=${year}`
      );
      if (response.success) {
        dispatch(getAllDayInMonthSuccess(response.data));
      } else throw Error(response.message);
    } catch (error) {
      dispatch(getAllDayInMonthFailure(error.message));
    }
  };
};

// ========= GET ALL WEEK IN YEAR ================
export const getAllWeekInYearRequest = () => ({
  type: GET_ALL_WEEK_IN_YEAR_REQUEST,
});

export const getAllWeekInYearSuccess = (revenues) => ({
  type: GET_ALL_WEEK_IN_YEAR_SUCCESS,
  payload: revenues,
});

export const getAllWeekInYearFailure = (error) => ({
  type: GET_ALL_WEEK_IN_YEAR_FAILURE,
  payload: error,
});

export const getRevenueWeekInYear = (sellerId, year) => {
  return async (dispatch) => {
    dispatch(getAllWeekInYearRequest());
    try {
      const response = await api.get(
        `revenue/all-week-in-year?sellerId=${sellerId}&year=${year}`
      );
      if (response.success) {
        const today = new Date();
        const currentWeek = getWeekNumber(today)[1];
        const weeks = [];
        for (let week = 1; week <= currentWeek; week++) {
          let flag = 0;
          for (let index = 0; index < response.data.length; index++) {
            if (response.data[index].week === week) {
              flag = 1;
              weeks.push({
                year: response.data[index].year,
                week: response.data[index].week,
                revenue: parseFloat(response.data[index].revenue),
              });
              break;
            }
          }
          if (!flag) weeks.push({ year: year, week: week, revenue: 0.0 });
        }
        dispatch(getAllWeekInYearSuccess(weeks));
      } else throw Error(response.message);
    } catch (error) {
      dispatch(getAllWeekInYearFailure(error.message));
    }
  };
};

// ========= GET ALL MONTH IN YEAR ================
export const getAllMonthInYearRequest = () => ({
  type: GET_ALL_MONTH_IN_YEAR_REQUEST,
});

export const getAllMonthInYearSuccess = (revenues) => ({
  type: GET_ALL_MONTH_IN_YEAR_SUCCESS,
  payload: revenues,
});

export const getAllMonthInYearFailure = (error) => ({
  type: GET_ALL_MONTH_IN_YEAR_FAILURE,
  payload: error,
});

export const getRevenueMonthInYear = (sellerId, year) => {
  return async (dispatch) => {
    dispatch(getAllMonthInYearRequest());
    try {
      const response = await api.get(
        `revenue/all-month-of-year?sellerId=${sellerId}&year=${year}`
      );
      if (response.success) {
        dispatch(getAllMonthInYearSuccess(response.data));
      } else throw Error(response.message);
    } catch (error) {
      dispatch(getAllMonthInYearFailure(error.message));
    }
  };
};
