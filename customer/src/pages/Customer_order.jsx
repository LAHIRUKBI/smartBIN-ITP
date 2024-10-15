import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";
import CountdownTimer from "../components/CountdownTimer";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Customer_order() {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [requestTimesUp, setRequestTimesUp] = useState({}); // New state to track timeouts
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const response = await axios.get("/api/requestservice/servicerequests");
        setServiceRequests(response.data);
      } catch (error) {
        console.error("Error fetching service requests:", error);
      }
    };

    fetchServiceRequests();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/customer_requestUpdate/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/requestservice/servicerequests/${id}`);
      setServiceRequests(
        serviceRequests.filter((request) => request._id !== id)
      );
      setRequestTimesUp((prev) => ({ ...prev, [id]: true })); // Mark time as up after deletion
    } catch (error) {
      console.error("Error deleting service request:", error);
    }
  };

  const handleDownloadReceipt = (request) => {
    const doc = new jsPDF();

    // Company details
    const companyName = "smartBIN";
    const currentDate = new Date().toLocaleDateString();
    const receiptNumber = `Receipt #: ${request._id}`;

    // Add company name in large green font, centered
    doc.setFontSize(30);
    doc.setTextColor(34, 139, 34); // Dark green color
    const nameWidth = doc.getTextWidth(companyName);
    doc.text(companyName, (doc.internal.pageSize.width - nameWidth) / 2, 22); // Centered

    // Add receipt number and current date
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(receiptNumber, 14, 40);
    doc.text(`Date: ${currentDate}`, 14, 48);

    // Prepare data for the table (Customer details)
    const tableData = [
      { title: "Name", value: request.name },
      { title: "Email", value: request.email },
      { title: "Phone", value: request.phone },
      { title: "Address", value: request.address },
      { title: "Additional Info", value: request.additionalInfo || "N/A" },
      { title: "Service ID", value: request.serviceId },
      { title: "Payment Method", value: request.paymentMethod },
      {
        title: "Submitted At",
        value: new Date(request.submittedAt).toLocaleString(),
      },
    ];

    // Add a horizontal line before the table
    doc.setDrawColor(0, 0, 0);
    doc.line(14, 50, doc.internal.pageSize.width - 14, 50); // Horizontal line

    // Use autotable to add the table
    doc.autoTable({
      head: [["Field", "Value"]],
      body: tableData.map((item) => [item.title, item.value]),
      startY: 55, // Start the table below the receipt details
      theme: "striped",
      styles: {
        fontSize: 12,
        cellPadding: 6,
        halign: "left",
      },
      headStyles: {
        fillColor: [22, 160, 133], // Header background color (teal)
        textColor: [255, 255, 255], // Header text color (white)
        fontSize: 14,
        lineWidth: 0.5,
        strokeColor: [0, 0, 0], // Border color for header cells
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // White background for body cells
        textColor: [0, 0, 0], // Black text color
        lineWidth: 0.2,
        strokeColor: [22, 160, 133], // Border color for body cells
      },
      margin: { top: 10 },
    });

    // Add a thank-you note at the bottom
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(12);
    doc.text(
      "Thank you for choosing smartBIN! Your contribution helps us create a cleaner environment.",
      14,
      pageHeight - 50
    );

    // Add company contact information at the bottom
    const contactInfo = [
      "Contact Us: 123-456-7890 | support@smartbin.com",
      "Fax: 123-456-7891 | Follow us on social media: @smartbin",
    ];

    doc.setFontSize(10);
    contactInfo.forEach((info, index) => {
      const textWidth = doc.getTextWidth(info);
      doc.text(
        info,
        (doc.internal.pageSize.width - textWidth) / 2,
        pageHeight - 40 + index * 10
      );
    });

    // Save the PDF
    doc.save(`receipt-${request._id}.pdf`);
  };

  const filteredRequests = serviceRequests.filter((request) =>
    request.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-gray-900 flex flex-col">
      <div className="flex-grow py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-teal-600">
            Your Orders
          </h1>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <div className="mb-6 flex justify-center gap-4">
            <button
              onClick={() => navigate("/customer_request")}
              className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded transition-colors duration-300 shadow-md"
            >
              Go to Request Form
            </button>
            <button
              onClick={() => navigate("/customer_welcome")}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded transition-colors duration-300 shadow-md"
            >
              Go to Stock Welcome
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => {
                const startTime = new Date(request.submittedAt);
                const endTime = new Date(
                  startTime.getTime() + 24 * 60 * 60 * 1000
                );

                // Determine if time is up
                const isTimeUp =
                  requestTimesUp[request._id] || new Date() > endTime;

                return (
                  <div
                    key={request._id}
                    className="bg-gray-100 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105 p-6 flex flex-col"
                  >
                    <CountdownTimer
                      startTime={endTime.toISOString()}
                      onTimeUp={() =>
                        setRequestTimesUp((prev) => ({
                          ...prev,
                          [request._id]: true,
                        }))
                      }
                    />

                    <div className="bg-white p-4 rounded-lg mb-4 shadow-md">
                      <h2 className="text-2xl font-bold text-teal-600 mb-4">
                        {request.name}
                      </h2>
                      <div className="border-t border-gray-300 pt-4">
                        <p className="text-gray-700 mb-2">
                          <strong>Email:</strong> {request.email}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Phone:</strong> {request.phone}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Address:</strong> {request.address}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Additional Info:</strong>{" "}
                          {request.additionalInfo || "N/A"}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Service ID:</strong> {request.serviceId}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Payment Method:</strong>{" "}
                          {request.paymentMethod}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Submitted At:</strong>{" "}
                          {new Date(request.submittedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownloadReceipt(request)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors duration-300"
                      >
                        <FaFilePdf className="inline-block mr-1" /> Download
                        Receipt
                      </button>
                      <button
                        onClick={() => handleUpdate(request._id)}
                        disabled={isTimeUp} // Disable if time is up
                        className={`w-full flex items-center bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition-colors duration-300 ${
                          isTimeUp ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <FaEdit className="inline-block mr-1" /> Update
                      </button>
                      <button
                        onClick={() => handleDelete(request._id)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors duration-300"
                      >
                        <FaTrash className="inline-block mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center col-span-1">
                <h2 className="text-xl text-gray-500">
                  No service requests found.
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="bg-green-800 text-white text-center py-4">
                <div className="container mx-auto">
                    <h3 className="text-lg font-bold mb-2">Join Us in Making a Difference!</h3>
                    <p className="mb-2">Your journey towards a greener planet starts here.</p>
                    <div className="flex justify-center mb-2">
                        <a href="https://facebook.com" className="mx-2 text-gray-300 hover:text-white">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" className="mx-2 text-gray-300 hover:text-white">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" className="mx-2 text-gray-300 hover:text-white">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://linkedin.com" className="mx-2 text-gray-300 hover:text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                    <p className="text-sm">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </footer>
    </div>
  );
}
