import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import { signOutuser } from "../../features/auth/authSlice";
import auth from "../../firebase.init";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  console.log("", user);
  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${
        pathname === "/" ? null : "bg-white"
      }`}
    >
      <ul className="max-w-7xl mx-auto flex gap-3 h-full items-center">
        <li className="flex-auto font-semibold text-2xl">
          <Link to="/">Recruiting Hire</Link>
        </li>
        <li>
          <Link className="hover:text-primary" to="/jobs">
            Jobs
          </Link>
        </li>
        {user?.email && (
          <li>
            <Link
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {user?.email ? (
          <li
            onClick={() =>
              signOut(auth).finally(() => {
                dispatch(signOutuser());
              })
            }
          >
            <p className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all cursor-pointer">
              Sign out
            </p>
          </li>
        ) : (
          <li>
            <Link
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              to="/login"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
