import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaRecycle, FaBoxOpen, FaClipboardList, FaShoppingCart } from 'react-icons/fa';

export default function CustomerWelcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 to-green-200">
      {/* Main Background Section */}
      <div className="flex items-center justify-center flex-grow relative p-8">
        {/* Main container with drop shadow and modern design */}
        <div className="relative z-10 bg-white shadow-2xl rounded-lg p-10 backdrop-filter backdrop-blur-lg transition-all duration-500 hover:shadow-3xl max-w-4xl w-full">
          {/* User Welcome Section */}
          <div className="flex flex-col items-center mb-6">
            <FaUserCircle
              className="text-green-600 text-8xl mb-4 cursor-pointer hover:text-green-800 transition-transform hover:scale-110"
              onClick={() => navigate('/customer_profile')}
            />
            <h1 className="text-4xl font-extrabold text-black mb-2">
              Welcome to <span className="text-green-500">SmartBIN</span>
            </h1>
            <p className="text-base text-gray-700 mb-4 max-w-xs text-center">
              Transform waste into valuable products and make a positive impact! 
              Explore our eco-friendly services designed just for you.
            </p>
          </div>

          {/* Services Section */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* View Orders */}
            <div
              className="flex flex-col items-center bg-gradient-to-r from-green-500 to-green-400 p-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform cursor-pointer border border-white"
              onClick={() => navigate('/customer_orders')}
            >
              <FaBoxOpen className="text-white text-4xl mb-2 animate-bounce" />
              <h2 className="text-lg font-semibold text-white mb-1">View Orders</h2>
              <p className="text-gray-100 text-xs text-center">
                Track your orders and view past services.
              </p>
            </div>

            {/* Request Service */}
            <div
              className="flex flex-col items-center bg-gradient-to-r from-pink-500 to-pink-400 p-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform cursor-pointer border border-white"
              onClick={() => navigate('/customer_request')}
            >
              <FaRecycle className="text-white text-4xl mb-2 animate-bounce" />
              <h2 className="text-lg font-semibold text-white mb-1">Request Service</h2>
              <p className="text-gray-100 text-xs text-center">
                Submit a request for waste collection or recycling.
              </p>
            </div>

            {/* View Stock Order */}
            <div
              className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-blue-400 p-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform cursor-pointer border border-white"
              onClick={() => navigate('/customer_stocks')}
            >
              <FaClipboardList className="text-white text-4xl mb-2 animate-bounce" />
              <h2 className="text-lg font-semibold text-white mb-1">View Stock Order</h2>
              <p className="text-gray-100 text-xs text-center">
                Check the current stock and order status.
              </p>
            </div>

            {/* Order Product */}
            <div
              className="flex flex-col items-center bg-gradient-to-r from-purple-500 to-purple-400 p-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform cursor-pointer border border-white"
              onClick={() => navigate('/customer_Product')}
            >
              <FaShoppingCart className="text-white text-4xl mb-2 animate-bounce" />
              <h2 className="text-lg font-semibold text-white mb-1">Order Products</h2>
              <p className="text-gray-100 text-xs text-center">
                Browse and order products available for purchase.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-6 text-center">
            <p className="text-md text-gray-800 font-light">
              Start managing your waste responsibly and help make the world a cleaner place!
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-green-900 text-white text-center py-6">
        <div className="container mx-auto">
          <h3 className="text-lg font-bold mb-2">Join Us in Making a Difference!</h3>
          <p className="mb-4">Your journey towards a greener planet starts here.</p>
          <div className="flex justify-center mb-4 space-x-4">
            <a href="https://facebook.com" className="text-gray-300 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="text-gray-300 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" className="text-gray-300 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" className="text-gray-300 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
