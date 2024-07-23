import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { liveflowerPrice } from "../misc/LiveFlowerPrice";

const ProductList = () => {
  const location = useLocation();
  const { sellerEmail } = location.state;
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await liveflowerPrice.findSellerByEmail(sellerEmail);
        console.log("Seller Data:", response.data);
        setSeller(response.data);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };
    fetchSellerData();
  }, [sellerEmail]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-green-50 p-6">
      {seller ? (
        <div className="flex flex-col w-full">
          <div className="bg-green-700 text-white text-center py-4 mb-6">
            <h1 className="text-2xl font-bold">{seller.companyName}</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={index}
                  className="border rounded-lg shadow-lg overflow-hidden bg-white"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    width="200"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-800">
                      {product.productName}
                    </h2>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-600">
                No products found.
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading seller data...</p>
      )}
    </div>
  );
};

export default ProductList;
