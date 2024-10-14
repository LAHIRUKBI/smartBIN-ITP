import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEye, FaList, FaClipboardCheck } from 'react-icons/fa'; // Importing icons from react-icons

export default function Product_welcome() {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/product_add'); // Navigates to Product_add page
  };

  const handleViewProduct = () => {
    navigate('/product_view'); // Navigates to Product_view page
  };

  const handleOtherAction = () => {
    navigate('/order_orders'); // Navigates to Product_orders page
  };

  const handleViewConformOrder = () => {
    navigate('/order_conform'); // Navigates to View Conform Order page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg text-center transform transition-all duration-500 hover:shadow-xl">

        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 tracking-wide">

          Welcome, Order Manager
        </h1>
        <p className="text-gray-600 mb-8">
          Manage products efficiently using the options below.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleAddProduct}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 transition-colors transform hover:scale-105"
          >
            <FaPlus className="mr-2" />
            Add New Product
          </button>
          
          <button
            onClick={handleViewProduct}
            className="w-full flex items-center justify-center bg-gray-600 text-white py-3 rounded-md shadow-md hover:bg-gray-700 transition-colors transform hover:scale-105"
          >
            <FaEye className="mr-2" />
            View Product
          </button>
          
          <button
            onClick={handleOtherAction}
            className="w-full flex items-center justify-center bg-gray-600 text-white py-3 rounded-md shadow-md hover:bg-gray-700 transition-colors transform hover:scale-105"
          >
            <FaList className="mr-2" />
            View Product Orders
          </button>

          <button
            onClick={handleViewConformOrder}
            className="w-full flex items-center justify-center bg-gray-600 text-white py-3 rounded-md shadow-md hover:bg-gray-700 transition-colors transform hover:scale-105"
          >
            <FaClipboardCheck className="mr-2" />

            View Conform Order

          </button>
        </div>
      </div>
    </div>
  );
}
