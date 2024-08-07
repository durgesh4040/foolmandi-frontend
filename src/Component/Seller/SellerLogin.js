import { useState } from "react";
import { liveflowerPrice } from "../misc/LiveFlowerPrice";
import { useNavigate } from "react-router";
import LoaderComponent from "../LoaderComponent";
import { useAuth } from "../context/AuthContext";
import { parseJwt } from "../misc/Helpers";
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
    if (name === "username") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
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
        navigate("/seller-dashboard", { state: { sellerEmail: username } });
      } else {
        setError(true);
        setErrorMessage(response.data.message || "Login failed.");
      }
      setUserName("");
      setPassword("");
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error.response.data);
      setErrorMessage(
        `${error.response.data} !! ` || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
                type="email"
                placeholder="Enter Email"
                name="username"
                className="px-6 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
                onChange={handleChange}
                value={username}
              />
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="px-6 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
                onChange={handleChange}
                value={password}
              />
              {isError && <p className="text-red-600">{errorMessage}</p>}
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
