import React, { useState } from "react";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>

      {/* Menu Items */}
      <div
        className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
          Link 1
        </a>
        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
          Link 2
        </a>
        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
          Link 3
        </a>
      </div>
    </div>
  );
};

export default HamburgerMenu;
