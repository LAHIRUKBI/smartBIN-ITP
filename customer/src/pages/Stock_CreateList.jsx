import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineCalendar,
  AiOutlineFieldNumber,
  AiOutlineStock,
  AiOutlineTag,
  AiOutlineNumber,
  AiOutlineTags,
} from "react-icons/ai";
import { FaWeightHanging } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";

// Modal Component to show details
function ConfirmationModal({ formData, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-xl font-bold mb-4">Confirm Stock Details</h3>
        <ul className="space-y-2">
          <li><strong>Stock Name:</strong> {formData.stockName}</li>
          <li><strong>Quantity:</strong> {formData.quantity}</li>
          <li><strong>Unit of Measure:</strong> {formData.unitOfMeasure}</li>
          <li><strong>Category:</strong> {formData.category}</li>
          <li><strong>Add Date:</strong> {formData.addDate}</li>
          <li><strong>Expiry Date:</strong> {formData.expiryDate}</li>
          <li><strong>Price:</strong> ${formData.price}</li>
        </ul>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Confirm Details
          </button>
        </div>
      </div>
    </div>
  );
}

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
  const [showModal, setShowModal] = useState(false); // To control modal visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if ((name === "quantity" || name === "price") && value < 0) {
      return; // Prevent negative values
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Trigger modal on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Show modal instead of directly submitting
  };

  // Confirm and proceed with actual submission
  const handleConfirm = async () => {
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
      setShowModal(false); // Close modal after submission
    }
  };

  const handleCancel = () => {
    setShowModal(false); // Close modal and return to form
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-200">
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
                <div className="relative">
                  <input
                    type="text"
                    name="stockName"
                    value={formData.stockName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 transition-all hover:bg-gray-50"
                    placeholder="Enter stock name"
                    required
                  />
                  <AiOutlineStock className="absolute top-3 left-3 text-gray-400" />
                </div>
              </div>

              {/* Quantity */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800">
                  Quantity
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 transition-all hover:bg-gray-50"
                    placeholder="Enter quantity"
                    required
                  />
                  <AiOutlineNumber className="absolute top-3 left-3 text-gray-400" />
                </div>
              </div>

              {/* Unit of Measure */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800">
                  Unit of Measure
                </label>
                <div className="relative">
                  <select
                    name="unitOfMeasure"
                    value={formData.unitOfMeasure}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 transition-all hover:bg-gray-50"
                    required
                  >
                    <option value="" disabled>
                      Select a unit of measure
                    </option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="cm">Centimeter (cm)</option>
                    <option value="liters">Liter (L)</option>
                    <option value="pieces">Pieces</option>
                    <option value="meters">Meter (m)</option>
                    <option value="ton">Ton (ton)</option>
                    <option value="pack">Pack</option>
                    <option value="pair">Pair</option>
                    <option value="barrel">Barrel</option>
                  </select>
                  <FaWeightHanging className="absolute top-3 left-3 text-gray-400" />
                </div>
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800">
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 transition-all hover:bg-gray-50"
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Cloths</option>
                    <option value="furniture">Plastic</option>
                    <option value="groceries">Groceries</option>
                    <option value="stationery">Glass</option>
                    <option value="Metal">Metal</option>
                  </select>
                  <AiOutlineTags className="absolute top-3 left-3 text-gray-400" />
                </div>
              </div>

              {/* Add Date */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800">
                  Add Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="addDate"
                    value={formData.addDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 transition-all hover:bg-gray-50"
                    required
                  />
                  <AiOutlineCalendar className="absolute top-3 left-3 text-gray-400" />
                </div>
              </div>

              {/* Expiry Date */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800">
                  Expiry Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 transition-all hover:bg-gray-50"
                    required
                  />
                  <AiOutlineCalendar className="absolute top-3 left-3 text-gray-400" />
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800">
                  Price ($)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 transition-all hover:bg-gray-50"
                    placeholder="Enter price"
                    required
                  />
                  <AiOutlineTag className="absolute top-3 left-3 text-gray-400" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full py-2 px-6 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  disabled={loading}
                >
                  {loading ? "Adding Stock..." : "Add Stock"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Render Modal */}
      {showModal && (
        <ConfirmationModal
          formData={formData}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

<footer className="bg-green-800 text-white text-center py-4">
        <div className="container mx-auto">
          <h3 className="text-lg font-bold mb-2">Join Us in Making a Difference!</h3>
          <p className="mb-2">Your journey towards a greener planet starts here.</p>
          <div className="flex justify-center mb-2">
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
