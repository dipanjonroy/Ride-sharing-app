import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  token: localStorage.getItem("token"),
};

export const userLogout = createAsyncThunk(
  "userLogout",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:4000/api/users/logout",
        {},{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userLogoutSlice = createSlice({
  name: "userLogout",
  initialState,
  reducers: {
    logout: (state)=>{
      state.token = null;
      localStorage.removeItem("token")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogout.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.token = null;
        localStorage.removeItem("token")
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {logout} = userLogoutSlice.actions;
export default userLogoutSlice.reducer;
