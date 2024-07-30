import React, { useState, useEffect } from "react";
import axios from "axios";
import { Segment, Dimmer, Loader } from "semantic-ui-react";
import Search from "./Search";
import Crousel from "./Crousel";
import { handleLogError } from "../Component/misc/Helpers";

export default function HomePage() {
  const images = [
    "./images/Rose.webp",
    "./images/Gerbera.webp",
    "./images/Titus.webp",
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://www.phoolmandi.in:8080/public/getPriceByDate/2024-07-25",
          {
            params: {
              page: page,
              size: 6,
              name: searchQuery, // Pass the search query as a parameter
            },
          }
        );
        console.log("Fetched data:", response.data);
        setData(response.data.content || []);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        handleLogError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, searchQuery]);

  const handleSearch = (query) => {
    console.log("Search query:", query);
    setSearchQuery(query);
    setPage(0); // Reset page to 0 when performing a new search
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="bg-green-50">
      <Crousel images={images} />
      <div className="text-3xl font-semibold my-4 h1 text-center">
        Kanpur Flower Market Price {currentDate.toLocaleString()}
      </div>
      <div className="overflow-x-auto flex justify-center items-center relative shadow-md sm:rounded-lg h-screen bg-green-50">
        <div className="flex flex-col items-center md:w-3/4 lg:w-1/2">
          <div className="flex flex-col w-10/12 mb-5">
            <Search onSearch={handleSearch} />
          </div>
          {isLoading ? (
            <Segment basic style={{ marginTop: window.innerHeight / 2 }}>
              <Dimmer active inverted>
                <Loader inverted size="huge">
                  Loading
                </Loader>
              </Dimmer>
            </Segment>
          ) : (
            <table className="w-10/12 text-sm text-left text-black dark:text-black">
              <thead className="text-xs text-black uppercase bg-green-200 dark:bg-green-200">
                <tr>
                  <th scope="col" className="py-3 px-6 text-center">
                    Variety
                  </th>
                  <th scope="col" className="py-3 px-6 text-center">
                    Category
                  </th>
                  <th scope="col" className="py-3 px-6 text-center">
                    Qty
                  </th>
                  <th scope="col" className="py-3 px-6 text-center">
                    Unit
                  </th>
                  <th scope="col" className="py-3 px-6 text-center">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-white dark:border-black-700 hover:bg-green-100 dark:hover:bg-green-200"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-black whitespace-nowrap dark:text-white"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={`./images/${item.name}.webp`}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded-full"
                          />
                          <span className="text-black">{item.name}</span>
                        </div>
                      </th>
                      <td className="py-4 px-6 text-black text-center">
                        {item.category}
                      </td>
                      <td className="py-4 px-6 text-black text-center">
                        {item.qty}
                      </td>
                      <td className="py-4 px-6 text-black text-center">
                        {item.unit}
                      </td>
                      <td className="py-4 px-6 text-black font-bold">{`\u20B9 ${item.price}`}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-4 px-6 text-black text-center"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          {/* Pagination controls */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={handlePreviousPage}
              disabled={page === 0}
              className="mr-2 px-4 py-2 bg-green-700 text-white rounded-md"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 bg-green-700 text-white rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
