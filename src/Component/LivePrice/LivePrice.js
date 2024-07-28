import React, { useState } from "react";
import axios from "axios";
function LivePrice() {
  const [products, setProducts] = useState([
    { name: "Titus", present: "", category: "", price: "", qty: "", unit: "" },
    {
      name: "Guldaudi",
      present: "",
      category: "",
      price: "",
      qty: "",
      unit: "",
    },
    {
      name: "Candytuff",
      present: "",
      category: "",
      price: "",
      qty: "",
      unit: "",
    },
    { name: "Rose", present: "", category: "", price: "", qty: "", unit: "" },
    {
      name: "Gerbera",
      present: "",
      category: "",
      price: "",
      qty: "",
      unit: "",
    },
    {
      name: "Gypsophila",
      present: "",
      category: "",
      price: "",
      qty: "",
      unit: "",
    },
    {
      name: "Ragjniganda",
      present: "",
      category: "",
      price: "",
      qty: "",
      unit: "",
    },
    {
      name: "Gladiolus",
      present: "",
      category: "",
      price: "",
      qty: "",
      unit: "",
    },
    {
      name: "Carnation",
      present: "",
      category: "",
      price: "",
      qty: "",
      unit: "",
    },
    { name: "Orchid", present: "", category: "", price: "", qty: "", unit: "" },
    { name: "Lily", present: "", category: "", price: "", qty: "", unit: "" },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(products);
    const response = await axios.post(
      "http://localhost:16.170.98.46/public/admin/Price",
      products,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    setProducts(
      products.map((product) => ({
        ...product,
        present: "",
        price: "",
        qty: "",
        unit: "",
      }))
    );
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-4 text-green-600">
        Product Price Update Form
      </h2>
      <form onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <div key={product.name} className="mb-4">
            <label className="text-green-700 font-bold">{product.name}</label>

            <div className="flex justify-between items-center mt-2">
              <label className="text-green-700">Present:</label>
              <label className="ml-2">Yes</label>
              <input
                type="radio"
                name={`present-${product.name}`}
                onChange={() => handleProductChange(index, "present", "true")}
                className="ml-1"
              />
              <label className="ml-2">No</label>
              <input
                type="radio"
                name={`present-${product.name}`}
                onChange={() => handleProductChange(index, "present", "false")}
                className="ml-1"
              />
            </div>
            <div className="mt-2">
              <label className="text-green-700">Price:</label>
              <input
                type="number"
                name={`price-${product.name}`}
                value={product.price}
                onChange={(e) =>
                  handleProductChange(index, "price", e.target.value)
                }
                className="ml-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

              <div className="mt-2">
                <label className="text-green-700">Category:</label>
                <select
                  name={`unit-${product.name}`}
                  value={product.category}
                  onChange={(e) =>
                    handleProductChange(index, "category", e.target.value)
                  }
                  className="ml-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Category</option>
                  <option value="loose flower">Loose Flower</option>
                  <option value="cut flower">Cut Flower</option>
                </select>
              </div>

              <div className="mt-2">
                <label className="text-green-700">Qty:</label>
                <input
                  type="number"
                  value={product.qty}
                  onChange={(e) =>
                    handleProductChange(index, "qty", e.target.value)
                  }
                  placeholder="Enter Qty"
                  className="ml-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <select
                  name={`unit-${product.name}`}
                  value={product.unit}
                  onChange={(e) =>
                    handleProductChange(index, "unit", e.target.value)
                  }
                  className="ml-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Unit</option>
                  <option value="Kg">Kg</option>
                  <option value="Piece">Piece</option>
                </select>
              </div>
            </div>
            <hr className="my-4" />
          </div>
        ))}
        <input
          type="submit"
          value="Submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
        />
      </form>
    </div>
  );
}

export default LivePrice;
