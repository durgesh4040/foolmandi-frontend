import { useLocation } from "react-router";
import { useState, useEffect } from "react";

import { liveflowerPrice } from "../misc/LiveFlowerPrice";
import { trashO } from "react-icons-kit/fa/trashO";
import { Icon } from "react-icons-kit";
import { pencil } from "react-icons-kit/fa/pencil";
import EditProductModal from "./EditProductMoadal";
import AddProductModal from "./AddProductModal";
import { useAuth } from "../context/AuthContext";

const SellerDashboard = () => {
  const location = useLocation();
  const { username } = location.state;
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const Auth = useAuth();
  const user = Auth.getUser();
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await liveflowerPrice.findSellerByName(username);
        setEmail(response.data.email);

        setSeller(response.data);
        setProducts(response.data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSellerData();
  }, [username]);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = async () => {
    try {
      const response = await liveflowerPrice.updateProduct(
        editingProduct.id,
        editingProduct,
        user
      );
      if (response.status === 200) {
        setProducts(
          products.map((product) =>
            product.id === editingProduct.id ? editingProduct : product
          )
        );
        setIsEditModalOpen(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await liveflowerPrice.deleteProductById(productId, user);
      if (response.status === 200) {
        setProducts(products.filter((product) => product.id !== productId));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading seller data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold text-green-700 text-center">
        Seller Dashboard
      </h1>
      <div className="flex justify-end mr-3">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2"
        >
          Add Product
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-4">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Unit
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-bold"
              >
                <th
                  scope="row"
                  className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      width="50"
                      height="50"
                      className="rounded-md"
                    />
                    <span>{product.productName}</span>
                  </div>
                </th>
                <td className="px-6 py-4 font-medium">{product.category}</td>
                <td className="px-6 py-4 font-medium">Rs {product.price}</td>
                <td className="px-6 py-4">{product.unit}</td>
                <td className="px-6 py-4 font-medium">{product.date}</td>
                <td className="px-6 py-4 font-medium">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <Icon icon={pencil} size={22} />
                    <span>Edit</span>
                  </button>
                </td>
                <td className="px-6 py-4 font-medium">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2 items-center"
                  >
                    <Icon icon={trashO} size={22} />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditProductModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        editingProduct={editingProduct}
        handleInputChange={handleInputChange}
        handleSaveProduct={handleSaveProduct}
      />
      <AddProductModal
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
        email={email}
      />
    </div>
  );
};

export default SellerDashboard;
