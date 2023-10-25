import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  hostInfo: localStorage.getItem("hostInfo")
    ? JSON.parse(localStorage.getItem("hostInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { type, data } = action.payload;
      if (type === "user") {
        state.userInfo = data;
        localStorage.setItem("userInfo", JSON.stringify(data));
      } else if (type === "host") {
        state.hostInfo = data;
        localStorage.setItem("hostInfo", JSON.stringify(data));
      }
    },
    logout: (state, action) => {
      const { type } = action.payload;
      if (type === "user") {
        state.userInfo = null;
        localStorage.removeItem("userInfo");
      } else if (type === "host") {
        state.hostInfo = null;
        localStorage.removeItem("hostInfo");
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
