import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import { FaHome, FaPhone, FaMoneyBillWave, FaListAlt } from 'react-icons/fa'; // Import icons

export default function PackingOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const stock = location.state;

  // State to manage form inputs
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card"); // Default payment method
  const [quantity, setQuantity] = useState(1); // Default quantity set to 1

  if (!stock) {
    return <div className="text-center text-red-500">Stock data not found. Please go back and select an item.</div>;
  }

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/; // Regular expression for exactly 10 digits
    if (!phoneRegex.test(contactNumber)) {
      alert("Please enter a valid 10-digit phone number."); // Show error message
      return; // Prevent form submission
    }

    // Prepare the data to send
    const orderData = {
      name: stock.name, // Automatically include the stock name
      email: "customer@example.com", // Replace with actual customer email if available
      phone: contactNumber,
      address: deliveryAddress,
      serviceId: stock._id, // Use the stock ID or any relevant identifier
      paymentMethod: paymentMethod, // Include the payment method
      quantity: quantity, // Include the quantity
    };

    try {
      // Make a POST request to submit the order
      const response = await axios.post("/api/order/submit", orderData);
      console.log(response.data); // Handle success response
      alert("Order submitted successfully!"); // Show success message
      navigate(-1); // Navigate back or to another page
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Error submitting order. Please try again."); // Show error message
    }
  };

  return (
    <div className="container mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-teal-600 mb-6 text-center">Packing Order for {stock.name}</h1>
      <div className="mb-6 p-4 border-l-4 border-teal-500 bg-gray-100 rounded">
        <p className="text-gray-700 mb-1">
          <strong>Category:</strong> {stock.category}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Available Quantity:</strong> {stock.quantity} {stock.unitOfMeasure}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Added on:</strong> {new Date(stock.addDate).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Expiry Date:</strong> {new Date(stock.expiryDate).toLocaleDateString()}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Delivery Address Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 flex items-center">
            <FaHome className="mr-2 text-teal-600" />
            Delivery Address:
          </label>
          <input
            type="text"
            id="deliveryAddress"
            className="border border-gray-300 p-3 w-full rounded-lg transition duration-200 focus:outline-none focus:ring focus:ring-teal-400"
            placeholder="Enter your delivery address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            required
          />
        </div>
        {/* Contact Number Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 flex items-center">
            <FaPhone className="mr-2 text-teal-600" />
            Contact Number:
          </label>
          <input
            type="text"
            id="contactNumber"
            className="border border-gray-300 p-3 w-full rounded-lg transition duration-200 focus:outline-none focus:ring focus:ring-teal-400"
            placeholder="Enter your contact number"
            value={contactNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 10 && /^[0-9]*$/.test(value)) { // Allow only digits and limit to 10
                setContactNumber(value);
              }
            }}
            required
          />
        </div>
        {/* Payment Method Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 flex items-center">
            <FaMoneyBillWave className="mr-2 text-teal-600" />
            Payment Method:
          </label>
          <select
            id="paymentMethod"
            className="border border-gray-300 p-3 w-full rounded-lg transition duration-200 focus:outline-none focus:ring focus:ring-teal-400"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        {/* Quantity Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 flex items-center">
            <FaListAlt className="mr-2 text-teal-600" />
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            className="border border-gray-300 p-3 w-full rounded-lg transition duration-200 focus:outline-none focus:ring focus:ring-teal-400"
            min="1" // Set minimum to 1
            max={stock.quantity} // Limit the maximum to available stock
            value={quantity}
            onChange={(e) => {
              const value = Math.max(1, Math.min(stock.quantity, e.target.value)); // Ensure it's between 1 and available stock
              setQuantity(value);
            }}
            required
          />
        </div>
        {/* Submit and Back Buttons */}
        <div className="flex justify-between">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition duration-200"
            type="button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
}
