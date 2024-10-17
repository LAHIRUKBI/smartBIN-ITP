import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBox, FaListAlt, FaClipboardList } from "react-icons/fa";

export default function Stock_welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 bg-gradient-to-r from-blue-50 via-green-100 to-green-200 text-gray-900">
      {/* Main Container with subtle transparency */}
      <div className="max-w-md w-full bg-white bg-opacity-90 shadow-2xl rounded-3xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-extrabold mb-4 text-center text-green-600">
            Welcome, Stock Manager
          </h1>
          <p className="text-md mb-6 text-center text-green-700">
            Manage your stock efficiently. Use the options below to create new
            stock or view existing stocks.
          </p>

          {/* Buttons Section */}
          <div className="space-y-4">
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              onClick={() => navigate("/stockcreate")}
            >
              <FaBox className="inline-block mr-2" /> Create Stock
            </button>
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              onClick={() => navigate("/stockview")}
            >
              <FaListAlt className="inline-block mr-2" /> View Stocks
            </button>
            {/* New View Orders Button */}
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              onClick={() => navigate("/stock_orders")}
            >
              <FaClipboardList className="inline-block mr-2" /> View Orders
            </button>
          </div>

          {/* Contact Information Section */}
          <div className="mt-8 p-4 bg-white bg-opacity-90 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2 text-center text-blue-600">
              Need Assistance?
            </h2>
            <p className="text-sm mb-4 text-center text-blue-700">
              If you have any questions or need help with stock management, feel
              free to reach out to our support team. We're here to assist you!
            </p>
            <div className="text-center">
              <a
                href="mailto:support@smartbin.com"
                className="text-blue-500 hover:text-blue-600 transition duration-300 underline"
              >
                support@smartbin.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-green-800 text-white text-center py-4 w-screen">
        <div className="container mx-auto">
          <h3 className="text-md font-bold mb-1">
            Join Us in Making a Difference!
          </h3>
          <p className="mb-2">
            Your journey towards a greener planet starts here.
          </p>
          <p className="text-xs">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
