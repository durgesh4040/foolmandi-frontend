import React, { useState } from "react";
import { liveflowerPrice } from "../misc/LiveFlowerPrice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { parseJwt } from "../misc/Helpers";
import PasswordToggle from "../PasswordToggle";
const SellerForm = ({ verifiedEmail }) => {
  const Auth = useAuth();
  // const isLoggedIn = Auth.userIsAuthenticated();
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const trimedValue = value.trim();
    switch (name) {
      case "username":
        setUserName(trimedValue);
        break;
      case "name":
        setName(value);
        break;
      case "password":
        setPassword(trimedValue);
        break;
      case "companyName":
        setCompanyName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !(
        password &&
        verifiedEmail &&
        companyName &&
        address &&
        phoneNumber &&
        name
      )
    ) {
      setIsError(true);
      setErrorMessage("Please, fill in all fields!");
      return;
    }

    setIsLoading(true);

    const seller = {
      username,
      password,
      email: verifiedEmail,
      companyName,
      address,
      phoneNumber,
      name,
    };

    try {
      const response = await liveflowerPrice.saveSeller(seller);

      // Auth.userLogin(authenticatedUser);
      if (response.status === 201) {
        const { accessToken } = response.data;
        const data = parseJwt(accessToken);
        const authenticatedUser = { data, accessToken };
        Auth.userLogin(authenticatedUser);
        setUserName("");
        setPassword("");
        setCompanyName("");
        setAddress("");
        setPhoneNumber("");
        setName("");
        setIsError(false);
        setErrorMessage("");

        console.log("Seller saved successfully:", response.data);

        navigate("/seller-dashboard", { state: { username: username } });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(`${error.response.data.message}`);
      } else {
        setErrorMessage("Failed to save data. Please try again.");
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader"></div>
          </div>
        ) : (
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
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-green-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleInputChange}
                placeholder="Name"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-green-700 text-sm font-bold mb-2"
              >
                Password:
              </label>
              {/* <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-outline"
              /> */}
              <PasswordToggle
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleInputChange}
                className="px-6 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="companyName"
                className="block text-green-700 text-sm font-bold mb-2"
              >
                Shop Name:
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={companyName}
                onChange={handleInputChange}
                placeholder="Company Name"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-green-700 text-sm font-bold mb-2"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={handleInputChange}
                placeholder="Address"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-green-700 text-sm font-bold mb-2"
              >
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                pattern="\d*"
                maxlength="10"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-outline"
              />
            </div>
            {isError && (
              <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SellerForm;
