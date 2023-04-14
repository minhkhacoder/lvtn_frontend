/** @format */

import { getAccessToken } from "utils/cookies";

const apiUrl = "http://localhost:3000";

const api = {
  get: (endpoint) => {
    const accessToken = getAccessToken();
    return fetch(`${apiUrl}/${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => response.json());
  },

  post: (endpoint, data) => {
    const accessToken = getAccessToken();
    return fetch(`${apiUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  },

  postFormData: (endpoint, data) => {
    const accessToken = getAccessToken();
    return fetch(`${apiUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: data,
    }).then((response) => response.json());
  },

  put: (endpoint, data) => {
    const accessToken = getAccessToken();
    return fetch(`${apiUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  },

  putFormData: (endpoint, data) => {
    const accessToken = getAccessToken();
    return fetch(`${apiUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: data,
    }).then((response) => response.json());
  },

  delete: (endpoint, data) => {
    console.log(data);
    const accessToken = getAccessToken();
    return fetch(`${apiUrl}/${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: data,
    }).then((response) => response.json());
  },
};

export default api;
