import React from "react";
import {
  useGetJobsQuery,
  useUpdateJobMutation,
} from "../../features/job/jobSlice";
import { useSelector } from "react-redux";
import { HiLockClosed, HiLockOpen } from "react-icons/hi";
import { toast } from "react-hot-toast";

const MyPostedJobs = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetJobsQuery();
  const [updateJob, {}] = useUpdateJobMutation();
  const jobInfo = data?.data || [];
  console.log(jobInfo);
  const handleStatus = (job) => {
    const newData = { ...job, jobStatus: !job.jobStatus };
    console.log("", newData);
    updateJob(newData).finally(() => {
      return toast.success("Job status changed");
    });
  };
  if (isLoading) {
    return <p className="text-center my-5">Loading.....</p>;
  }
  return (
    <div className="md:mx-8 my-8">
      <p className="my-3">My posted jobs</p>
      <div className="overflow-x-auto ">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-200 text-xs font-medium text-gray-700 uppercase tracking-wider">
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Total Applicants</th>
              <th className="px-4 py-2">Job Status</th>
              <th className="px-4 py-2">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {/* filter only the posted persons job */}
            {jobInfo
              .filter((job) => job?.jobPostedBy === user?.email)
              .map((job) => (
                <tr key={job._id} className="text-left">
                  <td className="border px-4 py-2">{job?.position}</td>
                  <td className="border px-4 py-2">{job?.applicants.length}</td>
                  <td
                    className={`border px-4 py-2 flex items-center ${
                      job?.jobStatus && "text-green-500"
                    } ${job?.jobStatus || "text-red-500"}`}
                  >
                    <span className="mr-2">
                      {job?.jobStatus ? "open" : "closed"}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <span
                      onClick={() => handleStatus(job)}
                      className="cursor-pointer"
                    >
                      {job?.jobStatus && (
                        <div className="flex items-center">
                          <p className="text-sm text-slate-400 mr-2">
                            click to close
                          </p>{" "}
                          <HiLockClosed fontSize={"24px"} />
                        </div>
                      )}
                      {job?.jobStatus || (
                        <div className="flex items-center">
                          <p className="text-sm text-slate-400 mr-2">
                            click to Open
                          </p>{" "}
                          <HiLockOpen fontSize={"24px"} />
                        </div>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPostedJobs;
