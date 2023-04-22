/** @format */

import {
  CREATE_PRODUCER_FAILURE,
  CREATE_PRODUCER_REQUEST,
  CREATE_PRODUCER_SUCCESS,
  GET_ALL_PRODUCER_FAILURE,
  GET_ALL_PRODUCER_REQUEST,
  GET_ALL_PRODUCER_SUCCESS,
} from "store/types/producerTypes";

const initialState = {
  producer: null,
  error: null,
  isLoading: false,
};

const producerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ALL_PRODUCER_SUCCESS:
      return {
        ...state,
        producer: action.payload.data,
        isLoading: false,
        error: null,
      };
    case GET_ALL_PRODUCER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CREATE_PRODUCER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_PRODUCER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case CREATE_PRODUCER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default producerReducer;
