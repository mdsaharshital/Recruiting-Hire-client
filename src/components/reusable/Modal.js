import React from "react";
import { Link } from "react-router-dom";

const Modal = ({ jobData, setJobData }) => {
  const applicants = jobData?.applicants;
  //console.log("modal", applicants);
  return (
    <div className="shadow-lg">
      {jobData && (
        <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center ">
          <div className="bg-primary/30 rounded-lg p-4 md:w-1/3">
            <h2 className="text-lg font-medium mb-4">
              Total applicants: {applicants?.length}
            </h2>
            <p className="text-gray-700 mb-4">Applicants email</p>
            <ol className="my-5">
              {applicants?.map((candidate, index) => (
                <li key={index}>
                  {index + 1}. {candidate.email}{" "}
                  <Link
                    to={`/candidate-details/${candidate.userId}`}
                    className="underline cursor-pointer text-sm ml-3 hover:text-blue-500 transition-all"
                  >
                    details
                  </Link>
                </li>
              ))}
            </ol>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg"
              onClick={() => setJobData(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
