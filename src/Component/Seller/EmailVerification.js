import React, { useState } from "react";
import { liveflowerPrice } from "../misc/LiveFlowerPrice";
import { useNavigate } from "react-router";
import WhySellOnPhoolmandi from "./WhySellOnPhoolmandi";

const EmailVerification = ({ setVerifiedEmail }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSendOtp = async () => {
    setIsLoading(true);
    console.log(email);
    try {
      await liveflowerPrice.sendOtp(email);

      setStep(2);
    } catch (error) {
      setIsError(true);
      setErrorMessage("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      console.log(otp);
      const response = await liveflowerPrice.verifyOtp(email, otp);
      const isValid = response.data;
      console.log(isValid);

      if (response.status === 200 && isValid) {
        setVerifiedEmail(email);
        setErrorMessage("");
      }
      if (isValid === false) {
        setErrorMessage("Invalid OTP. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      setErrorMessage(errorMessage);
    }
  };

  const handleClick = () => {
    navigate("/sellerLogin");
  };

  return (
    <>
      <div className="flex justify-end p-3 bg-green-50">
        <button
          onClick={handleClick}
          className="bg-green-700 hover:bg-green-600 rounded-md px-4 py-2 text-white transition duration-200 ease-in-out"
        >
          Dashboard
        </button>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
        <div className="max-w-md w-full  p-10 bg-white rounded-xl shadow-lg z-10">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader"></div>
            </div>
          ) : (
            <div>
              {step === 1 ? (
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-center text-green-700">
                    Registration for Flower Shop
                  </h2>
                  <div className="relative mb-4">
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-outline transition duration-200 ease-in-out"
                    />
                  </div>
                  <button
                    onClick={handleSendOtp}
                    className="w-full bg-green-700 hover:bg-green-900 text-white mt-4 font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                  >
                    Send OTP
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-center text-green-700">
                    Verify OTP
                  </h2>
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-outline transition duration-200 ease-in-out"
                    />
                  </div>
                  <button
                    onClick={handleVerifyOtp}
                    className="w-full bg-green-700 hover:bg-green-900 mt-4 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                  >
                    Verify OTP
                  </button>
                </div>
              )}
              {isError && (
                <div className="text-red-500 text-sm mt-4">{errorMessage}</div>
              )}
            </div>
          )}
        </div>
        <WhySellOnPhoolmandi />
      </div>
    </>
  );
};

export default EmailVerification;
