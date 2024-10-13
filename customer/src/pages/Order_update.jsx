import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Order_update() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order; // Get the order details passed from Product_orders

  // Set initial state for the order details
  const [productName, setProductName] = useState(order?.productName || '');
  const [quantity, setQuantity] = useState(order?.quantity || '');
  const [totalAmount, setTotalAmount] = useState(order?.totalAmount || '');
  const [recipientName, setRecipientName] = useState(order?.recipientDetails.name || '');
  const [address, setAddress] = useState(order?.recipientDetails.address || '');
  const [phoneNumber, setPhoneNumber] = useState(order?.recipientDetails.phoneNumber || '');
  const [paymentMethod, setPaymentMethod] = useState(order?.paymentMethod || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedOrder = {
      productName,
      quantity,
      totalAmount,
      recipientDetails: {
        name: recipientName,
        address,
        phoneNumber,
      },
      paymentMethod,
    };

    try {
      await axios.put(`/api/productorder/${order._id}`, updatedOrder); // Your API route to update the order
      alert('Order updated successfully!');
      navigate('/order_orders'); // Navigate back to the orders page
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Update Order</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Total Amount</label>
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Recipient Name</label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Payment Method</label>
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 px-4"
        >
          Update Order
        </button>
      </form>
    </div>
  );
}
