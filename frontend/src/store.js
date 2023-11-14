import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apis/apiSlice";
import propertiesReducer from "./slices/properties/propertiesSlice";
import dateReducer from "./slices/searchbars/dateSlice";
import locationReducer from "./slices/searchbars/locationSlice";
import SCpropertiesReducer from "./slices/properties/SCproperties";
import WLpropertiesReducer from "./slices/properties/WLproperties";
import HpropertiesReducer from "./slices/properties/HpropertiesSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    properties: propertiesReducer,
    SCproperties: SCpropertiesReducer,
    WLproperties: WLpropertiesReducer,
    Hproperties: HpropertiesReducer,
    date: dateReducer,
    location: locationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
