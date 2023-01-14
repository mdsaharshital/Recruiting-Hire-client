import apiSlice from "../api/apiSlice";

export const jobSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobById: builder.query({
      query: (id) => `/job/${id}`,
      providesTags: ["job"],
    }),
    getJobs: builder.query({
      query: () => `/jobs`,
      providesTags: ["jobs"],
    }),
    appliedJobs: builder.query({
      query: (email) => `/applied-jobs/${email}`,
    }),
    postJob: builder.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
    }),
    updateJob: builder.mutation({
      query: (data) => ({
        url: "/updateJob",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),
    applyToJob: builder.mutation({
      query: (data) => ({
        url: "/apply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["job"],
    }),
    addQuery: builder.mutation({
      query: (data) => ({
        url: "/query",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["job"],
    }),
    addReply: builder.mutation({
      query: (data) => ({
        url: "/reply",
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
  useAddQueryMutation,
  useAddReplyMutation,
  useAppliedJobsQuery,
  useUpdateJobMutation,
} = jobSlice;
