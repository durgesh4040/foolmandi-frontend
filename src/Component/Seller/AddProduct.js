import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { liveflowerPrice } from "../misc/LiveFlowerPrice";
import LoaderComponent from "../LoaderComponent";
import { useAuth } from "../context/AuthContext";
const AddProduct = () => {
  const Auth = useAuth();
  const user = Auth.getUser();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([
    { productName: "", price: "", unit: "", category: "", image: null },
  ]);

  const handleChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { productName: "", price: "", unit: "", category: "", image: null },
    ]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const productData = new FormData();

    products.forEach((product) => {
      productData.append("productNames", product.productName);
      productData.append("productPrices", product.price);
      productData.append("productUnits", product.unit);
      productData.append("productCategory", product.category);
      if (product.image) {
        productData.append("multipartFiles", product.image);
      }
    });

    try {
      console.log("email", email);
      const response = await liveflowerPrice.saveProduct(
        email,
        productData,
        user
      );

      if (response.status === 200) {
        setProducts([
          { productName: "", price: "", unit: "", category: "", image: null },
        ]);
        setIsError(false);
        setErrorMessage("");
        console.log("Products saved successfully:", response.data);
        navigate("/");
      }
    } catch (error) {
      console.error("Error saving products:", error);
      setErrorMessage("Failed to save products. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClick = () => {
    navigate("/sellerLogin");
  };

  return (
    <>
      <div className="flex justify-end p-3 bg-green-50">
        <button
          onClick={handleClick}
          className="bg-green-700 hover:bg-green-600 rounded-md px-4 py-2 text-white transition duration-200 ease-in-out"
        >
          Dashboard
        </button>
      </div>
      <div className="flex flex-col min-h-screen justify-center items-center bg-green-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-green-700 mb-6">
            Add Products
          </h1>
          {isLoading ? (
            <div className="flex  justify-center items-center">
              <LoaderComponent />
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {products.map((product, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-4 mb-4 last:border-none last:pb-0"
                >
                  <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Product Name"
                        value={product.productName}
                        onChange={(e) =>
                          handleChange(index, "productName", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                      />
                    </div>
                    <div className="w-full mt-4 sm:mt-0">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Price"
                        value={product.price}
                        onChange={(e) =>
                          handleChange(index, "price", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 mt-4">
                    <label className="text-sm font-medium text-gray-700">
                      Unit
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`unit-${index}`}
                          value="Kg"
                          checked={product.unit === "Kg"}
                          onChange={() => handleChange(index, "unit", "Kg")}
                          className="form-radio text-green-500"
                        />
                        <span className="ml-2">Kg</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`unit-${index}`}
                          value="Pieces"
                          checked={product.unit === "Pieces"}
                          onChange={() => handleChange(index, "unit", "Pieces")}
                          className="form-radio text-green-500"
                        />
                        <span className="ml-2">Pieces</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 mt-4">
                    <label className="text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`category-${index}`}
                          value="cutflower"
                          checked={product.category === "cutflower"}
                          onChange={() =>
                            handleChange(index, "category", "cutflower")
                          }
                          className="form-radio text-green-500"
                        />
                        <span className="ml-2">Cutflower</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`category-${index}`}
                          value="Looseflower"
                          checked={product.category === "Looseflower"}
                          onChange={() =>
                            handleChange(index, "category", "Looseflower")
                          }
                          className="form-radio text-green-500"
                        />
                        <span className="ml-2">Looseflower</span>
                      </label>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleChange(index, "image", e.target.files[0])
                      }
                      className="w-full text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddProduct}
                className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
              >
                Add Another Product
              </button>
              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-600 transition duration-200 mt-4"
              >
                Submit
              </button>
            </form>
          )}
          {isError && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default AddProduct;
