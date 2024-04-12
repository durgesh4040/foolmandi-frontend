import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
            <div className="hover:border hover:border-green-500 px-3 py-2 rounded-md">
              <Link to="/" className="text-white">
                Home
              </Link>
            </div>
            <div className="hover:border hover:border-green-500 px-3 py-2 rounded-md">
              <Link to="/login" className="text-white">
                Login
              </Link>
            </div>
            <div className="hover:border hover:border-green-500 px-3 py-2 rounded-md">
              <Link to="/signup" className="text-white">
                Registration
              </Link>
            </div>
            <div className="hover:border hover:border-green-500 px-3 py-2 rounded-md">
              <Link to="/" className="text-white">
                Became a Seller
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 py-1">
            <div className="hover:border hover:border-green-500 px-3 py-2 rounded-md">
              <Link to="/" className="block text-white">
                Home
              </Link>
            </div>
            <div className="hover:border hover:border-green-500 px-3 py-2 rounded-md">
              <a href="/login" className="block text-white">
                About
              </a>
            </div>
            <div className="hover:border hover:border-green-500 px-3 py-2 rounded-md">
              <Link to="/signup" className="block text-white">
                Registration
              </Link>
            </div>
            <div className="hover:border hover:border-green-500 px-3 py-2 rounded-md">
              <Link to="#" className="block text-white">
                Became a Seller
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
