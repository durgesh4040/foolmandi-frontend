import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { liveflowerPrice } from "../misc/LiveFlowerPrice";

const SellerData = () => {
  const [sellerData, setSellerData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await liveflowerPrice.findAllSellerData();
        console.log("Data", response);
        setSellerData(response.data);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };
    fetchData();
  }, []);

  const handleGetBestPrice = (seller) => {
    navigate("/productlist", { state: { sellerEmail: seller.email } });
  };

  return (
    <div className="flex flex-col mt-2 items-center min-h-screen bg-green-50 px-4 sm:px-6 lg:px-8">
      {sellerData.length > 0 ? (
        sellerData.map((seller, index) => (
          <div
            key={index}
            className="flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-4 p-4 rounded overflow-hidden shadow-lg bg-white border border-green-500"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-white bg-green-700 p-2 rounded text-center">
                {seller.companyName}
              </div>
              <p className="text-black text-base">
                <strong>Email:</strong> {seller.email}
              </p>
              <p className="text-black text-base">
                <strong>Phone:</strong> {seller.phoneNumber}
              </p>
              <p className="text-black text-base">
                <strong>Address:</strong> {seller.address}
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                <Link
                  to={"/enquiryform"}
                  state={{ sellerEmail: seller.email }}
                  className="bg-green-700 text-white font-bold py-2 px-4 rounded text-center"
                >
                  Enquiry
                </Link>
                <button
                  onClick={() => handleGetBestPrice(seller)}
                  className="bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Product
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading seller data...</p>
      )}
    </div>
  );
};

export default SellerData;
