import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  loading: null,
  error: null,
  mapData: {
    success: null,
    data: [],
  },
};

export const getSuggestions = createAsyncThunk(
  "location-suggestion",
  async (userInput, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
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

export const mapSlice = createSlice({
  name: "MapSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestions.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.mapData = action.payload;
        state.error = false;
      })
      .addCase(getSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mapSlice.reducer;
