import React, { useState } from "react";
import { parseJwt, handleLogError } from "../misc/Helpers";
import { liveflowerPrice } from "../misc/LiveFlowerPrice";
import { useAuth } from "../context/AuthContext";

const RegistrationForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();

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

    if (!(userName && password && name && email)) {
      setIsError(true);
      setErrorMessage("Please, inform all fields!");
      return;
    }
    const user = { userName, password, name, email };
    try {
      const response = await liveflowerPrice.signup(user);
      const { accessToken } = response.data;
      const data = parseJwt(accessToken);
      const authenticatedUser = { data, accessToken };

      Auth.userLogin(authenticatedUser);

      setUserName("");
      setPassword("");
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

  return (
    <div className="min-h-screen flex items-center  bg-green-50">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
          Registration Form
        </h2>

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
          value={userName}
          onChange={handleInputChange}
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
          placeholder="Username"
        />

        <label
          htmlFor="password"
          className="block text-green-700 text-sm font-bold mb-2"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
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
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-green-500 focus:border-green-500"
        />

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
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-green-500 focus:border-green-500"
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-green-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
