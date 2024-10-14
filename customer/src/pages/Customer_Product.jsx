import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Customer_Product() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState({});
  const [replies, setReplies] = useState({});

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/productorder'); // Your API route to get orders
        console.log('Fetched Orders:', response.data.orders); // Log fetched orders
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders.');
      }
    };

    fetchOrders();
  }, []);

  // Fetch messages and replies from localStorage for each order
  useEffect(() => {
    orders.forEach(order => {
      const storedMessage = localStorage.getItem(`message_${order._id}`);
      if (storedMessage) {
        setMessages(prev => ({ ...prev, [order._id]: storedMessage }));
      }

      const replyMessage = localStorage.getItem(`reply_${order._id}`);
      if (replyMessage) {
        setReplies(prev => ({ ...prev, [order._id]: replyMessage }));
      }
    });
  }, [orders]);

  // Send reply message to localStorage
  const sendReply = (orderId) => {
    const replyMessage = replies[orderId] || '';
    localStorage.setItem(`reply_${orderId}`, replyMessage);
    setReplies(prev => ({ ...prev, [orderId]: '' })); // Clear the input after sending
    alert('Reply sent successfully!');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Customer Products</h1>

      {/* Display error message if any */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No products available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-bold text-gray-800">{order.productName}</h2>
              <p className="text-gray-700 mb-2"><strong>Product ID:</strong> {order.productId?._id || order.productId}</p>
              <p className="text-gray-700 mb-2"><strong>Quantity:</strong> {order.quantity}</p>
              <p className="text-gray-700 mb-2"><strong>Total Amount:</strong> ${order.totalAmount}</p>
              <p className="text-gray-700 mb-2"><strong>Recipient Name:</strong> {order.recipientDetails.name}</p>
              <p className="text-gray-700 mb-2"><strong>Address:</strong> {order.recipientDetails.address}</p>
              <p className="text-gray-700 mb-4"><strong>Phone Number:</strong> {order.recipientDetails.phoneNumber}</p>
              <p className="text-gray-700 mb-4"><strong>Payment Method:</strong> {order.paymentMethod}</p>

              {/* Displaying Message from Packing Orders */}
              {messages[order._id] && (
                <p className="text-blue-600 mt-2">Packing Orders Message: {messages[order._id]}</p>
              )}

              {/* Display the reply sent, if available */}
              {localStorage.getItem(`reply_${order._id}`) && (
                <p className="text-green-600 mt-2">Your Reply: {localStorage.getItem(`reply_${order._id}`)}</p>
              )}

              {/* Reply Box for Each Order */}
              <textarea
                value={replies[order._id] || ''}
                onChange={(e) => setReplies({ ...replies, [order._id]: e.target.value })}
                className="border rounded-lg p-2 w-full"
                placeholder="Type your reply..."
              />
              <button onClick={() => sendReply(order._id)} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">Send Reply</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
