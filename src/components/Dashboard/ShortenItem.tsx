import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { MdAnalytics, MdOutlineAdsClick } from "react-icons/md";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi";
import { Hourglass } from "react-loader-spinner";
import Graph from "./Graph";

interface ShortenItemProps {
  originalUrl: string;
  shortUrl: string;
  clickCount: number;
  createdDate: string;
}

const ShortenItem: React.FC<ShortenItemProps> = ({
  originalUrl,
  shortUrl,
  clickCount,
  createdDate,
}) => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<
    { clickDate: string; count: number }[]
  >([]);

  const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
    /^https?:\/\//,
    ""
  );

  const analyticsHandler = (shortUrl: string) => {
    setSelectedUrl(shortUrl);
    setAnalyticToggle(!analyticToggle);
  };

  const fetchMyShortUrl = async () => {
    if (!selectedUrl) return;
    setLoader(true);
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${selectedUrl}?startDate=2024-12-01T00:00:00&endDate=2025-12-31T23:59:59`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnalyticsData(data);
    } catch (error) {
      navigate("/error");
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedUrl) {
      fetchMyShortUrl();
    }
  }, [selectedUrl]);

  return (
    <div className="bg-[#F1F5F9] shadow-lg border border-gray-300 px-6 py-3 rounded-md transition-all duration-150">
      <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-5 py-5">
        {/* URL and Details */}
        <div className="flex-1 space-y-2 overflow-x-auto">
          <div className="flex items-center gap-2 pb-1">
            <Link
              target="_blank"
              className="text-[17px] font-semibold text-[#1D4ED8] whitespace-nowrap"
              to={`/s/${shortUrl}`}
            >
              {subDomain}/s/{shortUrl}
            </Link>
            <FaExternalLinkAlt className="text-[#1D4ED8]" />
          </div>

          <div className="flex items-center">
            <h3 className="text-gray-800 text-[17px] break-all">
              {originalUrl}
            </h3>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex items-center gap-1 font-semibold text-[#1D4ED8]">
              <MdOutlineAdsClick className="text-[22px]" />
              <span className="text-[16px]">{clickCount}</span>
              <span className="text-[15px]">
                {clickCount === 1 ? "Click" : "Clicks"}
              </span>
            </div>

            <div className="flex items-center gap-2 font-semibold text-lg text-gray-800">
              <FaRegCalendarAlt />
              <span className="text-[17px]">
                {dayjs(createdDate).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
          <CopyToClipboard
            text={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`}
            onCopy={() => setIsCopied(true)}
          >
            <div className="flex cursor-pointer gap-1 items-center bg-[#1D4ED8] py-2 font-semibold shadow-md px-6 rounded-md text-white transition hover:bg-[#1E40AF]">
              <button>{isCopied ? "Copied" : "Copy"}</button>
              {isCopied ? (
                <LiaCheckSolid className="text-md" />
              ) : (
                <IoCopy className="text-md" />
              )}
            </div>
          </CopyToClipboard>

          <div
            onClick={() => analyticsHandler(shortUrl)}
            className="flex cursor-pointer gap-1 items-center bg-[#DC2626] py-2 font-semibold shadow-md px-6 rounded-md text-white transition hover:bg-[#B91C1C]"
          >
            <button>Analytics</button>
            <MdAnalytics className="text-md" />
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      {analyticToggle && (
        <div className="mt-5 border-t-2 pt-4 w-full relative rounded-md overflow-hidden">
          {loader ? (
            <div className="h-[350px] flex justify-center items-center w-full">
              <div className="flex flex-col items-center gap-1">
                <Hourglass
                  visible={true}
                  height="50"
                  width="50"
                  ariaLabel="hourglass-loading"
                  colors={["#306cce", "#72a1ed"]}
                />
                <p className="text-gray-700">Please Wait...</p>
              </div>
            </div>
          ) : (
            <>
              {analyticsData.length === 0 ? (
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-80">
                  <h1 className="text-gray-800 font-serif text-xl font-bold mb-1">
                    No Data For This Time Period
                  </h1>
                  <h3 className="w-11/12 max-w-md text-center text-lg text-gray-600 px-4">
                    Share your short link to view where your engagements are
                    coming from.
                  </h3>
                </div>
              ) : (
                <Graph graphData={analyticsData} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ShortenItem;
