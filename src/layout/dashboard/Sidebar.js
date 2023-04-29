import React, { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const {
    user: { role },
  } = useSelector((state) => state.auth);
  const employerMenu = [
    { name: "Add Job", path: "add-job" },
    { name: "My Jobs", path: "my-posted-jobs" },
  ];
  const candidateMenu = [{ name: "Applied Job", path: "applied-job" }];

  const menu = (
    <>
      {role === "employer" &&
        employerMenu.map(({ name, path }, index) => (
          <li key={index}>
            <Link
              className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block p-2 lg:py-2 lg:px-3 rounded-full"
              to={path}
            >
              {name}
            </Link>
          </li>
        ))}
      {role === "candidate" &&
        candidateMenu.map(({ name, path }, index) => (
          <li key={index}>
            <Link
              className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block p-2 lg:py-2 lg:px-3 rounded-full"
              to={path}
            >
              {name}
            </Link>
          </li>
        ))}
    </>
  );
  return (
    <>
      <div className="bg-primary/10 col-span-3 lg:col-span-2 h-screen sticky top-0 hidden md:block">
        <ul className="flex flex-col gap-2 w-full h-full  p-3">
          <div className="block lg:flex justify-between items-center text-primary my-1">
            <Link to="/" className="flex items-center mb-3 lg:mb-0">
              <FaChevronLeft />
              <h1>Back</h1>
            </Link>
            <h1 className="lg:text-[18px]">Dashboard</h1>
          </div>
          {menu}
        </ul>
      </div>
      <div className="absolute right-2 top-5 md:hidden">
        {showMenu ? (
          <IoClose
            className="text-black h-7 w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        ) : (
          <HiMenuAlt1
            className="text-black h-7 w-7 cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
        )}
      </div>
      {showMenu && (
        <div className="md:hidden z-[999]">
          <ul className="w-[35vw] h-[100vh] bg-gray-900 text-white py-4">
            <Link to="/" className="flex items-center mb-3 lg:mb-0">
              <FaChevronLeft />
              <h1>Back</h1>
            </Link>
            {role === "employer" &&
              employerMenu.map(({ name, path }, index) => (
                <li key={index}>
                  <Link
                    className="bg-white text-black transition-all w-full block my-2 p-2 lg:py-2 lg:px-3 rounded-full"
                    to={path}
                    onClick={() => setShowMenu(false)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            {role === "candidate" &&
              candidateMenu.map(({ name, path }, index) => (
                <li key={index}>
                  <Link
                    className="bg-white text-black transition-all w-full block my-2 p-2 lg:py-2 lg:px-3 rounded-full"
                    to={path}
                    onClick={() => setShowMenu(false)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
