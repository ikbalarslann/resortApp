import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import propertiesReducer from "./slices/propertiesSlice";
import dateReducer from "./slices/dateSlice";
import locationReducer from "./slices/locationSlice";
import SCpropertiesReducer from "./slices/SCproperties";
import WLpropertiesReducer from "./slices/WLproperties";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    properties: propertiesReducer,
    SCproperties: SCpropertiesReducer,
    WLproperties: WLpropertiesReducer,
    date: dateReducer,
    location: locationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
