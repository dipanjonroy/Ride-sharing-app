import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicle: "",
  pickup: "",
  destination: "",
  activeField: ""
};

export const stateSlice = createSlice({
  name: "StateName",
  initialState,
  reducers: {
    vehicleType: (state, action) => {
      state.vehicle = action.payload;
    },
    setPickUp: (state, action) => {
      state.pickup = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setActiveField: (state, action) => {
      state.activeField = action.payload;
    },
  },
});

export default stateSlice.reducer;

export const { vehicleType, setPickUp,setDestination,setActiveField} = stateSlice.actions;
