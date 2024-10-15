import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaBox, FaTag, FaWeight, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { MdCategory, MdUpdate } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";

export default function StockUpdateList() {
  const { id } = useParams();
  const [stock, setStock] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(`/api/listing/get/${id}`);
        const stockData = response.data;

        // Format the date fields to YYYY-MM-DD
        stockData.addDate = stockData.addDate ? new Date(stockData.addDate).toISOString().split("T")[0] : "";
        stockData.expiryDate = stockData.expiryDate ? new Date(stockData.expiryDate).toISOString().split("T")[0] : "";

        setStock(stockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError("Failed to load stock data.");
        setLoading(false);
      }
    };

    fetchStock();
  }, [id]);

  const handleUpdate = async () => {
    // Validate fields before updating
    if (stock.quantity < 0 || stock.price < 0) {
      setValidationError("Quantity and Price cannot be negative.");
      return;
    }
    
    try {
      await axios.put(`/api/listing/update/${id}`, stock);
      navigate("/stockview"); // Ensure this path matches your routes
    } catch (error) {
      console.error("Error updating stock:", error.response.data);
      setError("Failed to update stock.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input fields
    if ((name === "quantity" || name === "price") && value < 0) {
      setValidationError("Quantity and Price cannot be negative.");
      return;
    }

    setValidationError(null); // Clear any previous validation error
    setStock({ ...stock, [name]: value });
  };

  const handleBack = () => {
    navigate("/StockView"); // Navigate back to the previous page
  };

  if (loading)
    return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-gray-200 via-white to-gray-300 p-6 flex items-center justify-center flex-col">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl flex flex-col items-center mb-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          <MdUpdate className="inline-block mr-2" />
          Update Stock
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          Modify the stock item details to keep your inventory updated.
        </p>
        <form className="space-y-6 w-full"> {/* Increased spacing here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Increased gap here */}
            {/* Basic Information */}
            <div className="border p-4 rounded-lg shadow-md bg-gray-50"> {/* Increased padding here */}
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                <FaBox className="inline-block mr-2" />
                Basic Info
              </h2>
              <div className="space-y-4"> {/* Increased spacing here */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    <FaTag className="inline-block mr-2" />
                    Stock Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={stock.name || ""}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-blue-500" // Increased padding
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    <FaWeight className="inline-block mr-2" />
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={stock.quantity || ""}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-blue-500" // Increased padding
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    <FaBox className="inline-block mr-2" />
                    Unit of Measure
                  </label>
                  <select
                    name="unitOfMeasure"
                    value={stock.unitOfMeasure || ""}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-blue-500" // Increased padding
                  >
                    <option value="" disabled>
                      Select a unit
                    </option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="liters">Liter (liters)</option>
                    <option value="ml">Milliliter (ml)</option>
                    <option value="units">Units</option>
                    <option value="boxes">Boxes</option>
                    <option value="packs">Packs</option>
                    <option value="pieces">Pieces</option>
                    <option value="meters">Meters (m)</option>
                    <option value="centimeters">Centimeters (cm)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="border p-4 rounded-lg shadow-md bg-gray-50"> {/* Increased padding here */}
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                <MdCategory className="inline-block mr-2" />
                Additional Details
              </h2>
              <div className="space-y-4"> {/* Increased spacing here */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    <MdCategory className="inline-block mr-2" />
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={stock.category || ""}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-blue-500" // Increased padding
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    <FaMoneyBillWave className="inline-block mr-2" />
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={stock.price || ""}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-blue-500" // Increased padding
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    <FaCalendarAlt className="inline-block mr-2" />
                    Add Date
                  </label>
                  <input
                    type="date"
                    name="addDate"
                    value={stock.addDate || ""} // Ensure value is in YYYY-MM-DD format
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-gray-200 text-gray-700 focus:outline-none" // Increased padding
                    readOnly // Making Add Date non-editable
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    <FaCalendarAlt className="inline-block mr-2" />
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={stock.expiryDate || ""} // Ensure value is in YYYY-MM-DD format
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-blue-500" // Increased padding
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Button Layout Changes */}
          <div className="flex flex-col justify-center items-center mt-6 space-y-4"> {/* Increased margin here */}
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full"
            >
              Update Stock
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-400 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 transition duration-300 w-full"
            >
              <IoArrowBackOutline className="inline-block mr-2" />
              Back
            </button>
            {validationError && <p className="text-red-600 text-sm">{validationError}</p>}
          </div>
        </form>
      </div>

      {/* Footer Section */}
      <footer className="bg-green-800 text-white py-4 w-full">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} SmartBIN. All Rights Reserved.
          </p>
          <p className="text-sm">
            <a href="/privacy" className="text-gray-400 hover:text-gray-200">Privacy Policy</a> | 
            <a href="/terms" className="text-gray-400 hover:text-gray-200"> Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
