import React, { useState } from "react";
import {
  useGetJobsQuery,
  useUpdateJobMutation,
} from "../../features/job/jobApi";
import { useSelector } from "react-redux";
import { HiLockClosed, HiLockOpen } from "react-icons/hi";
import { toast } from "react-hot-toast";
import Modal from "../../components/reusable/Modal";
import Loading from "../../components/reusable/Loading";

const MyPostedJobs = () => {
  const [jobData, setJobData] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetJobsQuery();
  const [updateJob] = useUpdateJobMutation();
  const jobInfo = data?.data || [];
  console.log(jobInfo);
  //
  const handleStatus = (job) => {
    const newData = { ...job, jobStatus: !job.jobStatus };
    //console.log("", newData);
    toast.dismiss();
    toast.loading("Loading...");
    updateJob(newData).finally(() => {
      toast.dismiss();
      return toast.success("Job status changed");
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={`md:mx-8 my-8 overflow-hidden `}>
      <div className={`${jobData && "blur-sm"}`}>
        <p className="my-3">My posted jobs</p>
        <div className="flex flex-col justify-center items-start gap-8 my-6">
          {jobInfo
            .filter((job) => job?.jobPostedBy === user?.email)
            .map((job, i) => (
              <div className="sm:flex justify-evenly w-full shadow-primary/10 shadow-md rounded-md px-4 py-3 sm:py-6 mx-2">
                <div className="flex-1 mb-3 flex flex-col justify-between">
                  <p>
                    {i + 1}. Position: {job.position}
                  </p>
                  <p
                    onClick={() => setJobData(job)}
                    className="ml-3 underline text-primary cursor-pointer"
                  >
                    Applicants: {job.applicants.length}
                  </p>
                </div>
                <div className=" flex-1 md:flex flex-col justify-center w-full gap-4">
                  <p
                    className={` ${job?.jobStatus && "text-green-500"} ${
                      job?.jobStatus || "text-red-500"
                    }`}
                  >
                    Job status: {job?.jobStatus ? "open" : "closed"}
                  </p>
                  <span
                    onClick={() => handleStatus(job)}
                    className="cursor-pointer"
                  >
                    {job?.jobStatus ? (
                      <div className="flex items-center">
                        <p className="text-sm text-slate-400 mr-2">
                          click to close
                        </p>
                        <HiLockClosed fontSize={"24px"} />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p className="text-sm text-slate-400 mr-2">
                          click to open
                        </p>
                        <HiLockOpen fontSize={"24px"} />
                      </div>
                    )}
                  </span>
                </div>
              </div>
            ))}
        </div>
        {/* <div className={`overflow-x-auto `}>
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
              {jobInfo
                .filter((job) => job?.jobPostedBy === user?.email)
                .map((job) => (
                  <tr key={job._id} className="text-left">
                    <td className="border px-4 py-2">{job?.position}</td>
                    <td className="border px-4 py-2 ">
                      <div className="flex justify-between">
                        <p> {job?.applicants.length} candidate</p>
                        <span
                          onClick={() => setJobData(job)}
                          className="rounded-full bg-slate-200 text-black cursor-pointer
                       text-[14px] px-2 ml-2 underline"
                        >
                          See list
                        </span>
                      </div>
                    </td>
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
        </div> */}
      </div>
      <Modal jobData={jobData} setJobData={setJobData} />
    </div>
  );
};

export default MyPostedJobs;
