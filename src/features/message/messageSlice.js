import apiSlice from "../api/apiSlice";

const messageSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    getCandidate: builder.query({
      query: (id) => `/candidate/${id}`,
    }),
    getMessages: builder.query({
      query: ({ email1, email2 }) =>
        `/getMessages?email1=${email1}&email2=${email2}`,
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: "/addMessages",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCandidateQuery,
  useAddMessageMutation,
  useGetMessagesQuery,
} = messageSlice;
