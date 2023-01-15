import apiSlice from "../api/apiSlice";

const messageSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    getCandidate: builder.query({
      query: (id) => `candidate/${id}`,
    }),
  }),
});

export const { useGetCandidateQuery } = messageSlice;
