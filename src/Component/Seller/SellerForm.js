import React, { useState } from "react";

import { liveflowerPrice } from "../misc/LiveFlowerPrice";

import { Navigate } from "react-router";

const SellerForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [products, setProducts] = useState([{ productName: "", price: "" }]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUserName(value);
        break;
      case "password":
        setPassword(value);
        break;

      case "email":
        setEmail(value);
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

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const newProducts = [...products];
    newProducts[index][name] = value;
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([...products, { productName: "", price: "" }]);
  };

  const handleSubmit = async (event) => {
    console.log("hi");
    event.preventDefault();
    // Handle form submission, e.g., sending data to a server

    if (
      !(username && password && email && companyName && address && phoneNumber)
    ) {
      setIsError(true);
      setErrorMessage("Please, inform all fields!");
      return;
    }

    const seller = {
      username,
      password,
      email,
      companyName,
      address,
      phoneNumber,
      products,
    };
    try {
      console.log(seller);
      const response = await liveflowerPrice.saveSeller(seller);
      console.log(response);
      console.log("hi", seller);
      console.log(response);
      setisLoggedIn(true);
      setUserName("");
      setPassword("");

      setEmail("");
      setCompanyName("");
      setAddress("");
      setPhoneNumber("");
      setProducts([{ productName: "", price: "" }]);
      setIsError(false);
      setErrorMessage("");
    } catch (error) {}
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
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
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
              placeholder="Password"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="companyName"
              className="block text-green-700 text-sm font-bold mb-2"
            >
              Company Name:
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-700 text-sm font-bold mb-2">
              Products:
            </label>
            {products.map((product, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={(e) => handleProductChange(index, e)}
                  placeholder="Product Name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={(e) => handleProductChange(index, e)}
                  placeholder="Price"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addProduct}
              className="bg-green-700 hover:bg-green-900 text-white  item-center font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Product
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerForm;
