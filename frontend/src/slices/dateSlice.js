import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: null,
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;

export const selectDates = (state) => state.date.date;

export default dateSlice.reducer;
