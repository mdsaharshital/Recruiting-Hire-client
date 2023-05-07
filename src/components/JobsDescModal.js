import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import ChitChat from "../components/ChitChat";
import {
  useAddQueryMutation,
  useAddReplyMutation,
  useApplyToJobMutation,
  useGetJobByIdQuery,
} from "../features/job/jobApi";
import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { useState } from "react";

export function JobsDescModal({ isOpen, closeModal }) {
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
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
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
    <>
      {/* <button onClick={openModal}>Open Modal</button> */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-y-auto shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              style={{ width: "100vw", maxHeight: "calc(100vh - 4rem)" }}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="pt-14 grid grid-cols-12 gap-5">
                  {isVisible && (
                    <ChitChat
                      data={newData}
                      isVisible={isVisible}
                      setIsVisible={setIsVisible}
                    />
                  )}
                  <div className="col-span-9 mb-10">
                    <div className="h-80 rounded-xl overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={meeting}
                        alt=""
                      />
                    </div>
                    <div className="space-y-5">
                      <div className="flex justify-between items-center mt-5">
                        <h1 className="text-xl font-semibold text-primary">
                          {position}{" "}
                          {jobPostedBy === user.email && (
                            <span className="rounded-full bg-slate-200 text-black cursor-pointer text-[10px] px-2 py-1 ml-2">
                              {applicants?.length} applicants
                            </span>
                          )}
                        </h1>
                        <div className="">
                          <button
                            className="btn mr-2"
                            disabled={!checkApply || !jobStatus}
                            onClick={() => setIsVisible(!isVisible)}
                          >
                            {checkApply
                              ? "Message Us"
                              : "Apply first to message"}
                          </button>
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
                              : `${checkApply ? "Applied" : "Apply"}`}
                          </button>
                        </div>
                      </div>
                      <div>
                        <h1 className="text-primary text-lg font-medium mb-3">
                          Overview
                        </h1>
                        <p>{overview}</p>
                      </div>
                      <div>
                        <h1 className="text-primary text-lg font-medium mb-3">
                          Skills
                        </h1>
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
                    <hr className="my-5" />
                    <div>
                      <div>
                        <h1 className="text-xl font-semibold text-primary mb-5">
                          General Q&A
                        </h1>
                        <div className="text-primary my-2">
                          {queries?.map(({ question, email, reply, id }) => (
                            <div>
                              <small>{email}</small>
                              <p className="text-lg font-medium">{question}</p>
                              {reply?.map((item) => (
                                <p className="flex items-center gap-2 relative">
                                  <BsArrowReturnRight /> {item}
                                </p>
                              ))}

                              {jobPostedBy === user.email && (
                                <div className="flex gap-3 my-5">
                                  <input
                                    placeholder="Reply"
                                    type="text"
                                    className="w-full"
                                    onBlur={(e) => setReply(e.target.value)}
                                  />
                                  <button
                                    className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                                    type="button"
                                    onClick={() => handleReply(id, question)}
                                  >
                                    <BsArrowRightShort size={30} />
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
                  <div className="col-span-3">
                    <div className="rounded-xl bg-primary/10 p-5 text-primary space-y-5">
                      <div>
                        <p>Experience</p>
                        <h1 className="font-semibold text-lg">{experience}</h1>
                      </div>
                      <div>
                        <p>Work Level</p>
                        <h1 className="font-semibold text-lg">{workLevel}</h1>
                      </div>
                      <div>
                        <p>Employment Type</p>
                        <h1 className="font-semibold text-lg">
                          {employmentType}
                        </h1>
                      </div>
                      <div>
                        <p>Salary Range</p>
                        <h1 className="font-semibold text-lg">{salaryRange}</h1>
                      </div>
                      <div>
                        <p>Location</p>
                        <h1 className="font-semibold text-lg">{location}</h1>
                      </div>
                    </div>
                    <div className="mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5">
                      <div>
                        <h1 className="font-semibold text-lg">{companyName}</h1>
                      </div>
                      <div>
                        <p>Company Size</p>
                        <h1 className="font-semibold text-lg">Above 100</h1>
                      </div>
                      <div>
                        <p>Founded</p>
                        <h1 className="font-semibold text-lg">2001</h1>
                      </div>
                      <div>
                        <p>Email</p>
                        <h1 className="font-semibold text-lg">
                          company.email@name.com
                        </h1>
                      </div>
                      <div>
                        <p>Company Location</p>
                        <h1 className="font-semibold text-lg">Los Angeles</h1>
                      </div>
                      <div>
                        <p>Website</p>
                        <Link className="font-semibold text-lg" to="/">
                          https://website.com
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => closeModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
