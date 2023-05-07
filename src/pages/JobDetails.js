import React, { useState } from "react";
import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { useParams } from "react-router-dom";
import {
  useAddQueryMutation,
  useAddReplyMutation,
  useApplyToJobMutation,
  useGetJobByIdQuery,
} from "../features/job/jobApi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import ChitChat from "../components/ChitChat";
import JobDescSideInfo from "../components/JobDescSideInfo";

const JobDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");
  const { id } = useParams();
  const [applyToJob] = useApplyToJobMutation();
  const [addQuery] = useAddQueryMutation();
  const [replyQue] = useAddReplyMutation();
  const { user } = useSelector((state) => state.auth);
  const { data } = useGetJobByIdQuery(id);
  const { jobDetails } = useSelector((state) => state.jobs);
  console.log("ee", data?.data);

  let jobData = jobDetails;
  if (Object.keys(jobDetails).length === 0) {
    jobData = data?.data;
  }

  const {
    // companyName,
    position,
    // location,
    // experience,
    // workLevel,
    // employmentType,
    // salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    queries,
    applicants,
    jobPostedBy,
    firstName,
    lastName,
    jobStatus,
    recuiterId,
  } = jobData || {};
  //
  const newData = { email: jobPostedBy, _id: recuiterId, firstName, lastName };
  //
  console.log("rec", recuiterId);
  const handleApplyJob = () => {
    const currentDate = new Date();
    const isoDate = currentDate.toISOString();
    const applyData = {
      userId: user._id,
      jobId: id,
      email: user.email,
      appliedTime: isoDate,
      approvalStatus: "pending",
    };
    if (user.email && user.role === "candidate") {
      applyToJob(applyData).finally(() => {
        return toast.success("Applied");
      });
    } else {
      return toast.error("Sorry, You have to register first to apply");
    }
    console.log(applyData);
  };
  const handleQuery = () => {
    const newData = {
      userId: user._id,
      email: user.email,
      question: query,
      jobId: id,
    };
    addQuery(newData);
  };
  const handleReply = (id, question) => {
    const newData = {
      userId: id,
      reply: reply,
      question: question,
    };
    replyQue(newData);
  };
  const checkApply =
    applicants?.filter((apps) => apps.email === user.email).length > 0;
  return (
    <div className="pt-14 grid grid-cols-12 gap-5">
      {isVisible && (
        <ChitChat
          data={newData}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}

      <div className="col-span-12 md:col-span-9 md:order-first mb-10">
        <div className="h-80 rounded-xl overflow-hidden">
          <img className="h-full w-full object-cover" src={meeting} alt="" />
        </div>
        <div className="space-y-5 p-2">
          <div className="block md:flex justify-between items-center mt-5">
            <h1 className="flex justify-between items-center text-xl font-semibold text-primary">
              <p>{position} </p>
              {jobPostedBy === user.email && (
                <p className="rounded-full bg-slate-200 text-black cursor-pointer text-[10px] px-3 ml-2">
                  {applicants?.length} applicants
                </p>
              )}
            </h1>
            <div className="flex justify-center items-center mt-5 md:mt-0">
              {checkApply && (
                <button
                  className="btn mr-2"
                  disabled={!checkApply || !jobStatus}
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {checkApply ? "Message Us" : "Apply first to message"}
                </button>
              )}
              <button
                className="btn"
                disabled={
                  !jobStatus ||
                  checkApply ||
                  user.role === "employer" ||
                  user.email === ""
                }
                onClick={handleApplyJob}
              >
                {!jobStatus
                  ? "Closed"
                  : `${
                      user.email === ""
                        ? "Login to Apply"
                        : user.role === "employer"
                        ? "Recuiter can't apply"
                        : `${checkApply ? "Applied" : "Apply"}`
                    }   `}
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Skills</h1>
            <ul>
              {skills?.map((skill) => (
                <li className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill) => (
                <li className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill) => (
                <li className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="block md:hidden my-5 p-2">
          <JobDescSideInfo jobData={jobData} />
        </div>
        <hr className="my-5" />
        <div className="p-2">
          <div>
            <h1 className="text-xl font-semibold text-primary mb-5">
              General Q&A
            </h1>
            <div className="text-primary my-2">
              {queries?.map(({ question, email, reply, id }) => (
                <div>
                  <small>{email}</small>
                  <p className="text-sm md:text-lg font-medium">{question}</p>
                  {reply?.map((item) => (
                    <p className="flex items-center gap-2 relative pl-5">
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  {jobPostedBy === user.email && (
                    <div className="flex gap-3  my-3 md:my-5">
                      <input
                        placeholder="Reply"
                        type="text"
                        className="w-full text-sm md:text-xl"
                        onBlur={(e) => setReply(e.target.value)}
                      />
                      <button
                        className="shrink-0 h-10 w-10 md:h-14 md:w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white text-[22px] md:text-[30px]"
                        type="button"
                        onClick={() => handleReply(id, question)}
                      >
                        <BsArrowRightShort />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {jobPostedBy !== user.email && (
              <div className="flex gap-3 my-5">
                <input
                  placeholder="Ask a question..."
                  type="text"
                  className="w-full"
                  onBlur={(e) => setQuery(e.target.value)}
                />
                <button
                  className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                  type="button"
                  onClick={handleQuery}
                >
                  <BsArrowRightShort size={30} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-3 md:order-last hidden md:block">
        <JobDescSideInfo jobData={jobData} />
      </div>
    </div>
  );
};

export default JobDetails;
