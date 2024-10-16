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
  const [requestTimesUp, setRequestTimesUp] = useState({});
  const [selectedFields, setSelectedFields] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeRequest, setActiveRequest] = useState(null);
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
      setServiceRequests(serviceRequests.filter((request) => request._id !== id));
      setRequestTimesUp((prev) => ({ ...prev, [id]: true }));
    } catch (error) {
      console.error("Error deleting service request:", error);
    }
  };

  const handleDownloadReceipt = (request) => {
    setActiveRequest(request); // Set the active request
    setSelectedFields({}); // Reset selected fields
    setShowModal(true); // Show the modal for field selection
  };

  const generatePDF = () => {
    const request = activeRequest;
    const doc = new jsPDF();

    // Company details
    const companyName = "smartBIN";
    const currentDate = new Date().toLocaleDateString();
    const receiptNumber = `Receipt #: ${request._id}`;

    // Add company name in large green font, centered
    doc.setFontSize(30);
    doc.setTextColor(34, 139, 34);
    const nameWidth = doc.getTextWidth(companyName);
    doc.text(companyName, (doc.internal.pageSize.width - nameWidth) / 2, 22);

    // Add receipt number and current date
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(receiptNumber, 14, 40);
    doc.text(`Date: ${currentDate}`, 14, 48);

    // Prepare data for the table based on selected fields
    const tableData = [
      { title: "Name", value: request.name, field: "name" },
      { title: "Email", value: request.email, field: "email" },
      { title: "Phone", value: request.phone, field: "phone" },
      { title: "Address", value: request.address, field: "address" },
      { title: "Additional Info", value: request.additionalInfo || "N/A", field: "additionalInfo" },
      { title: "Service ID", value: request.serviceId, field: "serviceId" },
      { title: "Payment Method", value: request.paymentMethod, field: "paymentMethod" },
      { title: "Submitted At", value: new Date(request.submittedAt).toLocaleString(), field: "submittedAt" },
    ];

    const filteredData = tableData.filter((item) => selectedFields[item.field]);

    // Add a horizontal line before the table
    doc.setDrawColor(0, 0, 0);
    doc.line(14, 50, doc.internal.pageSize.width - 14, 50);

    // Use autotable to add the table
    doc.autoTable({
      head: [["Field", "Value"]],
      body: filteredData.map((item) => [item.title, item.value]),
      startY: 55,
      theme: "striped",
      styles: {
        fontSize: 12,
        cellPadding: 6,
        halign: "left",
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontSize: 14,
        lineWidth: 0.5,
        strokeColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineWidth: 0.2,
        strokeColor: [22, 160, 133],
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
      doc.text(info, (doc.internal.pageSize.width - textWidth) / 2, pageHeight - 40 + index * 10);
    });

    // Save the PDF
    doc.save(`receipt-${request._id}.pdf`);
    setShowModal(false); // Close the modal
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

                    <div className="mt-auto flex justify-between space-x-4">
                      <button
                        onClick={() => handleUpdate(request._id)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
                      >
                        <FaEdit className="inline-block mr-2" />
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(request._id)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors duration-300"
                      >
                        <FaTrash className="inline-block mr-2" />
                        Delete
                      </button>
                      <button
                        onClick={() => handleDownloadReceipt(request)}
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-300"
                      >
                        <FaFilePdf className="inline-block mr-2" />
                        Download Receipt
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-600 text-xl">
                No service requests found.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for selecting fields */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Select Fields for Receipt</h2>
            <div className="space-y-4">
              {[
                { label: "Name", field: "name" },
                { label: "Email", field: "email" },
                { label: "Phone", field: "phone" },
                { label: "Address", field: "address" },
                { label: "Additional Info", field: "additionalInfo" },
                { label: "Service ID", field: "serviceId" },
                { label: "Payment Method", field: "paymentMethod" },
                { label: "Submitted At", field: "submittedAt" },
              ].map(({ label, field }) => (
                <div key={field} className="flex items-center">
                  <input
                    type="checkbox"
                    id={field}
                    checked={selectedFields[field] || false}
                    onChange={() =>
                      setSelectedFields((prev) => ({
                        ...prev,
                        [field]: !prev[field],
                      }))
                    }
                    className="mr-2"
                  />
                  <label htmlFor={field}>{label}</label>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={generatePDF}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-300"
              >
                Generate PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
