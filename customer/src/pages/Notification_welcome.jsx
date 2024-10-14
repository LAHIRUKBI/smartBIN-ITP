import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Notification_welcome() {
  const navigate = useNavigate();

  const handleViewComplaints = () => {
    navigate('/allComplaint');
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome to Notification Manager!
        </h1>
        <p className="text-gray-700 mb-6">
          Stay up to date with all your latest notifications and manage them
          efficiently. Let’s get started!
        </p>
        <div className="space-y-4">
          
          <button 
            className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition-all"
            onClick={handleViewComplaints}
          >
            View All Complaints
          </button>
        </div>
      </div>
    </div>
  );
}
