import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Sproperties: [],
};

const SpropertiesSlice = createSlice({
  name: "Sproperties",
  initialState,
  reducers: {
    setSProperties: (state, action) => {
      state.Sproperties = action.payload;
    },
    removeProperty: (state, action) => {
      state.Sproperties = state.Sproperties.filter(
        (e) => e._id !== action.payload
      );
    },
  },
});

export const { setSProperties, removeProperty } = SpropertiesSlice.actions;

export const selectProperties = (state) => state.Sproperties;

export default SpropertiesSlice.reducer;
