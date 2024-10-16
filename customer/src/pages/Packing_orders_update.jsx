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

  const [errors, setErrors] = useState({}); // For storing validation errors

  // Update the formData state on input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation function to check for errors
  const validateForm = () => {
    const newErrors = {};

    // Check if required fields are filled
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.serviceId.trim()) newErrors.serviceId = 'Service ID is required';
    if (!formData.paymentMethod.trim()) newErrors.paymentMethod = 'Payment method is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';

    // Email validation (basic format)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone number validation (only digits, length 10-15)
    const phonePattern = /^[0-9]{10,15}$/;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10-15 digits long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Function to submit the updated order details
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

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
          {errors.name && <p className="text-red-500">{errors.name}</p>}
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
          {errors.email && <p className="text-red-500">{errors.email}</p>}
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
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
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
          {errors.address && <p className="text-red-500">{errors.address}</p>}
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
          {errors.serviceId && <p className="text-red-500">{errors.serviceId}</p>}
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
          {errors.paymentMethod && <p className="text-red-500">{errors.paymentMethod}</p>}
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
          {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
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
