import React from "react";
import { AiOutlineCloudDownload, AiOutlineMail } from "react-icons/ai";

const BasicInfo = ({ label, value }) => {
  return (
    <div className="flex flex-col">
      <p className="font-bold mb-1">{label}</p>
      <p>{value}</p>
    </div>
  );
};

const ProfileInfo = ({ user }) => {
  return (
    <div className="container mx-auto bg-primary/10 rounded-lg py-8 px-4">
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {user.role === "candidate" && (
          <>
            <BasicInfo label="First Name" value={user.firstName} />
            <BasicInfo label="Last Name" value={user.lastName} />
            <BasicInfo label="Email" value={user.email} />
            <BasicInfo label="Address" value={user.address} />
            <BasicInfo label="City" value={user.city} />
            <BasicInfo label="Country" value={user.country} />
            <BasicInfo label="Postcode" value={user.postcode} />
            <BasicInfo label="Gender" value={user.gender} />
            <BasicInfo label="Role" value={user.role} />
            <BasicInfo label="Term" value={user.term ? "True" : "False"} />
          </>
        )}
        {user.role === "employer" && (
          <>
            <BasicInfo label="First Name" value={user.firstName} />
            <BasicInfo label="Last Name" value={user.lastName} />
            <BasicInfo label="Email" value={user.email} />
            <BasicInfo label="Company Name" value={user.companyName} />
            <BasicInfo label="Role in Company" value={user.roleInCompany} />
            <BasicInfo label="Company Category" value={user.companyCategory} />
            <BasicInfo label="Employee Range" value={user.employeeRange} />
            <BasicInfo label="Gender" value={user.gender} />
            <BasicInfo label="Role" value={user.role} />
            <BasicInfo label="Term" value={user.term ? "True" : "False"} />
          </>
        )}
      </div>
      <div className="flex justify-evenly mt-2">
        <a
          href="https://drive.google.com/file/d/1TbL088tYuIH9TNbwU68foP3Oq9VikIhO/view?usp=share_link"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center btn-custom tracking-wide space-x-2"
        >
          <span>See Resume</span>
          <AiOutlineCloudDownload className="ml-1 text-xl" />
        </a>
        <a
          href={`mailto:${user.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center btn-custom tracking-wide space-x-2"
        >
          <span>Send Email</span>
          <AiOutlineMail className="ml-1 text-xl" />
        </a>
      </div>
    </div>
  );
};

export default ProfileInfo;
