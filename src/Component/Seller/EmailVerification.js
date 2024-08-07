import React, { useState } from "react";

import { liveflowerPrice } from "../misc/LiveFlowerPrice";
import { useNavigate } from "react-router";

const EmailVerification = ({ setVerifiedEmail }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 for email input, 2 for OTP input
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSendOtp = async () => {
    setIsLoading(true);
    console.log(email);
    try {
      // await sendOtp(email);
      const response = await liveflowerPrice.sendOtp(email);
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
      <div className="flex justify-end mr-3">
        <button
          onClick={handleClick}
          className="mt-2 bg-green-700 hover:bg-green-600 rounded-md px-4 py-2 text-white"
        >
          Dashboard
        </button>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader"></div>
            </div>
          ) : (
            <div>
              {step === 1 ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
                    Email Verification
                  </h2>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-outline"
                  />
                  <button
                    onClick={handleSendOtp}
                    className="bg-green-700 hover:bg-green-900 text-white mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Send OTP
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
                    Verify OTP
                  </h2>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-outline"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    className="bg-green-700 hover:bg-green-900 mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Verify OTP
                  </button>
                </div>
              )}
              {isError && (
                <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
