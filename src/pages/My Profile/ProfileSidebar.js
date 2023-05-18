import React, { useState } from "react";
import ppf from "../../assets/dummyprofile.webp";
import { FiEdit } from "react-icons/fi";
// import { TbChecks } from "react-icons/tb";
const demoSkills = [
  "react.js",
  "node.js",
  "mongodb",
  "node.js",
  "express.js",
  "node.js",
];

const ProfileSidebar = ({ user }) => {
  const demoAboutme = `Full stack product designer with hands-on experience in solving problems for
  clients ranging from Real Estate, Hospitality, Rentals, On Demand
  Healthcare, IT Services & Social Network among others.`;

  const [isEdit, setIsEdit] = useState(false);
  const skills = user.skills || demoSkills;
  console.log("use", user);
  return (
    <div className="">
      <div className="flex flex-col items-center bg-primary/10 rounded-lg py-8 px-4 relative lg:h-screen">
        <span
          onClick={() => setIsEdit(!isEdit)}
          className="absolute top-4 left-4 cursor-pointer"
        >
          {/* <FiEdit fontSize={20} /> */}
          {!isEdit && <FiEdit fontSize={20} />}
        </span>
        <img src={ppf} alt="Profile" className="w-32 h-32 rounded-full my-4" />
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">
            {user?.firstName + " " + user?.lastName}
          </h2>
          {isEdit ? (
            <textarea name="about me" id="" cols="30" rows="10">
              {demoAboutme}
            </textarea>
          ) : (
            <p className="text-center mb-6">{demoAboutme}</p>
          )}
          <h2 className="text-lg font-bold mb-2">Skills</h2>
          <div className="flex flex-wrap justify-center">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-primary/80 text-white text-sm px-2 rounded-full mr-2 mb-2 uppercase"
              >
                {skill}
              </span>
            ))}
          </div>
          {isEdit && (
            <div>
              <SkillsDropdown />
            </div>
          )}
        </div>
        {isEdit && (
          <div className="flex items-center">
            <span
              className="btn cursor-pointer mt-4"
              onClick={() => setIsEdit(!isEdit)}
            >
              Submit
            </span>
            {/* <TbChecks fontSize={20} /> */}
          </div>
        )}
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
          className="border  border-primary rounded-r-lg  px-4 py-2"
          placeholder="Enter a skill"
          value={searchQuery}
          onChange={handleSearch}
        />
        <span className="border-none bg-primary text-white px-4 py-3 rounded-r-lg cursor-pointer">
          ADD
        </span>
      </div>
      {skills.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-md">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="py-2 px-4 cursor-pointer hover:bg-gray-100"
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
