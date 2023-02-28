/** @format */
import Cookies from "js-cookie";
const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const USER = "user";

export const setAccessToken = (accessToken) => {
  Cookies.set(ACCESS_TOKEN, accessToken, { expires: 1 });
};

export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN);
};

export const removeAccessToken = () => {
  Cookies.remove(ACCESS_TOKEN);
};

export const setRefreshToken = (refreshToken) => {
  Cookies.set(REFRESH_TOKEN, refreshToken, { expires: 30 });
};

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN);
};

export const removeRefreshToken = () => {
  Cookies.remove(REFRESH_TOKEN);
};

export const setUser = (user) => {
  Cookies.set(USER, user, { expires: 30 });
};

export const getUser = () => {
  return Cookies.get(USER);
};

export const removeUser = () => {
  Cookies.remove(USER);
};
