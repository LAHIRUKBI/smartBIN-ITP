import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaInfoCircle, FaCheckCircle } from 'react-icons/fa'; // Importing icons

export default function Customer_requestUpdate() {
  const { id } = useParams();
  const [request, setRequest] = useState({});
  const [errors, setErrors] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false); // New state for success message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(`/api/requestservice/servicerequests/${id}`);
        setRequest(response.data);
      } catch (error) {
        console.error('Error fetching request:', error);
      }
    };
    fetchRequest();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for phone input to only allow digits
    if (name === 'phone') {
      const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      setRequest({ ...request, [name]: sanitizedValue });
    } else {
      setRequest({ ...request, [name]: value });
    }

    // Clear previous error for the field being changed
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate phone number
    if (!/^\d{10}$/.test(request.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Validate email
    if (!request.email.includes('@')) {
      newErrors.email = 'Email must contain an @ sign';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.put(`/api/requestservice/servicerequests/${id}`, request);
      setUpdateSuccess(true); // Set success state to true
      setTimeout(() => {
        setUpdateSuccess(false);
        navigate('/customer_orders'); // Redirect after timeout
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const containerStyle = "min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 py-10 flex justify-center items-center";
  const formContainerStyle = "bg-gray-100 bg-opacity-90 rounded-2xl shadow-lg border border-gray-300 max-w-md w-full p-6";

  return (
    <div className={containerStyle}>
      <div className={formContainerStyle}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-600 text-center">Update Service Request</h1>
          <p className="text-center text-gray-600 text-sm mt-1">Please update your request details below</p>
        </div>

        {!request.name ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <p className="text-gray-600 text-sm mt-3">Loading request details...</p>
          </div>
        ) : (
          <>
            {updateSuccess && (
              <div className="mb-4 text-center">
                <FaCheckCircle className="text-green-500 mx-auto text-4xl" />
                <p className="text-green-600 mt-2">Update completed successfully!</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-left text-gray-800 mb-1 text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <FaUser className="text-gray-400 mx-2" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={request.name || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white text-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 ease-in-out text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-left text-gray-800 mb-1 text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <FaEnvelope className="text-gray-400 mx-2" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={request.email || ''}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 bg-white text-gray-800 border-0 ${errors.email ? 'border-red-500' : ''} rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 ease-in-out text-sm`}
                    required
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-left text-gray-800 mb-1 text-sm font-medium" htmlFor="phone">
                  Phone
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <FaPhone className="text-gray-400 mx-2" />
                  <input
                    type="tel" // Changed to "tel"
                    id="phone"
                    name="phone"
                    value={request.phone || ''}
                    onChange={handleChange}
                    maxLength={10} // Limit to 10 digits
                    className={`w-full px-3 py-2 bg-white text-gray-800 border-0 ${errors.phone ? 'border-red-500' : ''} rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 ease-in-out text-sm`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-left text-gray-800 mb-1 text-sm font-medium" htmlFor="address">
                  Address
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <FaHome className="text-gray-400 mx-2" />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={request.address || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white text-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 ease-in-out text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-left text-gray-800 mb-1 text-sm font-medium" htmlFor="additionalInfo">
                  Additional Info
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <FaInfoCircle className="text-gray-400 mx-2" />
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={request.additionalInfo || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white text-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 ease-in-out text-sm"
                    rows="3"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300 ease-in-out"
              >
                Save Changes
              </button>

              <button
                type="button"
                className="mt-2 w-full py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
                onClick={() => navigate('/customer_orders')}
              >
                Back to Orders
              </button>
            </form>
          </>
        )}

        <div className="my-6">
          <div className="border-t border-gray-300"></div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-2">© 2024 SmartBIN. All rights reserved.</p>
      </div>



      
    </div>
  );
}
