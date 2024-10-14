import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Product_orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState({});
  const [replies, setReplies] = useState({});
  const [timers, setTimers] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/productorder");
        console.log("Fetched Orders:", response.data.orders);
        setOrders(response.data.orders);
      } catch (error) {
        console.error(
          "Error fetching orders:",
          error.response ? error.response.data : error
        );
        setError("Error fetching orders.");
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    orders.forEach((order) => {
      const storedMessage = localStorage.getItem(`message_${order._id}`);
      if (storedMessage) {
        setMessages((prev) => ({ ...prev, [order._id]: storedMessage }));
      }

      const replyMessage = localStorage.getItem(`reply_${order._id}`);
      if (replyMessage) {
        setReplies((prev) => ({ ...prev, [order._id]: replyMessage }));
      }

      const timeLeft = Math.max(
        0,
        432000000 - (Date.now() - new Date(order.createdAt).getTime())
      );
      if (timeLeft > 0) {
        setTimers((prev) => ({ ...prev, [order._id]: timeLeft }));
      }
    });
  }, [orders]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = { ...prevTimers };
        for (const orderId in newTimers) {
          if (newTimers[orderId] > 0) {
            newTimers[orderId] -= 1000;
          }
        }
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const sendReply = (orderId) => {
    const replyMessage = replies[orderId] || "";
    localStorage.setItem(`reply_${orderId}`, replyMessage);
    setReplies((prev) => ({ ...prev, [orderId]: "" }));
    alert("Reply sent successfully!");
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`/api/productorder/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
      console.log(`Order ${orderId} deleted successfully`);
    } catch (error) {
      console.error(
        `Error deleting order ${orderId}:`,
        error.response ? error.response.data : error
      );
    }
  };

  const handleUpdate = (orderId) => {
    const orderToUpdate = orders.find((order) => order._id === orderId);
    navigate(`/order_update/${orderId}`, { state: { order: orderToUpdate } });
  };

  const generatePDF = async (order) => {
    const doc = new jsPDF();
    const orderDetails = `Product Name: ${order.productName}
      Product ID: ${order.productId?._id || order.productId}
      Quantity: ${order.quantity}
      Total Amount: $${order.totalAmount}
      Recipient Name: ${order.recipientDetails.name}
      Address: ${order.recipientDetails.address}
      Phone Number: ${order.recipientDetails.phoneNumber}
      Payment Method: ${order.paymentMethod}
    `;

    doc.text(orderDetails, 10, 10);
    doc.save(`Order_${order.productId?._id || order.productId}.pdf`);
  };

  const formatTimeLeft = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // New functions for sending orders
  const sendOrderToProductManager = (orderId) => {
    console.log(`Order ${orderId} sent to Product Manager`);
    alert("Order sent to Product Manager!");
  };

  const sendOrder = (orderId) => {
    const orderToSend = orders.find((order) => order._id === orderId);
    if (orderToSend) {
      localStorage.setItem('sentOrder', JSON.stringify(orderToSend)); // Store order in local storage
      setOrders(orders.filter((order) => order._id !== orderId)); // Remove order from state
      console.log(`Order ${orderId} sent`);
      alert("Order sent!");
      navigate('/Order_conform'); // Navigate to Order_conform page
    }
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter(order =>
    order.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8 bg-gray-100">
       <p className="text-lg text-center text-gray-600 mb-4">
      Welcome to the Product Orders page! Here, you can view and manage all product orders placed by customers. You can respond to customer inquiries, update order details, and download invoices. Use the search feature to quickly find specific orders.
    </p>
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Product Orders
      </h1>
      <p className="text-lg text-center text-gray-600 mb-4">
        Total Orders: {orders.length}
      </p>


      {/* Navigation Buttons */}
      <div className="mb-4 text-center">
        <button
          onClick={() => navigate('/product_welcome')}
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-200 mx-2"
        >
          Go to Product Welcome
        </button>
        <button
          onClick={() => navigate('/order_conform')}
          className="bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 transition duration-200 mx-2"
        >
          Go to Order Confirmation
        </button>
      </div>


      

      {/* Search Bar */}
      <div className="mb-4 text-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-1/2"
          placeholder="Search by product name..."
        />
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {filteredOrders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No orders available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800">
                {order.productName}
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>Product ID:</strong>{" "}
                {order.productId?._id || order.productId}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Total Amount:</strong> ${order.totalAmount}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Recipient Name:</strong> {order.recipientDetails.name}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> {order.recipientDetails.address}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Phone Number:</strong>{" "}
                {order.recipientDetails.phoneNumber}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p className="text-red-600 font-bold mb-4">
                Time Remaining:
                <span
                  className={`px-2 py-1 rounded-lg ${
                    timers[order._id] > 0
                      ? "bg-red-100 border border-red-400"
                      : "bg-gray-300"
                  }`}
                >
                  {timers[order._id]
                    ? formatTimeLeft(timers[order._id])
                    : "Expired"}
                </span>
              </p>
              {messages[order._id] && (
                <p className="text-blue-600 mt-2">
                  Packing Orders Message: {messages[order._id]}
                </p>
              )}
              {localStorage.getItem(`reply_${order._id}`) && (
                <p className="text-green-600 mt-2">
                  Your Reply: {localStorage.getItem(`reply_${order._id}`)}
                </p>
              )}
              <textarea
                value={replies[order._id] || ""}
                onChange={(e) =>
                  setReplies((prev) => ({
                    ...prev,
                    [order._id]: e.target.value,
                  }))
                }
                placeholder="Type your reply here..."
                className="w-full h-20 border border-gray-300 rounded-lg p-2 mt-2 mb-4"
              />
              <button
                onClick={() => sendReply(order._id)}
                className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-200"
              >
                Send Reply
              </button>
              <div className="flex flex-col space-y-4 mt-4">
  <button
    onClick={() => generatePDF(order)}
    className="bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 transition duration-200 w-full"
  >
    <FaDownload /> Download Invoice
  </button>
  <button
    onClick={() => handleUpdate(order._id)}
    className="bg-yellow-500 text-white rounded-lg py-2 px-4 hover:bg-yellow-600 transition duration-200 w-full"
  >
    Update Order
  </button>
  <button
    onClick={() => handleDelete(order._id)}
    className="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 transition duration-200 w-full"
  >
    Delete Order
  </button>
  <button
    onClick={() => sendOrderToProductManager(order._id)}
    className="bg-purple-500 text-white rounded-lg py-2 px-4 hover:bg-purple-600 transition duration-200 w-full"
  >
    Send to packing Manager
  </button>
</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
