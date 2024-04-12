import { useState, useEffect } from "react";
import axios from "axios";
import Format from "./Format";
import Crousel from "./Crousel";
import Search from "./Search";

export default function HomePage() {
  const images = [
    "./images/Rose.jpg",
    "./images/Gerbera.jpg",
    "./images/Titus.jpg",
  ];
  const [isLoading, setIsLoding] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsLoding(true);
    const fetchData = async () => {
      try {
        const formattedDate = Format();
        console.log(formattedDate);
        const response = await axios.get(
          `http://localhost:8080/getPriceByDate/2024-04-12`,
          {
            params: {
              page: currentPage - 1,
              limit: itemsPerPage,
            },
          }
        );

        console.log(response.data);
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
        setIsLoding(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleNextPage = () => {
    if (currentPage <= totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  console.log("search query", searchQuery);
  return (
    <div className="bg-green-50">
      <Crousel images={images} />

      <div className="text-3xl font-semibold my-4 h1 text-center">
        {`Kanpur Flower Market Price ${currentDate.toLocaleString()}`}
      </div>

      <div className="overflow-x-auto flex justify-center items-center relative shadow-md sm:rounded-lg h-screen bg-green-50">
        <div className="flex flex-col items-center  md:w-3/4 lg:w-1/2">
          <div className="flex flex-col w-10/12 mb-5">
            <Search onSearch={handleSearch} />
          </div>
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
              {data &&
                data
                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.name.toLowerCase().includes(search);
                  })
                  .map((item, index) => (
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
                            src={`./images/${item.name}.jpg`}
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
                      <td className="py-4 px-6 text-black">{item.unit}</td>
                      <td className="py-4 px-6 text-black font-bold">{`\u20B9 ${item.price}`}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <div className="flex justify-between w-full p-4">
            <button
              className="bg-green-700 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-green-700 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
