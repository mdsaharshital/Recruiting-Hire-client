import apiSlice from "../api/apiSlice";

export const jobSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobById: builder.query({
      query: (id) => `/job/${id}`,
    }),
    getJobs: builder.query({
      query: () => `/jobs`,
    }),
    postJob: builder.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { usePostJobMutation, useGetJobByIdQuery, useGetJobsQuery } =
  jobSlice;
