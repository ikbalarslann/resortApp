import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export const selectLocations = (state) => state.location.location;

export default locationSlice.reducer;
