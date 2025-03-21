import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const { pathname } = useLocation();
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

  const handleLogout = (): void => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
    <nav className="h-16 bg-custom-gradient z-50 flex items-center sticky top-0">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
        <Link to="/">
          <h1 className="font-bold text-3xl text-white italic sm:mt-0 mt-2">
            Linklytics
          </h1>
        </Link>
        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center sm:mt-1 sm:pt-0 pt-3 text-slate-800 sm:static absolute left-0 top-[62px] sm:shadow-none shadow-md transition-all duration-100 sm:h-fit sm:bg-none bg-custom-gradient sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0 ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          }`}
        >
          <li className="hover:text-btnColor font-medium transition-all duration-150">
            <Link
              className={
                pathname === "/" ? "text-white font-semibold" : "text-gray-200"
              }
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="hover:text-btnColor font-medium transition-all duration-150">
            <Link
              className={
                pathname === "/about"
                  ? "text-white font-semibold"
                  : "text-gray-200"
              }
              to="/about"
            >
              About
            </Link>
          </li>
          {token && (
            <li className="hover:text-btnColor font-medium transition-all duration-150">
              <Link
                className={
                  pathname === "/dashboard"
                    ? "text-white font-semibold"
                    : "text-gray-200"
                }
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}
          {!token ? (
            <Link to="/register">
              <li className="bg-rose-700 text-white cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md hover:text-slate-300 transition-all duration-150">
                Sign Up
              </li>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-rose-700 text-white cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md hover:text-slate-300 transition-all duration-150"
            >
              Log Out
            </button>
          )}
        </ul>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center sm:mt-0 mt-2"
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
