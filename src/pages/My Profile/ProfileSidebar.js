import React from "react";
import ppf from "../../assets/dummyprofile.webp";

const ProfileSidebar = ({ user }) => {
  console.log("use", user);
  return (
    <div className="flex flex-col items-center bg-primary/10 rounded-lg py-8 px-4">
      <img src={ppf} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold mb-2">
          {user?.firstName + " " + user?.lastName}
        </h2>
        <p className="text-centers mb-6">
          Full stack product designer with hands-on experience in solving
          problems for clients ranging from Real Estate, Hospitality, Rentals,
          On Demand Healthcare, IT Services & Social Network among others.
        </p>
        <h2 className="text-lg font-bold mb-2">Skills</h2>
        <div className="flex flex-wrap justify-center">
          <span className="bg-primary/80 text-white px-2 rounded-full mr-2 mb-2">
            React
          </span>
          <span className="bg-primary/80 text-white px-2 rounded-full mr-2 mb-2">
            Node.js
          </span>
          <span className="bg-primary/80 text-white px-2 rounded-full mr-2 mb-2">
            Node.js
          </span>
          <span className="bg-primary/80 text-white px-2 rounded-full mr-2 mb-2">
            Node.js
          </span>
          <span className="bg-primary/80 text-white px-2 rounded-full mr-2 mb-2">
            Node.js
          </span>
          {/* Add more skill pills as needed */}
        </div>
      </div>
    </div>
  );
};
export default ProfileSidebar;
