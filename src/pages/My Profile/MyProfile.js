import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo";
import ProfileSidebar from "./ProfileSidebar";
import Experiences from "./Experiences";
import ProfileEducation from "./ProfileEducation";
import ProfileEditModal from "./ProfileEditModal";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("u", user);
  const Updateduser = {
    ...user,
    aboutMe: `Frontend Developer`,
    contactInformation: {
      phoneNumber: "123456789",
      linkedInProfile: "https://www.linkedin.com/in/raihanjoy/",
      portfolioWebsite: "https://www.raihanjoy.com",
      github: "https://github.com/raihanjoy",
    },
    skills: ["react.js", "node.js", "mongodb", "node.js", "express.js"],
    experiences: [
      {
        companyName: "ABC Company",
        timeline: "Jan 2018 - Dec 2020",
        location: "New York, USA",
        position: "Software Engineer",
      },
      {
        companyName: "XYZ Corporation",
        timeline: "Apr 2015 - Present",
        location: "London, UK",
        position: "Senior Developer",
      },
    ],
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
    availability: "Full-time",
  };
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <ProfileSidebar
            openModal={openModal}
            isOpen={isOpen}
            closeModal={closeModal}
            user={Updateduser}
          />
        </div>
        <div className="md:col-span-2">
          <ProfileInfo user={Updateduser} />
          <Experiences user={Updateduser} />
          <ProfileEducation user={Updateduser} />
        </div>
      </div>
      {isOpen && (
        <ProfileEditModal
          candidate={Updateduser}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default MyProfile;
