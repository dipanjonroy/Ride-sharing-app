import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("captainToken");

const initialState = {
  login: {
    loading: null,
    response: {
      success: null,
      message: null,
    },
    error: null,
  },

  register: {
    loading: null,
    response: {
      success: null,
      message: null,
    },
    error: null,
  },

  profile: {
    loading: true,
    response: {},
    error: false,
  },
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
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL_CAPTAIN}/profile`,
        {
          withCredentials: true,
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
        state.register.loading = true;
      })

      .addCase(captainRegister.fulfilled, (state, action) => {
        state.register.loading = false;
        state.register.response = action.payload;
      })

      .addCase(captainRegister.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload;
      })

      //Captain login
      .addCase(captainLogin.pending, (state) => {
        state.login.loading = true;
      })

      .addCase(captainLogin.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.response = action.payload;
      })

      .addCase(captainLogin.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
      })

      //captain profile
      .addCase(captainProfile.pending, (state) => {
        state.profile.loading = true;
      })

      .addCase(captainProfile.fulfilled, (state, action) => {
        state.profile.loading = false;
        state.profile.response = action.payload;
      })

      .addCase(captainProfile.rejected, (state, action) => {
        state.profile.loading = false;
        state.profile.error = action.payload;
      });
  },
});

export default captainSlice.reducer;
