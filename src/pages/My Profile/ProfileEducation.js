import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { HiBookOpen } from "react-icons/hi";

const ProfileEducation = ({ user }) => {
  return (
    <div>
      <h1 className="text-xl text-primary font-bold ">Education</h1>
      {/* <!-- component --> */}
      <div className="px-6">
        <div className="mb-8">
          <ul className="space-y-4">
            {user.education.map((edu, index) => (
              <li key={index}>
                <div className="py-4 bg-white shadow-sm rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <HiBookOpen fontSize={26} className="text-primary" />{" "}
                    <h2 className="text-lg font-bolds">{edu.degree}</h2>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">{edu.university}</p>
                    <p className="text-gray-600">{edu.year}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="flex justify-end mt-4">
          <button className="btn flex items-center gap-2">
            <span> Add Education</span>
            <FiPlusCircle fontSize={20} />
          </button>
        </div> */}
      </div>
      {/* achivements */}
      <h2 className="text-xl text-primary font-bold">Achievements</h2>
      <ul>
        {user.achievements.map((achievement, i) => (
          <li className="ml-4" key={i}>
            - {achievement}
          </li>
        ))}
      </ul>
      {/* <div className="flex justify-end mt-4">
        <button className="btn flex items-center gap-2">
          <span> Add Achivements</span>
          <FiPlusCircle fontSize={20} />
        </button>
      </div> */}
    </div>
  );
};

export default ProfileEducation;
