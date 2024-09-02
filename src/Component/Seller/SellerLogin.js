import { useState } from "react";
import { liveflowerPrice } from "../misc/LiveFlowerPrice";
import { useNavigate } from "react-router";
import LoaderComponent from "../LoaderComponent";
import { useAuth } from "../context/AuthContext";
import { parseJwt } from "../misc/Helpers";
import PasswordToggle from "../PasswordToggle";
const SellerLogin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimvalue = value.trim();
    if (name === "username") {
      setUserName(trimvalue);
    } else if (name === "password") {
      setPassword(trimvalue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");

    if (!(username && password)) {
      setError(true);
      setErrorMessage("Please fill in both fields.");
      return;
    }

    const login = { username, password };
    setLoading(true);
    try {
      const response = await liveflowerPrice.loginSeller(login);

      const { accessToken } = response.data;
      const data = parseJwt(accessToken);
      const authenticatedUser = { data, accessToken };

      Auth.userLogin(authenticatedUser);

      if (response.status === 200) {
        navigate("/seller-dashboard", { state: { username: username } });
      } else {
        setError(true);
        setErrorMessage(response.data.message || "Login failed.");
      }
      setUserName("");
      setPassword("");
      setError(false);
    } catch (error) {
      setError(true);

      console.log(error.response?.data);
      setErrorMessage(
        `${error.response.data} !! ` || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  const handlePassword = () => {
    navigate("/forgotPassword");
  };
  const handleUserName = () => {
    navigate("/forgotUserName");
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6">
          Login For Product Dashboard
        </h1>
        {isLoading ? (
          <div className="flex  justify-center items-center">
            <LoaderComponent />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4 ">
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-outline"
                onChange={handleChange}
                value={username}
              />

              <PasswordToggle
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleChange}
                className="px-6 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              {isError && <p className="text-red-600">{errorMessage}</p>}

              <div className="flex flex-row justify-between">
                <div className="text-sm">
                  <button
                    onClick={handlePassword}
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="text-sm">
                  <button
                    onClick={handleUserName}
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Forgot Username?
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-700 text-white py-3 rounded-md hover:bg-green-800 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SellerLogin;
