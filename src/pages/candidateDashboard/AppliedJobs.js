import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useAppliedJobsQuery,
  useGetJobsQuery,
} from "../../features/job/jobApi";
import { BsChevronRight } from "react-icons/bs";

const AppliedJobs = () => {
  const navigate = useNavigate();
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useAppliedJobsQuery(email);
  const { data: getJobsData, isLoading: getJobsLoading } = useGetJobsQuery();
  // console.log("", getJobsData);
  if (isLoading) {
    return <p className="text-xl py-5">Loading.....</p>;
  }
  const filteredData = getJobsData?.data.filter((data) =>
    data.applicants.filter((newD) => newD.email === email)
  );
  console.log(filteredData);
  return (
    <div className="px-3">
      <h1 className="text-xl py-5">Applied jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-5">
        {getJobsData?.data
          ?.filter((data) =>
            data.applicants.filter((newD) => newD.email === email)
          )
          ?.map(({ _id, position, companyName }, index) => (
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
