import { configureStore } from "@reduxjs/toolkit";
import userReducers from "../features/user/userSlice";
import userLoginReducer from "../features/user/userLoginSlice";
import UserLogoutReducer from "../features/user/userLogOutSlice";

export const store = configureStore({
  reducer: {
    user: userReducers,
    userLogin: userLoginReducer,
    userLogout: UserLogoutReducer,
  },
});
