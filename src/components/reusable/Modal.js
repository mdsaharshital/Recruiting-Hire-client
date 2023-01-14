import React from "react";

const Modal = ({ jobData, setJobData }) => {
  const applicants = jobData?.applicants;
  console.log("modal", applicants);
  return (
    <div className="shadow-lg">
      {/* <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button> */}
      {jobData && (
        <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center">
          <div className="bg-primary/30 rounded-lg p-4 md:w-1/3">
            <h2 className="text-lg font-medium mb-4">
              Total applicants: {applicants?.length}
            </h2>
            <p className="text-gray-700 mb-4">Applicants email</p>
            <ol className="my-5">
              {applicants?.map((candidate, index) => (
                <li key={index}>
                  {index + 1}. {candidate.email}{" "}
                  <span className="underline cursor-pointer text-sm ml-3 hover:text-blue-500 transition-all">
                    details
                  </span>
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
