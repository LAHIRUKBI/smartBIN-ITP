import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js to auto-register the required components
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function Order_conform() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/productorder'); // Fetch orders from the API
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error.response ? error.response.data : error);
        setError('Error fetching orders.');
      }
    };

    fetchOrders();
  }, []);

  // Prepare data for the product chart
  const orderData = {
    labels: orders.map(order => order.productName), // Get product names
    datasets: [
      {
        label: 'Number of Orders',
        data: orders.map(order => order.quantity), // Get quantities for each product
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the payment method chart
  const paymentMethods = orders.reduce((acc, order) => {
    acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1;
    return acc;
  }, {});

  const paymentMethodData = {
    labels: Object.keys(paymentMethods), // Payment method names
    datasets: [
      {
        label: 'Number of Orders by Payment Method',
        data: Object.values(paymentMethods), // Number of orders for each payment method
        backgroundColor: 'rgba(153, 102, 255, 0.6)', // Bar color
        borderColor: 'rgba(153, 102, 255, 1)', // Bar border color
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Order Products Chart',
      },
    },
  };

  const paymentOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Payment Method Distribution',
      },
    },
  };

  // Function to generate PDF
  const generatePDF = () => {
    const input = document.getElementById('chartContainer'); // Reference to the chart container
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190; // Set width for PDF
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 10; // Starting position on the PDF
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('Order_Products_Report.pdf'); // Save PDF
    });
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Order Products
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <div className="bg-white rounded-xl shadow-lg p-6" id="chartContainer">
        {orders.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No orders available</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Orders by Product</h2>
            <Bar data={orderData} options={options} />

            <h2 className="text-2xl font-bold mt-10 mb-4 text-center">Orders by Payment Method</h2>
            <Bar data={paymentMethodData} options={paymentOptions} />
          </>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-200"
        >
          Generate PDF Report
        </button>
      </div>
    </div>
  );
}
