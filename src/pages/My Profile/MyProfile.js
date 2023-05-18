import React from "react";
import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo";
import ProfileSidebar from "./ProfileSidebar";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <ProfileSidebar user={user} />
        </div>
        <div className="md:col-span-2">
          <ProfileInfo user={user} />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
