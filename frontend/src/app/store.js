import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/APICall/userSlice";
import captainReducer from "../features/APICall/captainSlice";
import mapReducer from "../features/APICall/mapSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    captain: captainReducer,
    map: mapReducer,
  },
});

export default store;
