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
import Swal from "sweetalert2";
import api from "utils/api";

export const getAllOrdersRequest = () => ({
  type: GET_ALL_ORDERS_REQUEST,
});

export const getAllOrdersSuccess = (orders) => ({
  type: GET_ALL_ORDERS_SUCCESS,
  payload: orders,
});

export const getAllOrdersFailure = (error) => ({
  type: GET_ALL_ORDERS_FAILURE,
  payload: error,
});

export const getAllOrders = (sellerId, page, limit) => {
  return async (dispatch) => {
    dispatch(getAllOrdersRequest());
    try {
      const response = await api.get(
        `order/seller/all?sellerId=${sellerId}&page=${page}&limit=${limit}`
      );
      if (response.success) {
        dispatch(getAllOrdersSuccess(response));
      } else throw Error(response.message);
    } catch (error) {
      dispatch(getAllOrdersFailure(error.message));
    }
  };
};

// ========== GET DETAIL ORDER ===============
export const getDetailOrderRequest = () => ({
  type: GET_DETAIL_ORDER_REQUEST,
});

export const getDetailOrderSuccess = (order) => ({
  type: GET_DETAIL_ORDER_SUCCESS,
  payload: order,
});

export const getDetailOrderFailure = (error) => ({
  type: GET_DETAIL_ORDER_FAILURE,
  payload: error,
});

export const getDetailOrder = (orderId) => {
  return async (dispatch) => {
    dispatch(getDetailOrderRequest());
    try {
      const response = await api.get(`order/seller/detail?orderId=${orderId}`);

      if (response.success) {
        dispatch(getDetailOrderSuccess(response.data));
      } else throw Error(response.message);
    } catch (error) {
      dispatch(getAllOrdersFailure(error.message));
    }
  };
};

// ========== UPDATE STATUS ============

export const updateStatusOrderRequest = () => ({
  type: UPDATE_STATUS_ORDER_REQUEST,
});

export const updateStatusOrderSuccess = () => ({
  type: UPDATE_STATUS_ORDER_SUCCESS,
});

export const updateStatusOrderFailure = (error) => ({
  type: UPDATE_STATUS_ORDER_FAILURE,
  payload: error,
});

export const updateStatusOrder = (orderId, status) => {
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
    dispatch(updateStatusOrderRequest());
    try {
      const response = await api.put(`order/seller/update-status`, {
        orderId: orderId,
        status: status,
      });

      if (response.success) {
        dispatch(updateStatusOrderSuccess());
        Toast.fire({
          icon: "success",
          title: response.message,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else throw Error(response.message);
    } catch (error) {
      dispatch(updateStatusOrderFailure(error.message));
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };
};
