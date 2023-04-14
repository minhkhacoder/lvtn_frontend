/** @format */

import authReducer from "./authReducer";
import brandReducer from "./brandReducer";
import categoryReducer from "./categoryReducer";
import imagesReducer from "./imagesReducer";
import ordersReducer from "./ordersReducer";
import productReducer from "./productReducer";
import revenuesReducer from "./revenueReducer";

const { combineReducers } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  brands: brandReducer,
  products: productReducer,
  images: imagesReducer,
  orders: ordersReducer,
  revenues: revenuesReducer,
});

export default rootReducer;
