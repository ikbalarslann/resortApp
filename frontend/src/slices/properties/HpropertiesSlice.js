import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Hproperties: [],
};

const HpropertiesSlice = createSlice({
  name: "Hproperties",
  initialState,
  reducers: {
    setHProperties: (state, action) => {
      state.Hproperties = action.payload;
    },
    removeProperty: (state, action) => {
      state.Hproperties = state.Hproperties.filter(
        (e) => e._id !== action.payload
      );
    },
  },
});

export const { setHProperties, removeProperty } = HpropertiesSlice.actions;

export const selectProperties = (state) => state.Hproperties;

export default HpropertiesSlice.reducer;
