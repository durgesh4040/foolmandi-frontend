import { useState } from "react";
import { liveflowerPrice } from "./misc/LiveFlowerPrice";

import { useNavigate } from "react-router";
import { Loader } from "semantic-ui-react";
const ForgotUserName = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setLoding] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);
    console.log(email);
    try {
      const response = await liveflowerPrice.forgotUserName(email);
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoding(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center  bg-green-50">
      <div className="bg-white  bg-opacity-70 shadow-lg rounded-lg p-8 sm:p-12 w-full max-w-md">
        <div className="mb-5 text-2xl font-bold text-center text-gray-800">
          <h1 className="text-green-700">Forgot UserName?</h1>
        </div>
        {isLoading ? (
          <div className="flex justify-center ">
            <Loader />
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Enter your email address"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-green-700 text-white hover:bg-green-600 py-3 rounded-md font-semibold transition duration-300 ease-in-out"
                >
                  Send UserName
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotUserName;
