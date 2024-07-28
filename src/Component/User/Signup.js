import React, { useState } from "react";
import { parseJwt, handleLogError } from "../misc/Helpers";
import { liveflowerPrice } from "../misc/LiveFlowerPrice";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";
import { NavLink } from "react-router-dom";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { Message } from "semantic-ui-react";
import { Icon } from "react-icons-kit";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!(username && password && name && email)) {
      setIsError(true);
      setErrorMessage("Please, fill all fields!");
      return;
    }
    const user = { username, password, name, email };
    try {
      const response = await liveflowerPrice.signup(user);
      const { accessToken } = response.data;
      const data = parseJwt(accessToken);
      const authenticatedUser = { data, accessToken };

      Auth.userLogin(authenticatedUser);

      setUserName("");
      setPassword("");
      setName("");
      setEmail("");
      setIsError(false);
      setErrorMessage("");
    } catch (error) {
      handleLogError(error);
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        let errorMessage = "Invalid fields";
        if (errorData.status === 409) {
          errorMessage = errorData.message;
        } else if (errorData.status === 400) {
          errorMessage = errorData.errors[0].defaultMessage;
        }
        setIsError(true);
        setErrorMessage(errorMessage);
      }
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white mt-8 p-6 space-y-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
            Registration Form
          </h2>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-green-700 text-sm font-bold mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              placeholder="Username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2  focus:ring-green-500 focus:border-green-500 focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-green-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <div className="relative">
              <input
                type={type}
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2  focus:ring-green-500 focus:border-green-500 focus:shadow-outline"
              />
              <span
                onClick={handleToggle}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                <Icon icon={icon} size={22} />
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-green-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder="Name"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2  focus:ring-green-500 focus:border-green-500 focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-green-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2  focus:ring-green-500 focus:border-green-500 focus:shadow-outline"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
          <Message className="text-center">
            {`Already have an account? `}
            <NavLink
              to="/login"
              className="text-green-700 hover:text-green-500"
            >
              Login
            </NavLink>
          </Message>
          {isError && <Message negative>{errorMessage}</Message>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
