import React from "react";

const Badge = ({ children, className }) => {
  return (
    <div
      className={`cursor-pointer bg-primary/50 text-white md:bg-primary/10 md:text-primary font-light w-fit px-2 py-1 rounded-full  text-sm ${className}`}
    >
      <p>{children}</p>
    </div>
  );
};

export default Badge;
