import React, { useState } from "react";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { Icon } from "react-icons-kit";

const PasswordToggle = ({ value, onChange, placeholder, name }) => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-outline"
        required
      />
      <span
        onClick={handleToggle}
        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
      >
        <Icon icon={icon} size={22} />
      </span>
    </div>
  );
};

export default PasswordToggle;
