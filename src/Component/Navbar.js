import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <nav className="bg-green-700">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-white font-bold">Logo</div>
        <div className="md:hidden">
          <button
            type="button"
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex">
          <div className="flex space-x-4">
            <div
              className={`px-3 py-2 rounded-md ${
                location.pathname === "/"
                  ? " active border border-green-200"
                  : ""
              }`}
            >
              <Link to="/" className="text-white">
                Home
              </Link>
            </div>
            <div
              className={`px-3 py-2 rounded-md ${
                location.pathname === "/login"
                  ? " active border border-green-200"
                  : ""
              }`}
            >
              <Link to="/login" className="text-white">
                Login
              </Link>
            </div>
            <div
              className={`px-3 py-2 rounded-md ${
                location.pathname === "/signup"
                  ? " active border border-green-200"
                  : ""
              }`}
            >
              <Link to="/signup" className="text-white">
                Registration
              </Link>
            </div>
            <div
              className={`px-3 py-2 rounded-md ${
                location.pathname === "/seller"
                  ? " active border border-green-200"
                  : ""
              }`}
            >
              <Link to="/seller" className="text-white">
                Became a Seller
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 h-full w-1/2 bg-green-700 z-50 p-2">
          <div
            className={`px-3 py-2 rounded-md ${
              location.pathname === "/" ? " active border border-green-200" : ""
            }`}
          >
            <Link to="/" className="block text-white">
              Home
            </Link>
          </div>
          <div
            className={`px-3 py-2 rounded-md ${
              location.pathname === "/login"
                ? " active border border-green-200"
                : ""
            }`}
          >
            <Link to="/login" className="block text-white">
              Login
            </Link>
          </div>
          <div
            className={`px-3 py-2 rounded-md ${
              location.pathname === "/signup"
                ? " active border border-green-200"
                : ""
            }`}
          >
            <Link to="/signup" className="block text-white">
              Registration
            </Link>
          </div>
          <div
            className={`px-3 py-2 rounded-md ${
              location.pathname === "/seller"
                ? " active border border-green-200"
                : ""
            }`}
          >
            <Link to="/seller" className="block text-white">
              Became a Seller
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
