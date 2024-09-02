import { useState } from "react";
import { liveflowerPrice } from "./misc/LiveFlowerPrice";
import { useNavigate } from "react-router";
import PasswordToggle from "./PasswordToggle";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "newPassword") setNewPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const forgotPasswordData = new FormData();
    forgotPasswordData.append("email", email);
    forgotPasswordData.append("password", newPassword);

    try {
      await liveflowerPrice.forgotPassword(forgotPasswordData);
      navigate("/");
    } catch (error) {
      setError(true);
      if (error.response && error.response.status === 404) {
        setMessage("Email not found. Please try again.");
      } else {
        setMessage("Failed to reset password. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Reset Your Password
        </h1>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleChange}
            value={email}
          />
        </div>
        <div className="mb-6">
          <PasswordToggle
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            placeholder="Enter New Password"
          />
        </div>
        {error && (
          <div className="mb-4 text-red-600 text-center">{message}</div>
        )}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
