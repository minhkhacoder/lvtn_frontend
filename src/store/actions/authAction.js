/** @format */

import Swal from "sweetalert2";
import api from "utils/api";
import {
  removeAccessToken,
  removeRefreshToken,
  removeUser,
  setAccessToken,
  setRefreshToken,
  setUser,
} from "utils/cookies";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../types/authTypes";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (auth) => ({
  type: LOGIN_SUCCESS,
  payload: auth,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

export const login = (credentials) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await api.post("seller/login", credentials);
      if (response.success) {
        dispatch(loginSuccess(response));
        setAccessToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        setUser(JSON.stringify(response.data));
        Toast.fire({
          icon: "success",
          title: response.message,
        });
      } else throw Error(response.message);
    } catch (error) {
      dispatch(loginFailure(error.message));
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(loginRequest());
    try {
      removeAccessToken();
      removeRefreshToken();
      removeUser();
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};
