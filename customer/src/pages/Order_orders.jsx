import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Modal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">{message}</h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Product_orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState({});
  const [replies, setReplies] = useState({});
  const [timers, setTimers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [modalAction, setModalAction] = useState(null);
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

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/productorder/${currentOrderId}`);
      setOrders(orders.filter((order) => order._id !== currentOrderId));
      setIsModalOpen(false);
      console.log(`Order ${currentOrderId} deleted successfully`);
    } catch (error) {
      console.error(
        `Error deleting order ${currentOrderId}:`,
        error.response ? error.response.data : error
      );
    }
  };

  const handleUpdate = () => {
    const orderToUpdate = orders.find((order) => order._id === currentOrderId);
    navigate(`/order_update/${currentOrderId}`, { state: { order: orderToUpdate } });
    setIsModalOpen(false);
  };

  const openDeleteModal = (orderId) => {
    setCurrentOrderId(orderId);
    setModalMessage("Are you sure you want to delete this order?");
    setModalAction("delete");
    setIsModalOpen(true);
  };

  const openUpdateModal = (orderId) => {
    setCurrentOrderId(orderId);
    setModalMessage("Are you sure you want to update this order?");
    setModalAction("update");
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    if (modalAction === "delete") {
      handleDelete();
    } else if (modalAction === "update") {
      handleUpdate();
    }
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

  // Updated filteredOrders logic to filter by productName and paymentMethod
  const filteredOrders = orders.filter((order) =>
    [order.productName, order.paymentMethod]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        message={modalMessage}
      />

      <div className="mb-4 text-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-1/2"
          placeholder="Search by product name or payment method..."
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
              {/* Order details */}
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
              <p className="text-gray-700 mb-2">
                <strong>Phone Number:</strong>{" "}
                {order.recipientDetails.phoneNumber}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Order Status:</strong> {order.orderStatus}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Time Left:</strong> {formatTimeLeft(timers[order._id])}
              </p>

              <div className="flex flex-col space-y-4 mt-4">
                <textarea
                  value={messages[order._id] || ""}
                  onChange={(e) =>
                    setMessages((prev) => ({
                      ...prev,
                      [order._id]: e.target.value,
                    }))
                  }
                  placeholder="Enter your message here..."
                  className="border rounded-lg p-2 w-full"
                ></textarea>

                <button
                  onClick={() => {
                    localStorage.setItem(
                      `message_${order._id}`,
                      messages[order._id] || ""
                    );
                    alert("Message saved successfully!");
                  }}
                  className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-200 w-full"
                >
                  Send Reply
                </button>

                <button
                  onClick={() => openUpdateModal(order._id)}
                  className="bg-yellow-500 text-white rounded-lg py-2 px-4 hover:bg-yellow-600 transition duration-200 w-full"
                >
                  Update Order
                </button>

                <button
                  onClick={() => generatePDF(order)}
                  className="bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 transition duration-200 w-full flex items-center justify-center"
                >
                  <FaDownload className="mr-2" />
                  Download Invoice
                </button>

                <button
                  onClick={() => openDeleteModal(order._id)}
                  className="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 transition duration-200 w-full"
                >
                  Delete Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
