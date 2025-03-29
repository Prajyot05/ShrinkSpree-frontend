import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }: { message?: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-[#F8FAFC] p-6">
      <FaExclamationTriangle className="text-6xl text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-gray-900">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-700 mb-6 text-center">
        {message ? message : "An unexpected error has occurred"}
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-[#1D4ED8] text-white rounded hover:bg-[#1E40AF] transition"
      >
        Go back to home
      </button>
    </div>
  );
};

export default ErrorPage;
