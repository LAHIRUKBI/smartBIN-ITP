import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StockCreateList() {
  const [formData, setFormData] = useState({
    stockName: "",
    quantity: "",
    unitOfMeasure: "",
    category: "",
    addDate: "",
    expiryDate: "",
    price: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: localStorage.getItem("userRef") || "defaultUserRef",
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.message || "There was a problem with your request."
        );
      }

      navigate("/stockview");
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-green-50">
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-2xl overflow-hidden flex relative z-10">
          {/* Left Side Image */}
          <div
            className="hidden md:block w-1/3 bg-cover bg-center"
            style={{ backgroundImage: "url('/src/images/AddStock.png')" }}
          ></div>

          {/* Right Side Form */}
          <div className="w-full md:w-2/3 p-6 bg-gray-50">
            <h2 className="text-gray-800 text-4xl font-bold mb-4 text-center">
              Add New Stock
            </h2>
            <p className="text-gray-600 text-sm text-center mb-6">
              Fill in the details below to add a new stock item to your
              inventory.
            </p>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Stock Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800">
                  Stock Name
                </label>
                <input
                  type="text"
                  name="stockName"
                  value={formData.stockName}
                  onChange={handleInputChange}
                  className="px-3 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 transition-all hover:bg-gray-50"
                  placeholder="Enter stock name"
                  required
                />
              </div>

              {/* Quantity */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="px-3 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 transition-all hover:bg-gray-50"
                  placeholder="Enter quantity"
                  required
                />
              </div>

              {/* Unit of Measure */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800">
                  Unit of Measure
                </label>
                <select
                  name="unitOfMeasure"
                  value={formData.unitOfMeasure}
                  onChange={handleInputChange}
                  className="px-3 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 transition-all hover:bg-gray-50"
                  required
                >
                  <option value="" disabled>
                    Select a unit of measure
                  </option>
                  <option value="kg">Kilogram (kg)</option>
                  <option value="g">Gram (g)</option>
                  <option value="liters">Liter (L)</option>
                  <option value="pieces">Pieces</option>
                  <option value="meters">Meter (m)</option>
                </select>
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="px-3 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 transition-all hover:bg-gray-50"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="The parts removed from the fruit">
                    The parts removed from the fruit
                  </option>
                  <option value="Removed parts from electronics">
                    Removed parts from electronics
                  </option>
                  <option value="Parts removed from fabric">
                    Parts removed from fabric
                  </option>
                  <option value="Parts of trees cut down">
                    Parts of trees cut down
                  </option>
                  <option value="Parts removed from vegetables">
                    Parts removed from vegetables
                  </option>
                  <option value="Plastic things">Plastic things</option>
                  <option value="Garbage without any separation">
                    Garbage without any separation
                  </option>
                  {/* Add more categories as needed */}
                </select>
              </div>

              {/* Add Date */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800">
                  Add Date
                </label>
                <input
                  type="date"
                  name="addDate"
                  value={formData.addDate}
                  onChange={handleInputChange}
                  className="px-3 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 transition-all hover:bg-gray-50"
                  required
                />
              </div>

              {/* Expiry Date */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="px-3 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 transition-all hover:bg-gray-50"
                  required
                />
              </div>

              {/* Price */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="px-3 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 transition-all hover:bg-gray-50"
                  placeholder="Enter price"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-md transition-all transform hover:scale-105 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Stock"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Optional Footer or Additional Information */}
      <footer className="bg-green-800 text-white text-center py-6">
                <div className="container mx-auto">
                    <h3 className="text-lg font-bold mb-2">Join Us in Making a Difference!</h3>
                    <p className="mb-4">Your journey towards a greener planet starts here.</p>
                    <div className="flex justify-center mb-4">
                        <a href="https://facebook.com" className="mx-2 text-gray-300 hover:text-white">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" className="mx-2 text-gray-300 hover:text-white">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" className="mx-2 text-gray-300 hover:text-white">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://linkedin.com" className="mx-2 text-gray-300 hover:text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                    <p className="text-sm">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </footer>
    </div>
  );
}
