import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";

const description =
  "ShrinkSpree makes link sharing effortless. Shorten URLs quickly, track engagement, and enhance your online presence with our powerful tools.";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToDashboard = (): void => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center"
      >
        <h1 className="font-bold text-gray-900 text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
          ShrinkSpree - The Smart Way to Share Links
        </h1>
        <p className="text-gray-700 text-lg mb-10">{description}</p>
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onClick={handleNavigateToDashboard}
          className="cursor-pointer bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
        >
          Go to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
