import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Packing_orders_update() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the passed order data from location state
  const order = location.state?.order || {}; // Fallback to an empty object if no order is passed

  const [formData, setFormData] = useState({
    name: order.name || '',
    email: order.email || '',
    phone: order.phone || '',
    address: order.address || '',
    serviceId: order.serviceId || '',
    paymentMethod: order.paymentMethod || '',
    quantity: order.quantity || '',
  });

  // Update the formData state on input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to submit the updated order details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/order/update/${order._id}`, formData); // Send the update request to the backend
      alert('Order updated successfully');
      navigate('/packing_orders'); // Navigate back to the orders page after successful update
    } catch (error) {
      console.error('Error updating order', error);
      alert('Failed to update order');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Update Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Service ID</label>
          <input
            type="text"
            name="serviceId"
            value={formData.serviceId}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Payment Method</label>
          <input
            type="text"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
}
