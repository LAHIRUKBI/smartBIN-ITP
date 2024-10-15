import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaList, FaClipboardCheck } from 'react-icons/fa'; // Importing icons from react-icons

export default function Order_welcome() {
    const navigate = useNavigate();
  
    const handleOtherAction = () => {
      navigate('/order_orders'); // Navigates to Product_orders page
    };
  
    const handleViewConformOrder = () => {
      navigate('/order_conform'); // Navigates to View Conform Order page
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 flex items-center justify-center">
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md text-center transform transition-all duration-500 hover:shadow-2xl hover:scale-105">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-6 tracking-widest">
            Welcome, Order Manager
          </h1>
          <p className="text-gray-500 mb-8 text-lg">
            Manage products efficiently using the options below.
          </p>
  
          <div className="space-y-6">
            <button
              onClick={handleOtherAction}
              className="w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg shadow-md hover:bg-indigo-600 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <FaList className="mr-2" />
              View Product Orders
            </button>
  
            <button
              onClick={handleViewConformOrder}
              className="w-full flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <FaClipboardCheck className="mr-2" />
              View Conform Order
            </button>
          </div>
        </div>
      </div>
    );
}
