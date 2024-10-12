import React from 'react';
import { Link } from 'react-router-dom';

export default function Packing_welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome, Packing and Shipping Manager!
      </h1>

      <p className="text-lg text-gray-600 mb-12 text-center">
        Manage the packing and shipping tasks efficiently. Below are your key actions for today:
      </p>

      <div className="space-y-4 w-full max-w-md">
        <Link to="/packing_orders" className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
          View All Orders
        </Link>

        <Link to="/packing_sending" className="block w-full text-center bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">
          Pending send orders
        </Link>

        <Link to="/packing_shipped" className="block w-full text-center bg-yellow-600 text-white font-bold py-3 rounded-lg hover:bg-yellow-700 transition">
          Shipped orders
        </Link>

      </div>
    </div>
  );
}
