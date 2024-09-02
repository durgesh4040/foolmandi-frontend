import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { liveflowerPrice } from "../misc/LiveFlowerPrice";
import { Helmet } from "react-helmet";
import Search from "../Search";
import Carousel from "../Crousel";

const SellerData = () => {
  const images = [
    "./images/bannerimages.webp",
    "./images/Rose.webp",
    "./images/Gerbera.webp",
    "./images/bannerimages.webp",
    "./images/bannerimages.webp",
  ];
  const [sellerData, setSellerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await liveflowerPrice.findAllSellerData(searchQuery);

        //console.log("Data", response.data);
        setSellerData(response.data);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };
    fetchData();
  }, [searchQuery]);

  const handleGetBestPrice = (seller) => {
    navigate("/productlist", { state: { sellerEmail: seller.email } });
  };
  const handleSearch = (searchQuery) => {
    console.log("search query:", searchQuery);
    setSearchQuery(searchQuery);
  };
  return (
    <>
      <div className="flex flex-col  items-center min-h-screen bg-green-50 ">
        <Helmet>
          <title>
            PhoolMandi - Your One-Stop Platform for Florists, Flower Decorators,
            and Online Flower Shop
          </title>
          <meta
            name="description"
            content="PhoolMandi - The best platform to buy flowers directly from florists. Find the cheapest flowers, bouquet decorators, and all florist sellers in one place."
          />
          <meta
            name="keywords"
            content="PhoolMandi, flower bouquets, cheapest flowers, florist sellers, buy flowers, flower decorators, online flower shop, best flower platform, flower delivery, floral arrangements, nursery, cheap flowers, best place for online PhoolMandi"
          />
          <meta name="author" content="PhoolMandi Team" />
          <meta
            property="og:title"
            content="PhoolMandi - Your One-Stop Platform for Florists, Flower Decorators, and Online Flower Shop"
          />
          <meta
            property="og:description"
            content="Find the best flower bouquet decorators and cheapest flowers from top florists. All florist sellers in one place."
          />
          <meta property="og:image" content="%PUBLIC_URL%/og-image.jpg" />
          <meta property="og:url" content="http://www.phoolmandi.in" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="PhoolMandi - Your One-Stop Platform for Florists, Flower Decorators, and Online Flower Shop"
          />
          <meta
            name="twitter:description"
            content="Find the best flower bouquet decorators and cheapest flowers from top florists. All florist sellers in one place."
          />
          <meta name="twitter:image" content="%PUBLIC_URL%/twitter-image.jpg" />
          <meta name="twitter:site" content="@PhoolMandi" />
          <link rel="canonical" href="http://www.phoolmandi.in" />
          <meta name="robots" content="index, follow" />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8848906972435458"
            crossorigin="anonymous"
          ></script>
        </Helmet>
        <Carousel images={images} />
        <div className="flex flex-col w-10/12 mb-5 mt-6">
          <Search onSearch={handleSearch} />
        </div>

        {sellerData.length > 0 ? (
          sellerData.map((seller, index) => (
            <div
              key={index}
              className="flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-4 p-4 rounded overflow-hidden shadow-lg bg-white border border-green-500 mt-2"
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
    </>
  );
};

export default SellerData;
