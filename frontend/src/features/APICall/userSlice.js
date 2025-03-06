import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: null,
  response: {
    success: null,
    message: null,
    data: null,
  },
  error: null,
};

export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL_USER}/register`,
        userData,
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user-login",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL_USER}/login`,
        loginData,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userProfile = createAsyncThunk(
  "user-profile",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL_USER}/profile`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Register user
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })

      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })

      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Login user
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })

      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })

      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //user profile
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })

      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
