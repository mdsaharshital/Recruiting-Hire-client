import React from "react";
import JobCard from "../components/reusable/JobCard";
import { useGetJobsQuery } from "../features/job/jobSlice";
import { BiSearchAlt } from "react-icons/bi";
import Badge from "../components/reusable/Badge";

const keywords = [
  "Web Developer",
  "Web Designer",
  "Writer",
  "Fullstack",
  "Senior",
  "Team Lead",
  "Administration",
  "SQA",
  "Tester",
];

const Jobs = () => {
  const { data } = useGetJobsQuery();
  const searchBar = (
    <div
      id="search-container"
      className="bg-white rounded-full p-2 flex w-full max-w-md lg:max-w-xl overflow-hidden shadow-lg"
    >
      <input
        className="flex-auto text-[16px] p-2 border-none outline-none focus:ring-0"
        type="text"
        name="search"
        id="search"
        placeholder="Job title or Keyword"
      />
      <button
        id="search-button"
        className="p-2 rounded-full bg-primary  h-10 w-10 grid place-items-center"
      >
        <BiSearchAlt size="21" color="white" />
      </button>
    </div>
  );
  return (
    <div className="pt-14">
      <div className="bg-primary/10 p-5 rounded-2xl mt-5 mx-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <h1 className="font-semibold text-xl text-center md:text-start">
            Find Jobs
          </h1>
          {searchBar}
        </div>
        <div className="mt-5 max-w-full flex flex-wrap justify-center gap-3">
          {keywords.map((item) => (
            <Badge key={item} className="badge">
              {item}
            </Badge>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5 mt-5 mx-4">
        {data?.data?.map((job) => (
          <JobCard jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
