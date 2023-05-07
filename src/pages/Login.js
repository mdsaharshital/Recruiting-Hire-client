import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import { loginUser } from "../features/auth/authSlice";
import auth from "../firebase.init";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [user] = useAuthState(auth);
  const onSubmit = ({ email, password }) => {
    console.log({ email, password });
    dispatch(loginUser({ email, password }));
    reset();
  };
  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user?.email, navigate]);
  return (
    <div className="md:flex h-screen items-center pt-24">
      <div className="md:w-1/2 grid place-items-center order-first md:order-last">
        <div className="bg-[#FFFAF4] rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="ml-5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  {...register("email")}
                  id="email"
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="password" className="ml-5">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  {...register("password")}
                />
              </div>
              <div className="relative !mt-8">
                <button
                  type="submit"
                  className="font-bold text-white py-3 rounded-full bg-primary w-full"
                >
                  Login
                </button>
              </div>
              <div>
                <p>
                  Don't have an account?{" "}
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center order-last md:order-first">
        <img src={loginImage} className="h-full w-full mx-auto" alt="" />
      </div>
    </div>
  );
};

export default Login;
