import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Product_welcome() {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/product_add');  // Navigates to Product_add page
  };

  const handleViewProduct = () => {
    navigate('/product_view');  // Navigates to Product_view page
  };

  const handleOtherAction = () => {
    navigate('/product_orders');  // Navigates to Product_orders page
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Welcome, Order Manager
        </h1>
        <p className="text-gray-700 mb-8">
          Manage products efficiently using the options below.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleAddProduct}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add New Product
          </button>
          
          <button
            onClick={handleViewProduct}
            className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition-colors"
          >
            View Product
          </button>
          
          <button
            onClick={handleOtherAction}
            className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition-colors"
          >
            product_orders
          </button>
        </div>
      </div>
    </div>
  );
}
