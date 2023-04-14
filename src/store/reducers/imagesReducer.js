/** @format */

import {
  DELETE_IMAGE_FAILURE,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
} from "store/types/images";

const initialState = {
  images: null,
  error: null,
  isLoading: false,
};

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_IMAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_IMAGE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: null,
      };
    case DELETE_IMAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default imagesReducer;
