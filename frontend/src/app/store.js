import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/APICall/userSlice";
import captainReducer from "../features/APICall/captainSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    captain: captainReducer
  },
});

export default store;
