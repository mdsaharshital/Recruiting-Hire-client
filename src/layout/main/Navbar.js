import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import { signOutuser } from "../../features/auth/authSlice";
import auth from "../../firebase.init";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const {
    user: { email, role },
  } = useSelector((state) => state.auth);
  //console.log("", user);
  return (
    <nav
      className={`h-14 px-2 fixed w-full z-[999] ${
        pathname === "/" ? null : "bg-white"
      }`}
    >
      <ul className="max-w-7xl mx-auto flex gap-3 h-full items-center">
        <li className="flex-auto font-semibold text-[22px] md:text-2xl">
          <Link to="/">Recruiting Hire</Link>
        </li>
        <li>
          <Link
            className="hover:text-primary text-[12px] md:text-[16px]"
            to="/jobs"
          >
            Jobs
          </Link>
        </li>
        {email && role && (
          <li>
            <Link
              className="border border-black text-[12px] md:text-[16px] px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              to={"/dashboard/my-profile"}
            >
              Dashboard
            </Link>
          </li>
        )}
        {email && !role && (
          <li>
            <Link
              className="border border-black text-[12px] md:text-[16px] px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              to="/register"
            >
              Register
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
            <p className="border border-black text-[16px] md:text-[16px] px-2 py-[5px] md:px-3 md:py-2 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all cursor-pointer">
              <FiLogOut />
            </p>
          </li>
        ) : (
          <li>
            <Link
              className="border border-black text-[12px] md:text-[16px] px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
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
