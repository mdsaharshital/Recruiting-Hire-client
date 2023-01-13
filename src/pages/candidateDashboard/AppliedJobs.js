import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppliedJobsQuery } from "../../features/job/jobSlice";
import { BsChevronRight } from "react-icons/bs";

const AppliedJobs = () => {
  const navigate = useNavigate();
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useAppliedJobsQuery(email);

  if (isLoading) {
    return <p className="text-xl py-5">Loading.....</p>;
  }

  return (
    <div className="px-3">
      <h1 className="text-xl py-5">Applied jobs</h1>
      <div className="grid grid-cols-2 gap-5 pb-5 ">
        {data?.data?.map(
          ({ _id, position, companyName, location, employmentType }) => (
            <div
              key={_id}
              className="border border-gray-300 shadow-md p-4 rounded-xl text-primary"
            >
              <div
                className="flex justify-between  text-primary cursor-pointer"
                onClick={() => navigate(`/job-details/${_id}`)}
              >
                <div>
                  <p className="text-xl">{position}</p>
                  <small className="text-primary/40 ">
                    by{" "}
                    <span className="font-semibold hover:text-primary cursor-pointer hover:underline transition-all">
                      {companyName}
                    </span>
                  </small>
                </div>
                <button className="">
                  <BsChevronRight />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
