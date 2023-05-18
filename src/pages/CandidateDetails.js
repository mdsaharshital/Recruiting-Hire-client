import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ApplicationDetails from "../components/ApplicationDetail";
import ChitChat from "../components/ChitChat";
import { useGetCandidateQuery } from "../features/message/messageApi";

const CandidateDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams();
  const { data, isLoading } = useGetCandidateQuery(id);
  if (isLoading) return <p></p>;
  const newData = data?.data;
  //console.log(newData);

  return (
    <div className="pt-14 px-6 ">
      <h1 className="">candidate details</h1>
      {/* grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 justify-items-stretch lg:px-[14vw]  mt-8 gap-4 */}
      <div className="">
        <ApplicationDetails
          data={newData}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
        {isVisible && (
          <ChitChat
            data={newData}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
        )}
      </div>
    </div>
  );
};

export default CandidateDetails;
