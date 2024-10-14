import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBox, FaUser, FaMapMarkerAlt, FaPhone, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';

export default function Order_update() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

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
      await axios.put(`/api/productorder/${order._id}`, updatedOrder);
      alert('Order updated successfully!');
      navigate('/order_orders');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Update Order</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md space-y-4">
        
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaBox className="text-gray-500 mr-2" />
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="flex-grow focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaMoneyBillWave className="text-gray-500 mr-2" />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="flex-grow focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaMoneyBillWave className="text-gray-500 mr-2" />
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder="Total Amount"
            className="flex-grow focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaUser className="text-gray-500 mr-2" />
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Recipient Name"
            className="flex-grow focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="flex-grow focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaPhone className="text-gray-500 mr-2" />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            className="flex-grow focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaCreditCard className="text-gray-500 mr-2" />
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            placeholder="Payment Method"
            className="flex-grow focus:outline-none"
            required
          />
        </div>


        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 px-4 w-full hover:bg-blue-600 transition duration-200"
        >
          Update Order
        </button>
      </form>
    </div>
  );
}
