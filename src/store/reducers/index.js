/** @format */

import authReducer from "./authReducer";
import brandReducer from "./brandReducer";
import categoryReducer from "./categoryReducer";
import imagesReducer from "./imagesReducer";
import ordersReducer from "./ordersReducer";
import producerReducer from "./producerReducer";
import productReducer from "./productReducer";
import revenuesReducer from "./revenueReducer";
import saleReducer from "./saleReducer";

const { combineReducers } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  brands: brandReducer,
  producers: producerReducer,
  products: productReducer,
  images: imagesReducer,
  orders: ordersReducer,
  revenues: revenuesReducer,
  sales: saleReducer,
});

export default rootReducer;
