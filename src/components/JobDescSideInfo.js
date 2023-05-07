import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const JobDescSideInfo = ({ jobData }) => {
  const { user } = useSelector((state) => state.auth);
  const {
    companyName,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
  } = jobData || {};
  return (
    <>
      <div className=" rounded-xl bg-primary/10 p-5 text-primary md:space-y-5">
        <div>
          <p className="text-[12px] md:text-[14px]">Experience</p>
          <h1 className="font-semibold text-[14px] lg:text-lg">{experience}</h1>
        </div>
        <div>
          <p className="text-[12px] md:text-[14px]">Work Level</p>
          <h1 className="font-semibold text-[14px] lg:text-lg">{workLevel}</h1>
        </div>
        <div>
          <p className="text-[12px] md:text-[14px]">Employment Type</p>
          <h1 className="font-semibold text-[14px] lg:text-lg">
            {employmentType}
          </h1>
        </div>
        <div>
          <p className="text-[12px] md:text-[14px]">Salary Range</p>
          <h1 className="font-semibold text-[14px] lg:text-lg">
            {salaryRange}
          </h1>
        </div>
        <div>
          <p className="text-[12px] md:text-[14px]">Location</p>
          <h1 className="font-semibold text-[14px] lg:text-lg">{location}</h1>
        </div>
      </div>
      <div className="mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5">
        <div>
          <h1 className="font-semibold text-[14px] lg:text-lg">
            {companyName}
          </h1>
        </div>
        <div>
          <p className="text-[12px] md:text-[14px]">Company Size</p>
          <h1 className="font-semibold text-[14px] lg:text-lg">
            {user.employeeRange}
          </h1>
        </div>
        <div>
          <p className="text-[12px] md:text-[14px]">Founded</p>
          <h1 className="font-semibold text-[14px] lg:text-lg">2001</h1>
        </div>
        <div>
          <p className="text-[12px] md:text-[14px]">Email</p>
          <h1 className="font-semibold text-[14px] lg:text-lg whitespace-wrap overflow-hidden truncate">
            <a href={`mailto:company.email@name.com`}>company.email@name.com</a>
          </h1>
        </div>
        <div>
          <p className="text-[12px] md:text-[14px]">Company Location</p>
          <h1 className="font-semibold text-[14px] lg:text-lg">Los Angeles</h1>
        </div>
        <div>
          <p className="text-[12px] md:text-[14px]">Website</p>
          <Link
            className="font-semibold text-[14px] lg:text-lg whitespace-wrap overflow-hidden truncate"
            to="/"
          >
            https://website.com
          </Link>
        </div>
      </div>
    </>
  );
};

export default JobDescSideInfo;
