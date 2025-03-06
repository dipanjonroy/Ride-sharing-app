import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: null,
  response: {
    success: null,
    message: null,
  },
  error: null,
};

export const captainRegister = createAsyncThunk(
  "captain register",
  async (captainData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL_CAPTAIN}/register`,
        captainData,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const captainLogin = createAsyncThunk(
  "captain-login",
  async (captainData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL_CAPTAIN}/login`,
        captainData,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const captainProfile = createAsyncThunk(
  "captain-profile",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL_CAPTAIN}/profile`,
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

export const captainSlice = createSlice({
  name: "Captain",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //captain register
      .addCase(captainRegister.pending, (state) => {
        state.loading = true;
      })

      .addCase(captainRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })

      .addCase(captainRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Captain login
      .addCase(captainLogin.pending, (state) => {
        state.loading = true;
      })

      .addCase(captainLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })

      .addCase(captainLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //captain profile
      .addCase(captainProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(captainProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })

      .addCase(captainProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default captainSlice.reducer;
