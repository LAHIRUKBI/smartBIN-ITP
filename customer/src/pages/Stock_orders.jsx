import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StockOrders() {
    const [stockOrders, setStockOrders] = useState([]);
    const [allocatedStocks, setAllocatedStocks] = useState({});
    const [statuses, setStatuses] = useState({});
    const [currentDate] = useState(new Date().toISOString().split('T')[0]);

    // Fetch stock order details from local storage
    useEffect(() => {
        const storedStockOrders = JSON.parse(localStorage.getItem('stockOrders')) || [];
        setStockOrders(storedStockOrders);
        const storedStatuses = JSON.parse(localStorage.getItem('statuses')) || {};
        setStatuses(storedStatuses); // Retrieve existing statuses from local storage
    }, []);

    const handleAllocatedChange = (index, value) => {
        setAllocatedStocks({ ...allocatedStocks, [index]: value });
    };

    const sendOrder = async (order, allocatedAmount, index) => {
        // Convert allocated amount to a number for comparison
        const allocatedAmountNumber = parseInt(allocatedAmount, 10);

        // Check if the allocated amount is valid and matches the required quantity
        if (!allocatedAmount || isNaN(allocatedAmountNumber) || allocatedAmountNumber !== order.quantity) {
            alert(`Please enter a valid allocated amount equal to the required quantity of ${order.quantity}.`);
            return;
        }

        const sentOrder = {
            name: order.name,
            allocatedAmount: allocatedAmountNumber,
            date: currentDate,
            address: order.address, // Include address
            phone: order.phone,     // Include phone
        };

        try {
            await axios.post('/api/order/send', sentOrder);
            alert(`Order for ${order.name} with allocated amount of ${allocatedAmount} is sent and saved.`);
            setAllocatedStocks((prev) => ({ ...prev, [index]: '' }));
        } catch (error) {
            console.error("Error saving the order", error);
            alert("Failed to save the order. Please try again.");
        }
    };

    const clearOrder = (index) => {
        const updatedOrders = [...stockOrders];
        updatedOrders.splice(index, 1);
        localStorage.setItem('stockOrders', JSON.stringify(updatedOrders));
        setStockOrders(updatedOrders);
        setAllocatedStocks((prev) => {
            const updatedStocks = { ...prev };
            delete updatedStocks[index];
            return updatedStocks;
        });
        alert('Stock order cleared successfully.');
    };

    const updateStatus = (index) => {
        setStatuses((prevStatuses) => {
            const currentStatus = prevStatuses[index] || 'Processing';
            const nextStatus = currentStatus === 'Processing' ? 'Approved' : currentStatus === 'Approved' ? 'Rejected' : 'Processing';
            const updatedStatuses = { ...prevStatuses, [index]: nextStatus };
            localStorage.setItem('statuses', JSON.stringify(updatedStatuses)); // Save updated statuses to local storage
            return updatedStatuses;
        });
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Stock Orders</h1>

            {stockOrders.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {stockOrders.map((order, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-4 border border-gray-200 hover:shadow-xl transition-shadow duration-200">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order Details {index + 1}</h2>
                            <p className="text-gray-600 mb-1"><strong>List Name:</strong> {order.name}</p>
                            <p className="text-gray-600 mb-1"><strong>Required Quantity:</strong> {order.quantity}</p>
                            <p className="text-gray-600 mb-1"><strong>Address:</strong> {order.address}</p>
                            <p className="text-gray-600 mb-1"><strong>Phone Number:</strong> {order.phone}</p>

                            <input
                                type="number"
                                placeholder="Enter allocated stock"
                                value={allocatedStocks[index] || ''}
                                onChange={(e) => handleAllocatedChange(index, e.target.value)}
                                className="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:outline-none focus:border-blue-500 transition duration-200"
                            />

                            <p className="text-gray-700 mb-2"><strong>Status:</strong> {statuses[index] || 'Processing'}</p>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => sendOrder(order, allocatedStocks[index], index)}
                                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200 shadow-md"
                                >
                                    Send Order
                                </button>

                                <button
                                    onClick={() => clearOrder(index)}
                                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200 shadow-md"
                                >
                                    Clear Order
                                </button>

                                <button
                                    onClick={() => updateStatus(index)}
                                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
                                >
                                    Change Status
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg text-gray-600">No stock orders available</p>
            )}
        </div>
    );
}
