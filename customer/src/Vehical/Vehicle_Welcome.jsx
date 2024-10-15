import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTruck, FaEye, FaRoute, FaClipboardList } from 'react-icons/fa';

export default function Vehicle_Welcome() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-gradient-to-r from-white to-gray-200 overflow-hidden">
      {/* Background gradient overlay (white shades) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 opacity-90"></div>

      {/* Main content */}
      <div className="z-10 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-lg">
          Welcome, Vehicle Manager
        </h1>
        <p className="text-lg text-gray-600 mb-8 drop-shadow-md">
          Manage all vehicle operations with ease and efficiencys
        </p>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {/* Add New Vehicle Button */}
          <button
            className="bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 ease-in-out flex items-center justify-center space-x-3"
            onClick={() => navigate('/vehicalfrom')}
          >
            <FaTruck className="text-2xl" />
            <span>Add New Vehicle</span>
          </button>

          {/* View All Vehicles Button */}
          <button
            className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-700 hover:scale-105 transform transition-all duration-300 ease-in-out flex items-center justify-center space-x-3"
            onClick={() => navigate('/vehicles')}
          >
            <FaEye className="text-2xl" />
            <span>View All Vehicles</span>
          </button>

          {/* Manage Routes Button */}
          <button
            className="bg-purple-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-purple-700 hover:scale-105 transform transition-all duration-300 ease-in-out flex items-center justify-center space-x-3"
            onClick={() => navigate('/route')}
          >
            <FaRoute className="text-2xl" />
            <span>Manage Routes</span>
          </button>

          {/* Vehicle Orders Button */}
          <button
            className="bg-yellow-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-yellow-600 hover:scale-105 transform transition-all duration-300 ease-in-out flex items-center justify-center space-x-3"
            onClick={() => navigate('/vehicle_orders')}
          >
            <FaClipboardList className="text-2xl" />
            <span>View Vehicle Orders</span>
          </button>
        </div>
      </div>
    </div>
  );
}
