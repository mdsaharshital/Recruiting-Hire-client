import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useRegisterUserMutation } from "../../features/auth/authApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const CandidateRegistration = () => {
  const [postUser] = useRegisterUserMutation();
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const [countries, setCountries] = useState([]);
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: {
      email,
    },
  });
  const term = useWatch({ control, name: "term" });
  //console.log(term);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const onSubmit = async (data) => {
    //console.log(data);
    const newData = { ...data, role: "candidate" };
    const result = await postUser(newData);
    if (result.data.acknowledged) {
      toast.success("Successfully registered as Candidate");
      reset();
      navigate("/");
    }
  };

  return (
    <div className="pt-14">
      <div
        onClick={() => navigate("/register")}
        className="cursor-pointer w-fit mt-5 flex items-center"
      >
        <FaChevronLeft />
        <p>back</p>
      </div>
      <div className="flex justify-center items-center overflow-auto p-0 md:p-10">
        <form
          className="bg-secondary/20 shadow-lg p-5 md:p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="w-full text-2xl text-primary mb-5">Candidate</h1>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              required
              {...register("firstName")}
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              required
              {...register("lastName")}
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="text-black bg-blue-200 cursor-not-allowed"
              disabled
              required
              {...register("email")}
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <h1 className="mb-3">Gender</h1>
            <div className="flex gap-3">
              <div>
                <input
                  type="radio"
                  id="male"
                  required
                  {...register("gender")}
                  value="male"
                />
                <label className="ml-2 text-lg" for="male">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  required
                  {...register("gender")}
                  value="female"
                />
                <label className="ml-2 text-lg" for="female">
                  Female
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  required
                  {...register("gender")}
                  value="other"
                />
                <label className="ml-2 text-lg" for="other">
                  Other
                </label>
              </div>
            </div>
          </div>
          <hr className="w-full mt-2 bg-black" />
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-3" for="country">
              Country
            </label>
            <select required {...register("country")} id="country">
              {countries
                .sort((a, b) => a?.name?.common?.localeCompare(b?.name?.common))
                .map(({ name }) => (
                  <option value={name.common}>{name.common}</option>
                ))}
            </select>
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="address">
              Street Address
            </label>
            <input type="text" required {...register("address")} id="address" />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="city">
              City
            </label>
            <input type="text" required {...register("city")} id="city" />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="postcode">
              Postal Code
            </label>
            <input
              type="text"
              required
              {...register("postcode")}
              id="postcode"
            />
          </div>

          <div className="flex justify-between items-center w-full mt-3">
            <div className="flex  w-full max-w-xs">
              <input
                className="mr-3"
                type="checkbox"
                required
                {...register("term")}
                id="terms"
              />
              <label for="terms" className="text-sm">
                I agree to terms and conditions
              </label>
            </div>
            <button disabled={!term} className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateRegistration;
