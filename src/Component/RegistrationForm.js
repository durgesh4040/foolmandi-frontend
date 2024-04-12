import React from "react";

const RegistrationForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the form submission, e.g., sending data to a server
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white mt-8 p-6  space-y-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
            Registration Form
          </h2>
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
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="flower-type"
              className="block text-green-700 text-sm font-bold mb-2"
            >
              Type of Flowers:
            </label>
            <input
              type="text"
              id="flowers"
              name="flowers"
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
              className="bg-green-500 hover:bg-green-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
