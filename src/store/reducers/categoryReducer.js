/** @format */

const {
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_FAILURE,
} = require("store/types/categoryTypes");

const initialState = {
  category: null,
  error: null,
  isLoading: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload.data,
        isLoading: false,
        error: null,
      };
    case GET_ALL_CATEGORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default categoryReducer;
