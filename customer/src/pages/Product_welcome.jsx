import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEye } from 'react-icons/fa'; // Importing icons from react-icons

export default function Product_welcome() {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/product_add'); // Navigates to Product_add page
  };

  const handleViewProduct = () => {
    navigate('/product_view'); // Navigates to Product_view page
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50"> {/* Light gray background */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md text-center transition-all duration-300">
          <h1 className="text-4xl font-bold text-blue-800 mb-6 tracking-wide">
            Welcome, Order Manager
          </h1>
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">
            Manage your products efficiently with the options below. Click on the buttons to add or view products.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleAddProduct}
              className="w-full flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 text-white py-3 rounded-lg shadow-md hover:bg-gradient-to-l from-green-500 to-teal-600 transition-transform transform hover:scale-105 hover:shadow-lg font-semibold text-lg"
            >
              <FaPlus className="mr-2" />
              Add New Product
            </button>
            
            <button
              onClick={handleViewProduct}
              className="w-full flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 rounded-lg shadow-md hover:bg-gradient-to-l from-gray-800 to-gray-900 transition-transform transform hover:scale-105 hover:shadow-lg font-semibold text-lg"
            >
              <FaEye className="mr-2" />
              View Product
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-green-800 text-white text-center py-4 mt-auto">
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
