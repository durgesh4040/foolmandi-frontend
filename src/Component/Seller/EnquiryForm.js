import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import { liveflowerPrice } from "../misc/LiveFlowerPrice";
import { useAuth } from "../context/AuthContext";

const EnquiryForm = () => {
  const location = useLocation();
  const { sellerEmail } = location.state || {};
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhoneNo, setCustomerPhoneNo] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const Auth = useAuth();
  const user = Auth.getUser();
  const isUser = user.data.rol[0] === "USER";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "customerEmail":
        setCustomerEmail(value);
        break;
      case "customerPhoneNo":
        setCustomerPhoneNo(value);
        break;
      case "productName":
        setProductName(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
      case "unit":
        setUnit(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const enquiryData = {
      sellerEmail,
      customerEmail,
      customerPhoneNo,
      productName,
      quantity,
      unit,
    };

    if (
      !(
        sellerEmail &&
        customerEmail &&
        customerPhoneNo &&
        productName &&
        quantity
      )
    ) {
      setIsError(true);
      setErrorMessage("Please fill in all fields!");
      return;
    }

    console.log("Form submitted with data:", enquiryData);

    try {
      const response = await liveflowerPrice.enquiryData(enquiryData, user);
      console.log("Response:", response);
      setIsSubmitted(true);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setErrorMessage(
        "An error occurred while submitting the form. Please try again."
      );
    }
  };

  if (isSubmitted) {
    return <Navigate to="/directBuy" />;
  }

  // if (!isUser) {
  //   return <Navigate to="/" />;
  // }
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white mt-8 p-6 space-y-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
            Enquiry Form
          </h2>
          {isError && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
          <div className="mb-4">
            <label
              htmlFor="customerEmail"
              className="block text-green-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={customerEmail}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="customerPhoneNo"
              className="block text-green-700 text-sm font-bold mb-2"
            >
              Phone No:
            </label>
            <input
              type="number"
              id="customerPhoneNo"
              name="customerPhoneNo"
              value={customerPhoneNo}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-green-700 text-sm font-bold mb-2"
            >
              Name of Products:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productName}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-green-700 text-sm font-bold mb-2"
            >
              Quantity:
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{1,10}"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label
              htmlFor="unit"
              className="block text-green-700 text-sm font-bold mb-2 mt-4"
            >
              Unit:
            </label>
            <select
              id="unit"
              name="unit"
              value={unit}
              onChange={handleInputChange}
              required
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="kg">Kg</option>
              <option value="pieces">Pieces</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
