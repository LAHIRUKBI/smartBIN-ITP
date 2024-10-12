import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Customer_Stocks() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState({});
  const [replies, setReplies] = useState({});

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/order/all');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Fetch messages and replies from localStorage
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

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Customer Stocks</h1>

      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No orders available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-bold text-gray-800">{order.name}</h2>
              <p className="text-gray-700 mb-2"><strong>Email:</strong> {order.email}</p>
              <p className="text-gray-700 mb-2"><strong>Phone:</strong> {order.phone}</p>
              <p className="text-gray-700 mb-2"><strong>Address:</strong> {order.address}</p>
              <p className="text-gray-700 mb-2"><strong>Service ID:</strong> {order.serviceId}</p>
              <p className="text-gray-700 mb-2"><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p className="text-gray-700 mb-2"><strong>Quantity:</strong> {order.quantity}</p>
              <p className="text-gray-700 mb-4"><strong>Submitted At:</strong> {new Date(order.submittedAt).toLocaleString()}</p>

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
