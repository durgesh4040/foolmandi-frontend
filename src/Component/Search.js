import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(query);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSearch(query);
  // };

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="py-3 px-4 rounded-full text-black font-bold placeholder-gray-500 border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white shadow-md w-full"
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="w-6 h-6 text-green-500 hover:text-green-600"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </div>
  );
};

export default Search;
