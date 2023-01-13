import apiSlice from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (email) => `/user/${email}`,
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: `user`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useGetUserQuery, useRegisterUserMutation } = authApi;
