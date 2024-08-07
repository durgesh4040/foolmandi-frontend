import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { liveflowerPrice } from "../misc/LiveFlowerPrice";

const ProductList = () => {
  const location = useLocation();
  const { sellerEmail } = location.state;
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await liveflowerPrice.findSellerByEmail(sellerEmail);
        setSeller(response.data);
        setProducts(response.data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSellerData();
  }, [sellerEmail]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading seller data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  return (
    <div className="flex flex-col mt-2 items-center min-h-screen bg-green-50 p-6">
      {seller && (
        <div className="flex flex-col w-full">
          <div className="bg-green-700 text-white text-center py-4 mb-6">
            <h1 className="text-2xl font-bold">{seller.companyName}</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  sellerEmail={seller.email}
                />
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-600">
                No products found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product, sellerEmail }) => (
  <div className="border rounded-lg shadow-lg overflow-hidden bg-white flex flex-col">
    <img
      src={product.imageUrl}
      alt={product.productName}
      className="w-full h-48 object-cover"
    />
    <div className="p-4 flex flex-col flex-grow">
      <h2 className="text-lg font-bold text-gray-900">{product.productName}</h2>
      <p className="text-gray-900">
        <span className="font-bold">₹ {product.price}</span>
        <span className="font-bold ml-1">/ {product.unit}</span>
      </p>
      <div className="flex justify-end mt-auto">
        <Link
          to="/enquiryform"
          state={{ sellerEmail }}
          className="bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Enquiry
        </Link>
      </div>
    </div>
  </div>
);

export default ProductList;
