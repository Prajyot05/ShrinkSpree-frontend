import React, { useState } from "react";
import Graph from "./Graph";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useFetchMyShortUrls, useFetchTotalClicks } from "../../hooks/useQuery";
import ShortenPopUp from "./ShortenPopUp";
import { FaLink } from "react-icons/fa";
import ShortenUrlList from "./ShortenUrlList";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const DashboardLayout: React.FC = () => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [shortenPopUp, setShortenPopUp] = useState<boolean>(false);

  function onError() {
    navigate("/error");
  }

  const {
    isLoading,
    data: myShortenUrls = [],
    refetch,
  } = useFetchMyShortUrls(token as string, onError);

  const { isLoading: loader, data: totalClicks = [] } = useFetchTotalClicks(
    token as string,
    onError
  );

  return (
    <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)] bg-[#F8FAFC]">
      {loader ? (
        <Loader />
      ) : (
        <div className="lg:w-[90%] w-full mx-auto py-16">
          {/* Graph Container */}
          <div className="relative h-96 bg-white rounded-lg shadow-md p-4">
            {totalClicks.length === 0 && (
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-white bg-opacity-80 rounded-lg">
                <h1 className="text-gray-800 font-serif text-2xl font-bold mb-2">
                  No Data For This Time Period
                </h1>
                <p className="max-w-md text-gray-600 text-lg px-4">
                  Share your short link to view where your engagements are
                  coming from.
                </p>
              </div>
            )}
            <Graph graphData={totalClicks} />
          </div>

          {/* Button to Create New Short URL */}
          <div className="py-5 text-center sm:text-right">
            <button
              className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-medium py-3 px-6 rounded-full shadow-lg transition duration-300"
              onClick={() => setShortenPopUp(true)}
            >
              Create a New Short URL
            </button>
          </div>

          {/* Short URL List or Empty State */}
          <div>
            {!isLoading && myShortenUrls.length === 0 ? (
              <div className="flex justify-center pt-16">
                <div className="flex flex-col items-center gap-2 py-8 px-6 rounded-lg shadow-lg bg-white">
                  <FaLink className="text-blue-500 text-3xl" />
                  <h1 className="text-gray-800 font-semibold text-lg">
                    You haven't created any short link yet
                  </h1>
                </div>
              </div>
            ) : (
              <ShortenUrlList data={myShortenUrls} />
            )}
          </div>
        </div>
      )}

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </div>
  );
};

export default DashboardLayout;
