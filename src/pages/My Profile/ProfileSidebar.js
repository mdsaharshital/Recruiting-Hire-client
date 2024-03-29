import React, { useState } from "react";
import ppf from "../../assets/dummyprofile.webp";
import { FiEdit, FiPlusCircle } from "react-icons/fi";
import { BsLinkedin, BsTelephoneFill, BsGithub } from "react-icons/bs";
import { TfiWorld } from "react-icons/tfi";
import ProfileEditModal from "./ProfileEditModal";

// const demoSkills = [
//   "react.js",
//   "node.js",
//   "mongodb",
//   "node.js",
//   "express.js",
//   "node.js",
// ];

const ProfileSidebar = ({ user, openModal, isOpen, closeModal }) => {
  // const demoAboutMe = `Frontend Developer`;

  const [isEdit, setIsEdit] = useState(false);
  const skills = user.skills;
  return (
    <div>
      <div className="flex flex-col items-center bg-primary/10 rounded-lg py-8 px-4 relative lg:min-h-screen">
        {/* Modal Trigger Button */}
        <span
          // onClick={openModal}
          onClick={() => setIsEdit(!isEdit)}
          className="absolute top-4 left-4 cursor-pointer"
        >
          {!isEdit && <FiEdit fontSize={20} />}
          {/* <FiEdit fontSize={20} /> */}
        </span>

        {user.profileImage ? (
          <img
            src={user?.profileImage}
            alt="User Profile"
            className="w-32 h-32 rounded-full my-4"
          />
        ) : (
          <img
            src={ppf}
            alt="User Profile"
            className="w-32 h-32 rounded-full my-4"
          />
        )}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">
            {user?.firstName + " " + user?.lastName}
          </h2>
          {isEdit ? (
            <textarea name="about me" id="" cols="20" rows="1">
              {user?.aboutMe}
            </textarea>
          ) : (
            <p className="text-center mb-6">{user?.aboutMe}</p>
          )}

          <h2 className="text-lg font-bold mb-2">Skills</h2>
          <div className="flex flex-wrap justify-center mb-4">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-primary/80 text-white text-sm px-2 rounded-full mr-2 mb-2 uppercase"
              >
                {skill}
              </span>
            ))}
          </div>
          <div>
            {isEdit && (
              <div className="w-full">
                <SkillsDropdown />
              </div>
            )}
          </div>

          {/*  */}
          <div className="w-full flex flex-col gap-2 items-center lg:items-start justify-center mt-8">
            <h2 className="text-lg font-bold mb-2">Contact & Socials</h2>
            <ul className="flex flex-wrap items-center justify-between w-full gap-4 mb-6">
              <li className="hover:text-primary flex items-center gap-2 cursor-pointer">
                <span onClick={() => setIsEdit(!isEdit)}>
                  <FiPlusCircle fontSize={18} />
                </span>
                {/* <a href={`tel:${user.contactInformation.phoneNumber}`}>
                  <BsTelephoneFill fontSize={22} />
                </a> */}
                <BsTelephoneFill fontSize={22} />
                {/* {user.contactInformation.phoneNumber} */}
              </li>
              <li className="hover:text-primary flex items-center gap-2 cursor-pointer">
                <span onClick={() => setIsEdit(!isEdit)}>
                  <FiPlusCircle fontSize={18} />
                </span>
                {/* <a
                  href={user?.contactInformation?.linkedInProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsLinkedin fontSize={22} />
                </a> */}
                <BsLinkedin fontSize={22} />
              </li>
              <li className="hover:text-primary flex items-center gap-2 cursor-pointer">
                <span onClick={() => setIsEdit(!isEdit)}>
                  <FiPlusCircle fontSize={18} />
                </span>
                {/* <a
                  href={user?.contactInformation?.portfolioWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TfiWorld fontSize={22} />
                </a> */}
                <TfiWorld fontSize={22} />
              </li>
              <li className="hover:text-primary flex items-center gap-2 cursor-pointer">
                <span onClick={() => setIsEdit(!isEdit)}>
                  <FiPlusCircle fontSize={18} />
                </span>
                {/* <a
                  href={user?.contactInformation?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsGithub fontSize={22} />
                </a> */}
                <BsGithub fontSize={22} />
              </li>
            </ul>
            <h2 className="text-lg font-bold mb-2 ">Languages</h2>
            <ul className="mb-6 flex flex-wrap items-center gap-3">
              {user.languages.map((language, i) => (
                <li key={i}>{language}</li>
              ))}
              <span onClick={() => setIsEdit(!isEdit)}>
                <FiPlusCircle
                  fontSize={18}
                  className="text-primary cursor-pointer"
                />
              </span>
            </ul>
            <h2 className="text-lg font-bold mb-2 ">Interests</h2>
            <ul className="mb-6 flex flex-wrap items-center gap-3">
              {user.interests.map((interest, i) => (
                <li key={i}>{interest}</li>
              ))}
              <span onClick={() => setIsEdit(!isEdit)}>
                <FiPlusCircle
                  fontSize={18}
                  className="text-primary cursor-pointer"
                />
              </span>
            </ul>

            <h2 className="text-lg font-bold mb-2">Availability</h2>
            <p>{user.availability}</p>
          </div>
          {isEdit && (
            <div className="flex items-center">
              <span
                className="btn cursor-pointer mt-4"
                onClick={() => setIsEdit(!isEdit)}
              >
                Submit
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;

const SkillsDropdown = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [skills, setSkills] = useState([]);

  console.log("sk", searchQuery);
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchQuery(searchValue);
    // Make API request to fetch skills based on search query
    if (searchValue) {
      const myHeaders = new Headers();
      myHeaders.append("apikey", "WEyXx7VCXR6z0pZLYIUTfVkEbArmfQKR");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch(`https://api.apilayer.com/skills?q=${searchValue}`, requestOptions)
        .then((response) => response.json())
        .then((data) => setSkills(data))
        .catch((error) => console.log("Error:", error));
    } else {
      setSkills([]); // Clear the skills list when search query is empty
    }
  };

  return (
    <div className="relative my-2">
      <div className="flex justify-center items-center">
        <input
          id="skillInput"
          type="text"
          className="border-2 w-full border-primary rounded-r-lg  px-4 py-2"
          placeholder="Enter a skill"
          value={searchQuery}
          onChange={handleSearch}
        />
        <span className="border-none bg-primary text-white px-4 py-3 rounded-r-full cursor-pointer">
          ADD
        </span>
      </div>
      {skills.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-md">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="py-2 px-4 cursor-pointer hover:bg-gray-100 even:bg-primary/10"
              onClick={() => setSearchQuery(skill)}
            >
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// export SkillsDropdown;
