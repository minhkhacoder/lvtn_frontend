/** @format */

import authReducer from "./authReducer";
import brandReducer from "./brandReducer";
import categoryReducer from "./categoryReducer";
import imagesReducer from "./imagesReducer";
import productReducer from "./productReducer";

const { combineReducers } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  brands: brandReducer,
  products: productReducer,
  images: imagesReducer,
});

export default rootReducer;
