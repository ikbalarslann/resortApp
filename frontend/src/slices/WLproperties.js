import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  WLproperties: [],
};

const WLpropertiesSlice = createSlice({
  name: "WLproperties",
  initialState,
  reducers: {
    setWLproperties: (state, action) => {
      state.WLproperties = action.payload;
    },
    removeProperty: (state, action) => {
      state.WLproperties = state.WLproperties.filter(
        (e) => e._id !== action.payload
      );
    },
  },
});

export const { setWLproperties, removeProperty } = WLpropertiesSlice.actions;

export const selectProperties = (state) => state.WLproperties;

export default WLpropertiesSlice.reducer;
