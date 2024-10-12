import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Packing_shipped() {
  const [shippedOrders, setShippedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShippedOrders = async () => {
      try {
        const response = await axios.get('/api/ship'); // Adjust the endpoint as needed
        setShippedOrders(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShippedOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`/api/ship/${orderId}`);
      setShippedOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
      alert('Order deleted successfully.');
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('Failed to delete order. Please try again.');
    }
  };

  if (loading) return <div className="text-center text-xl text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-600">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Shipped Orders</h1>

      {shippedOrders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No shipped orders available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shippedOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipped Order Details</h2>
              <p className="text-gray-700 mb-2"><strong>Driver Name:</strong> {order.driverName}</p>
              <p className="text-gray-700 mb-2"><strong>Vehicle Type:</strong> {order.vehicleType}</p>
              <p className="text-gray-700 mb-2"><strong>Vehicle Number:</strong> {order.vehicleNumber}</p>
              <p className="text-gray-700 mb-2"><strong>Payment Made:</strong> {order.paymentMade ? 'Yes' : 'No'}</p>
              {order.paymentMade && <p className="text-gray-700 mb-2"><strong>Payment Mine:</strong> {order.paymentMine}</p>}
              <p className="text-gray-700 mb-2"><strong>Order ID:</strong> {order.orderId}</p>
              <p className="text-gray-700 mb-4"><strong>Date Shipped:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

              <button
                className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                onClick={() => handleDelete(order._id)}
              >
                Delete Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
