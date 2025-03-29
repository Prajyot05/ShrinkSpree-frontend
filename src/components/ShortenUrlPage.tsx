import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ShortenUrlPage = () => {
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      window.location.href = import.meta.env.VITE_BACKEND_URL + `/${url}`;
    }
  }, [url]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
      <p className="text-xl font-semibold text-gray-800 mb-4">Redirecting...</p>
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default ShortenUrlPage;
