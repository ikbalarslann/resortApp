import { apiSlice } from "./apiSlice";
const HOSTS_URL = "/api/hosts";

export const hostApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    hlogin: builder.mutation({
      query: (data) => ({
        url: `${HOSTS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    hlogout: builder.mutation({
      query: () => ({
        url: `${HOSTS_URL}/logout`,
        method: "POST",
      }),
    }),
    hregister: builder.mutation({
      query: (data) => ({
        url: `${HOSTS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    hupdateUser: builder.mutation({
      query: (data) => ({
        url: `${HOSTS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useHloginMutation,
  useHlogoutMutation,
  useHregisterMutation,
  useHupdateUserMutation,
} = hostApiSlice;
