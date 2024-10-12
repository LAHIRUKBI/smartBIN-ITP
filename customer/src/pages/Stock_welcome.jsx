import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBox, FaListAlt, FaClipboardList } from "react-icons/fa";

export default function Stock_welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-gray-900">
      {/* Main Container with subtle transparency */}
      <div className="max-w-3xl w-full bg-white bg-opacity-90 shadow-xl rounded-3xl overflow-hidden">
        <div className="p-10">
          <h1 className="text-5xl font-extrabold mb-6 text-center text-green-600">
            Welcome, Stock Manager!
          </h1>
          <p className="text-lg mb-8 text-center text-green-700">
            Manage your stock efficiently. Use the options below to create new
            stock or view existing stocks.
          </p>

          {/* Buttons Section */}
          <div className="space-y-4">
            <button
              className="w-full bg-green-500 text-white py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              onClick={() => navigate("/stockcreate")}
            >
              <FaBox className="inline-block mr-2" /> Create Stock
            </button>
            <button
              className="w-full bg-green-500 text-white py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              onClick={() => navigate("/stockview")}
            >
              <FaListAlt className="inline-block mr-2" /> View Stocks
            </button>
            {/* New View Orders Button */}
            <button
              className="w-full bg-green-500 text-white py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              onClick={() => navigate("/stock_orders")}
            >
              <FaClipboardList className="inline-block mr-2" /> View Orders
            </button>
          </div>

          {/* Contact Information Section */}
          <div className="mt-10 p-6 bg-white bg-opacity-90 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-4 text-center text-green-600">
              Need Assistance?
            </h2>
            <p className="text-md mb-4 text-center text-green-700">
              If you have any questions or need help with stock management, feel
              free to reach out to our support team. We're here to assist you!
            </p>
            <div className="text-center">
              <a
                href="mailto:support@smartbin.com"
                className="text-green-500 hover:text-green-600 transition duration-300 underline"
              >
                support@smartbin.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-green-800 text-white text-center py-6 w-screen">
        <div className="container mx-auto">
          <h3 className="text-lg font-bold mb-2">
            Join Us in Making a Difference!
          </h3>
          <p className="mb-4">
            Your journey towards a greener planet starts here.
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
