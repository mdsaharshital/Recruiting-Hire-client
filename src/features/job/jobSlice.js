import apiSlice from "../api/apiSlice";

export const jobSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobById: builder.query({
      query: (id) => `/job/${id}`,
      providesTags: ["job"],
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
    applyToJob: builder.mutation({
      query: (data) => ({
        url: "/apply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["job"],
    }),
  }),
});
export const {
  usePostJobMutation,
  useGetJobByIdQuery,
  useGetJobsQuery,
  useApplyToJobMutation,
} = jobSlice;
