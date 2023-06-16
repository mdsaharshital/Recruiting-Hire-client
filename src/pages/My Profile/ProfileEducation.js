import React from "react";

const ProfileEducation = ({ user }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Education</h2>
      <ul>
        {user.education.map((edu, i) => (
          <li key={i}>
            {edu.degree} - {edu.university}, {edu.year}
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-bold mb-2">Achievements</h2>
      <ul>
        {user.achievements.map((achievement, i) => (
          <li key={i}>{achievement}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileEducation;
