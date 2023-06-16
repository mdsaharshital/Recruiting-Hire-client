import React from "react";
import { useForm } from "react-hook-form";

const ProfileEditModal = ({ closeModal, candidate }) => {
  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center bg-primary/60 z-[99999]">
        <div className="bg-white w-3/4 p-6 rounded-lg shadow-lg transform transition-all duration-300 animate-modalFadeIn modal-enter overflow-y-auto max-h-[80vh]">
          <CandidateForm candidate={candidate} />
          <div className="flex justify-end">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEditModal;

const CandidateForm = ({ candidate }) => {
  const { address, city, postcode } = candidate;
  console.log("candidate", candidate);
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: { address, city, postcode },
  });
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-secondary/20 shadow-lg p-5 md:p-10 rounded-2xl flex flex-wrap gap-3 max-w-full justify-between"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="phoneNumber" className="block mb-2 font-bold">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            {...register("phoneNumber")}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="linkedInProfile" className="block mb-2 font-bold">
            LinkedIn Profile
          </label>
          <input
            id="linkedInProfile"
            type="url"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            {...register("linkedInProfile")}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="portfolioWebsite" className="block mb-2 font-bold">
            Portfolio Website
          </label>
          <input
            id="portfolioWebsite"
            type="url"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            {...register("portfolioWebsite")}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="address" className="block mb-2 font-bold">
            Address
          </label>
          <input
            id="address"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            {...register("address")}
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="city" className="block mb-2 font-bold">
            City
          </label>
          <input
            id="city"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            {...register("city")}
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="postcode" className="block mb-2 font-bold">
            Postcode
          </label>
          <input
            id="postcode"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            {...register("postcode")}
          />
        </div>
      </div>
    </form>
  );
};

// export default CandidateForm;
