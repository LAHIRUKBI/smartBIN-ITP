import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Vehicle_orders() {
  const [vehicleOrders, setVehicleOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleOrders = async () => {
      try {
        const response = await axios.get('/api/vehicleorders'); // Adjust the URL as needed
        setVehicleOrders(response.data); // Set the fetched data to state
      } catch (error) {
        setError("Error fetching vehicle orders"); // Set error if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchVehicleOrders(); // Call the function to fetch vehicle orders
  }, []);

  // Show loading state
  if (loading) return <div className="text-center py-5 text-xl font-semibold">Loading...</div>;
  // Show error message if there's an error
  if (error) return <div className="text-red-500 text-center py-5 text-xl font-semibold">{error}</div>;

  // Render the list of vehicle orders
  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Vehicle Orders</h1>
      <ul className="space-y-6">
        {vehicleOrders.map((order) => (
          <li
            key={order._id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{order.name}</h2>
            <div className="text-gray-700">
              <p>Email: <span className="text-gray-900">{order.email}</span></p>
              <p>Phone: <span className="text-gray-900">{order.phone}</span></p>
              <p>Address: <span className="text-gray-900">{order.address}</span></p>
              <p>Service ID: <span className="text-gray-900">{order.serviceId}</span></p>
              <p>Payment Method: <span className="text-gray-900">{order.paymentMethod}</span></p>
              <p>Submitted At: <span className="text-gray-900">{new Date(order.submittedAt).toLocaleString()}</span></p>
              <p>Additional Info: <span className="text-gray-900">{order.additionalInfo || 'N/A'}</span></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
