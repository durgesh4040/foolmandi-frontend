import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Component/context/AuthContext"; // Correct the path if necessary
import CrossButton from "./CrossButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { getUser, userIsAuthenticated, userLogout } = useAuth(); // Use authentication context
  const sidebarRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    userLogout();
  };

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const enterMenuStyle = () => {
    return { display: "block" };
  };

  const logoutMenuStyle = () => {
    return { display: "block" };
  };

  const adminPageStyle = () => {
    return userIsAuthenticated ? { display: "block" } : { display: "none" };
  };

  const userPageStyle = () => {
    return { display: "block" };
  };

  const getUserName = () => {
    const user = getUser();
    return user ? user.data.name : "Guest";
  };

  return (
    <nav className="bg-green-700">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-white font-bold">
          <h1> PhoolMandi</h1>
        </Link>
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
                  ? "active border border-green-200"
                  : ""
              }`}
            >
              <Link to="/" className="text-white">
                Home
              </Link>
            </div>
            <div
              className={`px-3 py-2 rounded-md ${
                location.pathname === "/directBuy"
                  ? "active border border-green-200"
                  : ""
              }`}
            >
              <Link to="/directBuy" className="block text-white">
                DirectBuy
              </Link>
            </div>

            <div
              className={`px-3 py-2 rounded-md ${
                location.pathname === "/seller"
                  ? "active border border-green-200"
                  : ""
              }`}
              style={userPageStyle()} // Show for authenticated users only
            >
              <Link to="/becameseller" className="text-white">
                Become a Seller
              </Link>
            </div>
            <div
              className={`px-3 py-2 rounded-md ${
                location.pathname === "/adminpage"
                  ? "active border border-green-200"
                  : ""
              }`}
              style={adminPageStyle()}
            >
              <Link to="/adminpage" className="text-white">
                Feedback
              </Link>
            </div>
            <div
              className={`px-3 py-2 rounded-md ${
                location.pathname === "/login"
                  ? "active border border-green-200"
                  : ""
              }`}
              style={enterMenuStyle()}
            >
              <Link to="/login" className="text-white">
                Login
              </Link>
            </div>
            <div
              className={`px-3 py-2 rounded-md ${
                location.pathname === "/signup"
                  ? "active border border-green-200"
                  : ""
              }`}
              style={enterMenuStyle()}
            >
              <Link to="/signup" className="text-white">
                SignUp
              </Link>
            </div>
            <div
              className="px-3 py-2 rounded-md font-bold text-white"
              style={logoutMenuStyle()}
            >
              {` ${getUserName()}`}
            </div>
            <div className="px-3 py-2 rounded-md" style={logoutMenuStyle()}>
              <Link to="/" className="text-white" onClick={logout}>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          ref={sidebarRef}
          className="md:hidden fixed top-0 left-0 h-full w-1/2 bg-green-700 z-50 p-2"
        >
          <CrossButton onClick={toggleMenu} />
          <div
            className={`px-3 py-2 rounded-md ${
              location.pathname === "/" ? "active border border-green-200" : ""
            }`}
          >
            <Link to="/" className="block text-white">
              Home
            </Link>
          </div>
          <div
            className={`px-3 py-2 rounded-md ${
              location.pathname === "/directBuy"
                ? "active border border-green-200"
                : ""
            }`}
          >
            <Link to="/directBuy" className="block text-white">
              DirectBuy
            </Link>
          </div>
          <div
            className={`px-3 py-2 rounded-md ${
              location.pathname === "/seller"
                ? "active border border-green-200"
                : ""
            }`}
            style={userPageStyle()} // Show for authenticated users only
          >
            <Link to="/becameseller" className="block text-white">
              Become a Seller
            </Link>
          </div>
          <div
            className={`px-3 py-2 rounded-md ${
              location.pathname === "/adminpage"
                ? "active border border-green-200"
                : ""
            }`}
            style={adminPageStyle()} // Show for admin users only
          >
            <Link to="/adminpage" className="block text-white">
              Feedback
            </Link>
          </div>
          <div
            className={`px-3 py-2 rounded-md ${
              location.pathname === "/login"
                ? "active border border-green-200"
                : ""
            }`}
            style={enterMenuStyle()}
          >
            <Link to="/login" className="text-white">
              Login
            </Link>
          </div>
          <div
            className={`px-3 py-2 rounded-md ${
              location.pathname === "/signup"
                ? "active border border-green-200"
                : ""
            }`}
            style={enterMenuStyle()}
          >
            <Link to="/signup" className="text-white">
              SignUp
            </Link>
          </div>
          <div
            className="px-3 py-2 rounded-md text-white"
            style={logoutMenuStyle()}
          >
            {` ${getUserName()}`}
          </div>
          <div className="px-3 py-2 rounded-md" style={logoutMenuStyle()}>
            <Link to="/" className="block text-white" onClick={logout}>
              Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
