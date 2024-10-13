import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Product_orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState({});
  const [replies, setReplies] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/productorder'); // Your API route to get orders
        console.log('Fetched Orders:', response.data.orders);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error.response ? error.response.data : error);
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
    setReplies(prev => ({ ...prev, [orderId]: '' }));
    alert('Reply sent successfully!');
  };

  // Handle order deletion
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`/api/productorder/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
      console.log(`Order ${orderId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting order ${orderId}:`, error.response ? error.response.data : error);
    }
  };

  // Handle order update
  // Handle order update
const handleUpdate = (orderId) => {
  const orderToUpdate = orders.find(order => order._id === orderId);
  navigate(`/order_update/${orderId}`, { state: { order: orderToUpdate } });
};


  // Generate PDF for the order
  const generatePDF = async (order) => {
    const doc = new jsPDF();
    const orderDetails = `
      Product Name: ${order.productName}
      Product ID: ${order.productId?._id || order.productId}
      Quantity: ${order.quantity}
      Total Amount: $${order.totalAmount}
      Recipient Name: ${order.recipientDetails.name}
      Address: ${order.recipientDetails.address}
      Phone Number: ${order.recipientDetails.phoneNumber}
      Payment Method: ${order.paymentMethod}
    `;

    // Adding Order Details to PDF
    doc.text(orderDetails, 10, 10);
    doc.save(`Order_${order.productId?._id || order.productId}.pdf`);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Product Orders</h1>

      {/* Display error message if any */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No orders available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold text-gray-800">{order.productName}</h2>
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
                className="border border-gray-300 rounded-lg p-2 w-full mt-2"
                placeholder="Type your reply here..."
              />
              <button
                onClick={() => sendReply(order._id)}
                className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-2"
              >
                Send Reply
              </button>

              <button
                onClick={() => handleUpdate(order._id)}
                className="bg-yellow-500 text-white rounded-lg py-2 px-4 mt-2"
              >
                Update Order
              </button>

              <button
                onClick={() => handleDelete(order._id)}
                className="bg-red-500 text-white rounded-lg py-2 px-4 mt-2"
              >
                Delete Order
              </button>

              <button
                onClick={() => generatePDF(order)}
                className="bg-green-500 text-white rounded-lg py-2 px-4 mt-2"
              >
                <FaDownload className="inline mr-2" />
                Download PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
