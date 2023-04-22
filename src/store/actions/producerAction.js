/** @format */

import {
  CREATE_PRODUCER_FAILURE,
  CREATE_PRODUCER_REQUEST,
  CREATE_PRODUCER_SUCCESS,
  GET_ALL_PRODUCER_FAILURE,
  GET_ALL_PRODUCER_REQUEST,
  GET_ALL_PRODUCER_SUCCESS,
} from "store/types/producerTypes";
import Swal from "sweetalert2";
import api from "utils/api";

export const getAllProducerRequest = () => ({
  type: GET_ALL_PRODUCER_REQUEST,
});

export const getAllProducerSuccess = (producers) => ({
  type: GET_ALL_PRODUCER_SUCCESS,
  payload: producers,
});

export const getAllProducerFailure = (error) => ({
  type: GET_ALL_PRODUCER_FAILURE,
  payload: error,
});

export const getAllProducer = () => {
  return async (dispatch) => {
    dispatch(getAllProducerRequest());
    try {
      const response = await api.get("producer/all");
      if (response.success) {
        dispatch(getAllProducerSuccess(response));
      } else throw Error(response.message);
    } catch (error) {
      dispatch(getAllProducerFailure(error.message));
    }
  };
};

// ========== CREATE BRAND ==============
export const createProducerRequest = () => ({
  type: CREATE_PRODUCER_REQUEST,
});

export const createProducerSuccess = (producer) => ({
  type: CREATE_PRODUCER_SUCCESS,
  payload: producer,
});

export const createProducerFailure = (error) => ({
  type: CREATE_PRODUCER_FAILURE,
  payload: error,
});

export const createProducer = (credentials) => {
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
    dispatch(createProducerRequest());
    try {
      const response = await api.post("producer/create", credentials);
      if (response.success) {
        dispatch(createProducerSuccess(response));
        Toast.fire({
          icon: "success",
          title: response.message,
        });
      } else throw Error(response.message);
    } catch (error) {
      dispatch(createProducerFailure(error.message));
    }
  };
};
