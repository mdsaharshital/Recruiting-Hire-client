import React from "react";
import JobCard from "../components/reusable/JobCard";
import { useGetJobsQuery } from "../features/job/jobApi";
import Badge from "../components/reusable/Badge";
import SearchBar from "../components/reusable/SearchBar";
import Loading from "../components/reusable/Loading";

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
  const { data, isLoading } = useGetJobsQuery();
  return (
    <div className="pt-14">
      <div className="bg-primary/10 p-5 rounded-2xl mt-5 mx-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <h1 className="font-semibold text-xl text-center md:text-start">
            Find Jobs
          </h1>
          <SearchBar />
        </div>
        <div className="mt-5 max-w-full flex flex-wrap justify-center gap-3">
          {keywords.map((item) => (
            <Badge key={item} className="badge">
              {item}
            </Badge>
          ))}
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5 mt-5 mx-4">
          {data?.data?.map((job) => (
            <JobCard jobData={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
