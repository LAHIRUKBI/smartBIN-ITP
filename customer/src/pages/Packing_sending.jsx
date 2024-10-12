import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Packing_sending({ setShippedOrders, shippedOrders }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState({});

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/order/orders');
        setOrders(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleShipOrder = async (orderId) => {
    const dataToSend = {
      orderId,
      driverName: orderData[orderId]?.driverName,
      vehicleType: orderData[orderId]?.vehicleType,
      vehicleNumber: orderData[orderId]?.vehicleNumber,
      paymentMade: orderData[orderId]?.paymentMade,
      paymentMine: orderData[orderId]?.paymentMine,
    };
  
    // Log data being sent for debugging
    console.log("Data to send:", dataToSend);
  
    try {
      const response = await axios.post('/api/ship', dataToSend);
      
      // Check if response status is 200 OK
      if (response.status === 200) {
        alert('Order shipped successfully!');
        setShippedOrders((prev) => [...prev, response.data]);
        setOrders(orders.filter(order => order._id !== orderId));
        setOrderData(prev => ({ ...prev, [orderId]: {} }));
  
        // Navigate to the Packing_shipped page after successful shipping
        navigate('/packing_shipped');
      } else {
        // Log error if the response status is not 200
        console.error('Error: Non-200 response:', response);
        alert('Failed to ship order. Please try again.');
      }
    } catch (err) {
      // Log the error for debugging purposes
      console.error('Error shipping order:', err);
  
      // Provide user feedback with a more detailed error message
      alert(`Failed to ship order. ${err.response?.data?.message || 'Please try again.'}`);
    }
  };
  

  const handleInputChange = (orderId, field, value) => {
    setOrderData(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value,
      },
    }));
  };

  if (loading) return <div className="text-center text-xl text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-600">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Packing Orders</h1>
      
      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No orders available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h2>
              <p className="text-gray-700 mb-2"><strong>List Name:</strong> {order.name}</p>
              <p className="text-gray-700 mb-2"><strong>Allocated Amount:</strong> {order.allocatedAmount}</p>
              <p className="text-gray-700 mb-2"><strong>Address:</strong> {order.address}</p>
              <p className="text-gray-700 mb-2"><strong>Phone:</strong> {order.phone}</p>
              <p className="text-gray-700 mb-4"><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>

              <div className="mb-4">
                <label className="block mb-2">Driver Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded" 
                  value={orderData[order._id]?.driverName || ''}
                  onChange={(e) => handleInputChange(order._id, 'driverName', e.target.value)} 
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Vehicle Type</label>
                <select 
                  className="w-full p-2 border rounded" 
                  value={orderData[order._id]?.vehicleType || ''}
                  onChange={(e) => handleInputChange(order._id, 'vehicleType', e.target.value)}
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="bike">Bike</option>
                  <option value="threewheel">Three-Wheel</option>
                  <option value="car">Car</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Vehicle Number</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded" 
                  value={orderData[order._id]?.vehicleNumber || ''}
                  onChange={(e) => handleInputChange(order._id, 'vehicleNumber', e.target.value)} 
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Payment Made?</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name={`payment-${order._id}`} 
                      value="yes" 
                      checked={orderData[order._id]?.paymentMade === true}
                      onChange={() => handleInputChange(order._id, 'paymentMade', true)}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name={`payment-${order._id}`} 
                      value="no" 
                      checked={orderData[order._id]?.paymentMade === false}
                      onChange={() => handleInputChange(order._id, 'paymentMade', false)}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              {orderData[order._id]?.paymentMade && (
                <div className="mb-4">
                  <label className="block mb-2">Payment Mine</label>
                  <select 
                    className="w-full p-2 border rounded" 
                    value={orderData[order._id]?.paymentMine || ''}
                    onChange={(e) => handleInputChange(order._id, 'paymentMine', e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="Card payment">Card payment</option>
                    <option value="Bank transfer">Bank transfer</option>
                    <option value="cash on delivery">cash on delivery</option>
                  </select>
                </div>
              )}

              <button
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                onClick={() => handleShipOrder(order._id)}
              >
                Ship Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
