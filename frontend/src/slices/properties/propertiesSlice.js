import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
  },
});

export const { setProperties } = propertiesSlice.actions;

export const selectProperties = (state) => state.properties;

export default propertiesSlice.reducer;
