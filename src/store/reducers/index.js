/** @format */

import authReducer from "./authReducer";

const { combineReducers } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
