import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobDetails: {},
  error: "",
};

export const jobSlice = createSlice({
  initialState,
  name: "jobs",
  reducers: {
    getJobDetails: (state, { payload }) => {
      state.jobDetails = { ...payload };
    },
  },
});

export const { getJobDetails } = jobSlice.actions;
export default jobSlice.reducer;
