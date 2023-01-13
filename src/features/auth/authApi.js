import apiSlice from "../api/apiSlice";
import { getUserDB } from "./authSlice";

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
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          dispatch(getUserDB(data.email));
        } catch (error) {
          //
        }
      },
    }),
  }),
});
export const { useGetUserQuery, useRegisterUserMutation } = authApi;
