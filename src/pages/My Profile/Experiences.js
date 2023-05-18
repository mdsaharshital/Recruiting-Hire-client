import React from "react";
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const demoExperiences = [
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
  {
    companyName: "PQR Agency",
    timeline: "Mar 2012 - Jan 2015",
    location: "San Francisco, USA",
    position: "Web Designer",
  },
];

const Experiences = () => {
  return (
    <div>
      <hr className="my-4" />
      <h1 className="text-xl text-primary font-bold ">Experiences</h1>
      <div className="grid gap-4 grid-cols-1">
        {demoExperiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}
      </div>
    </div>
  );
};

export default Experiences;

const ExperienceCard = ({ experience }) => {
  const { companyName, timeline, location, position } = experience;

  return (
    <div className="bg-white rounded-lg p-6 mb-2">
      <div className="md:flex justify-between md:w-2/3">
        <div className="flex items-center mb-4">
          <FaBriefcase className="text-primary mr-2" size={20} />
          <h3 className="text-lg font-bold">{companyName}</h3>
        </div>
        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="text-primary mr-2" size={18} />
          <p>{location}</p>
        </div>
      </div>
      <p className="my-4">{position}</p>
      <div className="flex items-center">
        <FaCalendarAlt className="text-primary mr-2" size={18} />
        <p>{timeline}</p>
      </div>
      <hr className="my-4" />
    </div>
  );
};
