import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

  const handleLogout = (): void => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
    <nav className="h-16 bg-[#1D4ED8] z-50 flex items-center sticky top-0">
      <div className="px-6 md:px-16 lg:px-24 w-full flex justify-between items-center">
        <Link to="/">
          <h1 className="font-bold text-3xl text-white italic">ShrinkSpree</h1>
        </Link>

        <div
          className={`
            flex gap-6 items-center text-white transition-all duration-200 
            sm:static absolute right-0 top-[64px]
            sm:flex-row flex-col px-4 
            ${navbarOpen ? "py-4" : "h-0 overflow-hidden"}
            sm:py-4 sm:h-auto sm:overflow-visible
          `}
        >
          {!token ? (
            <Link to="/register">
              <button className="bg-[#DC2626] text-white cursor-pointer w-24 text-center font-semibold py-2 rounded-md hover:bg-[#B91C1C] transition duration-150">
                Sign Up
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-[#DC2626] text-white cursor-pointer w-24 text-center font-semibold py-2 rounded-md hover:bg-[#B91C1C] transition duration-150"
            >
              Log Out
            </button>
          )}
        </div>

        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center mt-2"
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
