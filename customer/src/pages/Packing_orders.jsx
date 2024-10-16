import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Packing_orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState({});
  const [replies, setReplies] = useState({});
  const navigate = useNavigate();

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

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`/api/order/delete/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      setError('Error deleting order');
    }
  };

  const sendMessage = (orderId) => {
    const orderMessage = messages[orderId] || '';
    localStorage.setItem(`message_${orderId}`, orderMessage);
    setMessages({ ...messages, [orderId]: '' });
  };

  const handleUpdateOrder = (order) => {
    navigate('/packing_orders_update', { state: { order } });
  };

  // Generate PDF for all orders
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Packing Orders Report', 14, 20);

    const tableColumn = [
      "Name", "Email", "Phone", "Address", 
      "Service ID", "Payment Method", "Quantity", 
      "Submitted At"
    ];

    const tableRows = orders.map(order => [
      order.name || 'N/A',
      order.email || 'N/A',
      order.phone || 'N/A',
      order.address || 'N/A',
      order.serviceId || 'N/A',
      order.paymentMethod || 'N/A',
      order.quantity || 'N/A',
      new Date(order.submittedAt).toLocaleDateString(),
    ]);

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 30 });
    doc.save('packing_orders_report.pdf');
  };

  // Function to generate individual packing order report
  const generateIndividualReport = (order) => {
    const doc = new jsPDF();
    doc.text(`Packing Order Report - ${order._id}`, 20, 10);
    doc.autoTable({
      head: [["Field", "Details"]],
      body: [
        ["Order ID", order._id],
        ["Name", order.name],
        ["Email", order.email],
        ["Phone", order.phone],
        ["Address", order.address],
        ["Service ID", order.serviceId],
        ["Payment Method", order.paymentMethod],
        ["Quantity", order.quantity],
        ["Submitted At", new Date(order.submittedAt).toLocaleString()],
      ],
    });
    doc.save(`packing_order_report_${order._id}.pdf`);
  };

  const sendToStockManager = (order) => {
    const storedStockOrders = JSON.parse(localStorage.getItem('stockOrders')) || [];
    storedStockOrders.push(order);
    localStorage.setItem('stockOrders', JSON.stringify(storedStockOrders));
    alert(`Order for ${order.name} has been sent to the stock manager.`);
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Packing Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No orders available</p>
      ) : (
        <>
          <button onClick={generatePDF} className="mb-4 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-200">
            Generate Report PDF
          </button>
          
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

                {/* Message Box for Each Order */}
                <textarea
                  value={messages[order._id] || ''}
                  onChange={(e) => setMessages({ ...messages, [order._id]: e.target.value })}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Type your message for this order..."
                />
                <button onClick={() => sendMessage(order._id)} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">
                  Send Message
                </button>

                {/* Display Message from Stock Manager */}
                {messages[order._id] && (
                  <p className="text-gray-600 mt-2">Sent Message: {messages[order._id]}</p>
                )}

                {/* Display Reply from Stock Manager */}
                {replies[order._id] && (
                  <p className="text-green-600 mt-2">Stock Manager Reply: {replies[order._id]}</p>
                )}

                <div className="mt-4 space-y-2">
                  <button onClick={() => handleUpdateOrder(order)} className="w-full bg-yellow-500 text-white py-2 rounded-full hover:bg-yellow-600 transition duration-200">
                    Update
                  </button>
                  <button onClick={() => deleteOrder(order._id)} className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600 transition duration-200">
                    Delete
                  </button>
                  <button onClick={() => generateIndividualReport(order)} className="w-full bg-purple-500 text-white py-2 rounded-full hover:bg-purple-600 transition duration-200">
                    Generate Individual Report
                  </button>
                  <button onClick={() => sendToStockManager(order)} className="w-full bg-indigo-500 text-white py-2 rounded-full hover:bg-indigo-600 transition duration-200">
                    Send to Stock Manager
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
