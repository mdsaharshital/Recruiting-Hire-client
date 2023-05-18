import React from "react";
import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo";
import ProfileSidebar from "./ProfileSidebar";
import Experiences from "./Experiences";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <ProfileSidebar user={user} />
        </div>
        <div className="md:col-span-2">
          <ProfileInfo user={user} />
          <Experiences />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
