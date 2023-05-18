import React, { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Filter jobs based on the searchQuery
    const filteredJobs = data?.data?.filter((job) => {
      const position = job?.position?.toLowerCase();
      const requirements = job?.requirements || [];
      const skills = job?.skills || [];
      const query = searchQuery.toLowerCase();

      // Check if the position or any requirement matches the searchQuery
      const isMatched =
        position.includes(query) ||
        // is requirement is macthed
        requirements.some((requirement) =>
          requirement.toLowerCase().includes(query)
        ) ||
        // is skills are macthed
        skills.some((skill) => skill.toLowerCase().includes(query));
      return isMatched;
    });

    return filteredJobs;
  };

  return (
    <div className="pt-14 min-h-screen">
      <div className="bg-primary/10 p-5 rounded-2xl mt-5 mx-2 h-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 h-full">
          <h1 className="font-semibold text-xl text-center md:text-start">
            Find Jobs
          </h1>
          <SearchBar
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />
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
      ) : handleSearch().length === 0 ? (
        <div className="py-[20vh] flex justify-center items-center">
          <p className="text-xl text-center text-red-500 font-bold">
            No jobs matched
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5 my-5 mx-4">
          {handleSearch().map((job) => (
            <JobCard key={job._id} jobData={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
