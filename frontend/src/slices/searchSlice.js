import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
  },
});

export const { setProperties } = searchSlice.actions;

export const selectProperties = (state) => state.search.properties;

export default searchSlice.reducer;
