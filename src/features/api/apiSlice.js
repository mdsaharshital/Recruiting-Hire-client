import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://recruiting-hire-server.vercel.app",
  }),
  endpoints: (builder) => ({
    // code splited
  }),
});
export default apiSlice;
