import React from "react";
import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo";
import ProfileSidebar from "./ProfileSidebar";
import Experiences from "./Experiences";
import ProfileEducation from "./ProfileEducation";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const Updateduser = {
    ...user,
    contactInformation: {
      phoneNumber: "123456789",
      linkedInProfile: "https://www.linkedin.com/in/raihanjoy/",
      portfolioWebsite: "https://www.raihanjoy.com",
    },
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        university: "ABC University",
        year: "2016",
      },
      {
        degree: "Diploma in Web Development",
        university: "XYZ Institute",
        year: "2014",
      },
    ],
    achievements: [
      "Outstanding Performance Award - ABC Company",
      "Best Design Project - XYZ Corporation",
    ],
    languages: ["English", "Bengali", "Spanish"],
    interests: ["Traveling", "Photography", "Reading"],
    socialMediaLinks: {
      github: "https://github.com/raihanjoy",
      behance: "https://www.behance.net/raihanjoy",
      dribbble: "https://dribbble.com/raihanjoy",
    },
    availability: "Full-time",
  };
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <ProfileSidebar user={Updateduser} />
        </div>
        <div className="md:col-span-2">
          <ProfileInfo user={Updateduser} />
          <Experiences user={Updateduser} />
          <ProfileEducation user={Updateduser} />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
