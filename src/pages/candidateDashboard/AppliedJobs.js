import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useAppliedJobsQuery,
  useGetJobsQuery,
} from "../../features/job/jobApi";
import { BsChevronRight } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";
import Loading from "../../components/reusable/Loading";

const AppliedJobs = () => {
  const navigate = useNavigate();
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const {
    // data,
    isLoading,
  } = useAppliedJobsQuery(email);
  const { data: getJobsData, isLoading: getJobsLoading } = useGetJobsQuery();
  //
  if (isLoading || getJobsLoading) {
    return <Loading />;
  }
  // check which job candidate applied
  const filteredData = getJobsData?.data.filter((data) =>
    data.applicants.some((newD) => newD.email === email)
  );

  if (filteredData?.length === 0) {
    return (
      <div className="h-screen w-full flex flex-col gap-5 justify-center items-center">
        <p className="text-3xl text-red-500">No jobs found.</p>
        <Link to="/" className="flex items-center mb-3 lg:mb-0">
          <FaChevronLeft />
          <h1>Back</h1>
        </Link>
      </div>
    );
  }
  return (
    <div className="px-3">
      <h1 className="text-xl py-5">Applied jobs</h1>
      <Link to="/" className="flex items-center mb-3">
        <FaChevronLeft />
        <h1>Back</h1>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-5">
        {filteredData?.map(({ _id, position, companyName }, index) => (
          <div
            key={_id}
            className="border border-gray-300 shadow-md p-4 rounded-xl text-primary"
          >
            <div className="flex justify-between  text-primary ">
              <div>
                <p
                  className="text-xl cursor-pointer hover:text-blue-500"
                  onClick={() => navigate(`/job-details/${_id}`)}
                >
                  {index + 1}. {position}
                </p>
                <small className="text-primary/40 ">
                  by{" "}
                  <span className="font-semibold hover:text-primary cursor-pointer hover:underline transition-all">
                    {companyName}
                  </span>
                </small>
              </div>
              <button
                className=""
                onClick={() => navigate(`/job-details/${_id}`)}
              >
                <BsChevronRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
