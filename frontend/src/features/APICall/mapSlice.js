import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const initialState = {
  suggestion: {
    loading: null,
    error: null,
    mapData: {
      success: null,
      data: [],
    },
  },

  fare: {
    loading: null,
    error: null,
    mapData: {
      success: null,
      fare: {},
    },
  },
};

export const getSuggestions = createAsyncThunk(
  "location-suggestion",
  async (userInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL_MAP}/getsuggestions`,
        {
          params: { input: userInput },
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

export const getFare = createAsyncThunk(
  "GetFare",
  async (args, { rejectWithValue }) => {
    try {
      const { destination, pickUp } = args;

      console.log("Pickup: ", pickUp);
      console.log("Destination: ", destination);

      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL_RIDE}/getfare`,
        {
          params: { destination, pickup: pickUp },
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

export const mapSlice = createSlice({
  name: "MapSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Auto suggestion location
      .addCase(getSuggestions.pending, (state) => {
        state.suggestion.loading = true;
        state.suggestion.error = false;
      })
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.suggestion.loading = false;
        state.suggestion.mapData = action.payload;
        state.suggestion.error = false;
      })
      .addCase(getSuggestions.rejected, (state, action) => {
        state.suggestion.loading = false;
        state.suggestion.error = action.payload;
      })

      //Get fare of distance
      .addCase(getFare.pending, (state) => {
        state.fare.loading = true;
        state.fare.error = false;
      })

      .addCase(getFare.fulfilled, (state, action) => {
        state.fare.loading = false;
        state.fare.mapData = action.payload;
      })

      .addCase(getFare.rejected, (state, action) => {
        state.fare.loading = false;
        state.fare.error = action.payload;
      });
  },
});

export default mapSlice.reducer;
