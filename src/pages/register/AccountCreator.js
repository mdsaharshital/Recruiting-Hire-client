import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import candidate from "../../assets/candidate.svg";
import employer from "../../assets/employer.svg";
import CandidateRegistration from "./CandidateRegistration";
import EmployerRegistration from "./EmployerRegistration";

const AccountCreator = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  if (type === "candidate") {
    return <CandidateRegistration />;
  }

  if (type === "employer") {
    return <EmployerRegistration />;
  }

  return (
    <div className="h-screen pt-14">
      <h1 className="text-center my-10 text-2xl">Continue as ...</h1>
      <div className="flex flex-col md:flex-row justify-evenly items-center ">
        <div
          onClick={() => navigate("/register/candidate")}
          className="h-[30vh] md:h-full flex flex-col justify-between transition-all rounded-lg p-5 border border-white hover:border-primary hover:shadow-2xl hover:scale-105 group"
        >
          <img className="h-5/6" src={candidate} alt="" />
          <p className="text-center text-3xl">Candidate</p>
        </div>
        <h1 className="text-xl my-5 font-bold text-primary">Or</h1>
        <div
          onClick={() => navigate("/register/employer")}
          className="h-[30vh] md:h-full flex flex-col justify-between transition-all rounded-lg p-5 border border-white hover:border-primary hover:shadow-2xl hover:scale-105 group"
        >
          <img className="h-[77%]" src={employer} alt="" />
          <p className="text-center text-3xl">Employer</p>
        </div>
      </div>
    </div>
  );
};

export default AccountCreator;
