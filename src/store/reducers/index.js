/** @format */

import authReducer from "./authReducer";
import brandReducer from "./brandReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";

const { combineReducers } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  brands: brandReducer,
  products: productReducer,
});

export default rootReducer;
