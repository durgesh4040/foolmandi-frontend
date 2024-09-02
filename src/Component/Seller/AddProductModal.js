import { useState } from "react";
import Modal from "react-modal";
import { liveflowerPrice } from "../misc/LiveFlowerPrice";
import { useAuth } from "../context/AuthContext";

const AddProductModal = ({ isModalOpen, setIsModalOpen, email }) => {
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    price: "",
    unit: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const Auth = useAuth();
  const user = Auth.getUser();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0],
    }));
  };

  const handleAddProduct = async () => {
    setLoading(true);
    setSuccess(null);
    const productData = new FormData();
    productData.append("productNames", product.productName);
    productData.append("productPrices", product.price);
    productData.append("productUnits", product.unit);
    productData.append("productCategory", product.category);
    if (product.image) {
      productData.append("multipartFiles", product.image);
    }

    try {
      const response = await liveflowerPrice.saveProduct(
        email,
        productData,
        user
      );

      if (response.status === 200) {
        setProduct({
          productName: "",
          category: "",
          price: "",
          unit: "",
          image: null,
        });

        setError(null);
        setSuccess("Product added successfully!");
        setIsModalOpen(false);
      }
    } catch (error) {
      setError("Failed to save product. Please try again.");
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentLabel="Add Product"
      ariaHideApp={false}
      className="modal"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-md sm:max-w-lg mx-4 sm:mx-0">
        <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 sm:mb-6">
          Add Product
        </h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}
        <form className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleInputChange}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="flex flex-wrap space-x-4">
              <label className="flex items-center mb-2 sm:mb-0">
                <input
                  type="radio"
                  name="category"
                  value="Cut Flower"
                  checked={product.category === "Cut Flower"}
                  onChange={handleInputChange}
                  className="form-radio text-green-500"
                />
                <span className="ml-2">Cut Flower</span>
              </label>
              <label className="flex items-center mb-2 sm:mb-0">
                <input
                  type="radio"
                  name="category"
                  value="Loose Flower"
                  checked={product.category === "Loose Flower"}
                  onChange={handleInputChange}
                  className="form-radio text-green-500"
                />
                <span className="ml-2">Loose Flower</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter product price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <div className="flex flex-wrap space-x-4">
              <label className="flex items-center mb-2 sm:mb-0">
                <input
                  type="radio"
                  name="unit"
                  value="Kg"
                  checked={product.unit === "Kg"}
                  onChange={handleInputChange}
                  className="form-radio text-green-500"
                />
                <span className="ml-2">Kg</span>
              </label>
              <label className="flex items-center mb-2 sm:mb-0">
                <input
                  type="radio"
                  name="unit"
                  value="Pieces"
                  checked={product.unit === "Pieces"}
                  onChange={handleInputChange}
                  className="form-radio text-green-500"
                />
                <span className="ml-2">Pieces</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={handleAddProduct}
              className="bg-green-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddProductModal;
