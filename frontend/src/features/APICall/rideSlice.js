import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  createRide: { loading: false, data: {}, error: null },
  acceptRide: { loading: false, data: {}, error: null },
  confirmRide: { loading: false, data: {}, error: null },
};

const captainToken = Cookies.get("captainToken");

export const createRide = createAsyncThunk(
  "creat-ride",
  async (info, { rejectWithValue }) => {
    const { pickup, destination, vehicleType } = info;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL_RIDE}/createride`,
        { pickup, destination, vehicleType },
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

export const getAcceptedRide = createAsyncThunk(
  "accept-ride",
  async (data, { rejectWithValue }) => {
    const { rideId } = data;
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_SERVER_URL_RIDE}/accept-ride`,
        {
          rideId,
        },
        {
          withCredentials: true,
        }
      );

      return data;
    } catch {
      rejectWithValue(error.response.data.message);
    }
  }
);

export const confirmRide = createAsyncThunk(
  "confirm-ride",
  async (data, { rejectWithValue }) => {
    const { rideId, otp } = data;

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL_RIDE}/confirm-ride`,
        { 
          params: {rideId, otp},
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);

export const rideSlice = createSlice({
  name: "create-slice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRide.pending, (state) => {
        state.createRide.loading = true;
      })
      .addCase(createRide.fulfilled, (state, action) => {
        state.createRide.loading = false;
        state.createRide.data = action.payload;
      })
      .addCase(createRide.rejected, (state, action) => {
        state.createRide.loading = false;
        state.createRide.error = action.payload;
      })

      .addCase(getAcceptedRide.pending, (state) => {
        state.acceptRide.loading = true;
      })

      .addCase(getAcceptedRide.fulfilled, (state, action) => {
        state.acceptRide.loading = false;
        state.acceptRide.data = action.payload;
      })

      .addCase(getAcceptedRide.rejected, (state, action) => {
        state.acceptRide.loading = false;
        state.acceptRide.error = action.payload;
      })

      .addCase(confirmRide.pending, (state) => {
        state.confirmRide.loading = true;
      })

      .addCase(confirmRide.fulfilled, (state, action) => {
        state.confirmRide.loading = false;
        state.confirmRide.data = action.payload;
      })

      .addCase(confirmRide.rejected, (state, action) => {
        state.confirmRide.loading = false;
        state.confirmRide.error = action.payload;
      });
  },
});

export default rideSlice.reducer;
