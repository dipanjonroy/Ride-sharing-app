import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  error: null,
  status: false
};

export const registerUser = createAsyncThunk(
  "userRegister",
  async (userdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        userdata
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
    builder
    .addCase(registerUser.pending, (state)=>{
      state.loading = true;
      state.error = null;
      state.status = false
    })
    .addCase(registerUser.fulfilled, (state, action)=>{
      state.loading = false;
      state.user = action.payload;
      state.status = true
    })
    .addCase(registerUser.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload
      state.status = false
    })
  },
});

export default userRegisterSlice.reducer;
