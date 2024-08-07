import React from "react";
import Modal from "react-modal";

const EditProductModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  editingProduct,
  handleInputChange,
  handleSaveProduct,
}) => {
  return (
    <Modal
      isOpen={isEditModalOpen}
      onRequestClose={() => setIsEditModalOpen(false)}
      contentLabel="Edit Product"
      ariaHideApp={false}
      className="flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Edit Product</h2>
        {editingProduct && (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={editingProduct.productName}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={editingProduct.category}
                onChange={handleInputChange}
                placeholder="Category"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unit
              </label>
              <input
                type="text"
                name="unit"
                value={editingProduct.unit}
                onChange={handleInputChange}
                placeholder="Unit"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={editingProduct.date}
                onChange={handleInputChange}
                placeholder="Date"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleSaveProduct}
                className="bg-green-700 rounded-md text-white py-2 px-4 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-500 rounded-md text-white py-2 px-4 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default EditProductModal;
