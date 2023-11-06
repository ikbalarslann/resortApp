import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SCproperties: [],
};

const SCpropertiesSlice = createSlice({
  name: "SCproperties",
  initialState,
  reducers: {
    setSCproperties: (state, action) => {
      state.SCproperties = action.payload;
    },
    removeProperty: (state, action) => {
      state.SCproperties = state.SCproperties.filter(
        (e) => e._id !== action.payload
      );
    },
  },
});

export const { setSCproperties, removeProperty } = SCpropertiesSlice.actions;

export const selectProperties = (state) => state.SCproperties;

export default SCpropertiesSlice.reducer;
