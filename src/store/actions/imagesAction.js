/** @format */

import {
  DELETE_IMAGE_FAILURE,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
} from "store/types/imagesTypes";
import api from "utils/api";

export const deteteImageRequest = () => ({
  type: DELETE_IMAGE_REQUEST,
});

export const deleteImageSuccess = (image) => ({
  type: DELETE_IMAGE_SUCCESS,
  payload: image,
});

export const deleteImageFailure = (error) => ({
  type: DELETE_IMAGE_FAILURE,
  payload: error,
});

export const deleteImage = (credentials) => {
  return async (dispatch) => {
    dispatch(deteteImageRequest());
    try {
      const response = await api.delete("images/delete", credentials);
      if (response.success) {
        dispatch(deleteImageSuccess(response.message));
      } else throw Error(response.message);
    } catch (error) {
      dispatch(deleteImageFailure(error.message));
    }
  };
};
