import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/APICall/userSlice";
import captainReducer from "../features/APICall/captainSlice";
import mapReducer from "../features/APICall/mapSlice";
import stateReducer from "../features/State management/stateSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    captain: captainReducer,
    map: mapReducer,
    state: stateReducer,
  },
});

export default store;
