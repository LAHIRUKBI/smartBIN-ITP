import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaTrashAlt, FaEdit, FaFilePdf, FaPlus } from "react-icons/fa";

export default function StockView() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [stockToDelete, setStockToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("/api/listing/get");
        setStocks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError("Failed to load stock data.");
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  //Delete button
  const handleDelete = async () => {
    if (stockToDelete) {
      try {
        await axios.delete(`/api/listing/delete/${stockToDelete}`);
        setStocks(stocks.filter((stock) => stock._id !== stockToDelete));
        setDeleteModalVisible(false);
      } catch (error) {
        console.error("Error deleting stock:", error);
        setError("Failed to delete stock.");
      }
    }
  };
  //Update button
  const handleUpdate = (id) => {
    navigate(`/stock/update/${id}`);
  };

  // PDF genarate
  const generatePDF = (stock = null) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("SmartBin", 105, 30, { align: "center" });

    doc.setFontSize(10);
    const rightAlignX = 160;
    doc.text("Branch Name: Stock Branch", rightAlignX, 40);
    doc.text("Branch Phone: (031) 265-7890", rightAlignX, 45);
    doc.text("Fax NO: (895) 456-7891", rightAlignX, 50);

    doc.text("Manager: Amaya Bandara", rightAlignX, 60);
    doc.text("Position: Stock Manager", rightAlignX, 65);
    doc.text("Manager ID: SM12345", rightAlignX, 70);

    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date Generated: ${currentDate}`, rightAlignX, 75);

    doc.setFontSize(12);
    doc.text(
      "This document provides a summary of the stock items managed by SmartBin.",
      105,
      100,
      { align: "center" }
    );

    //
    const tableColumn = [
      { header: "Stock Name", dataKey: "name" },
      { header: "Quantity", dataKey: "quantity" },
      { header: "Unit", dataKey: "unitOfMeasure" },
      { header: "Category", dataKey: "category" },
      { header: "Add Date", dataKey: "addDate" },
      { header: "Expiry Date", dataKey: "expiryDate" },
      { header: "Price (RS)", dataKey: "price" },
    ];

    const tableRows = stock
      ? [
          {
            name: stock.name,
            quantity: stock.quantity,
            unitOfMeasure: stock.unitOfMeasure,
            category: stock.category,
            addDate: stock.addDate,
            expiryDate: stock.expiryDate,
            price: stock.price,
          },
        ]
      : stocks.map((stock) => ({
          name: stock.name,
          quantity: stock.quantity,
          unitOfMeasure: stock.unitOfMeasure,
          category: stock.category,
          addDate: stock.addDate,
          expiryDate: stock.expiryDate,
          price: stock.price,
        }));

    doc.autoTable({
      head: [tableColumn.map((col) => col.header)],
      body: tableRows.map((row) => tableColumn.map((col) => row[col.dataKey])),
      startY: 110, // Adjusted to fit below the introduction
      theme: "grid", // Use grid layout for better clarity
      styles: { halign: "center" }, // Center align all text
      headStyles: { fillColor: [22, 160, 133] }, // Header color styling
      margin: { left: 20, right: 20 },
    });

    doc.setFontSize(10);
    doc.text(
      "We confirm that the above information is accurate and true to the best of our knowledge.",
      105,
      doc.autoTable.previous.finalY + 20,
      { align: "center" }
    );

    const signatureY = doc.autoTable.previous.finalY + 40; // Adjust the Y position based on the table's end

    // Owner's signature placeholder (left corner)
    doc.text("______________________", 20, signatureY);
    doc.text("Owner Signature", 20, signatureY + 10);

    // Manager's signature placeholder (right corner)
    doc.text("______________________", 140, signatureY);
    doc.text("Manager Signature", 140, signatureY + 10);

    // Save the document
    doc.save(stock ? `stock-${stock.name}.pdf` : "stock-report.pdf");
  };

  const filteredStocks = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;





  
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-gray-900 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Introduction Section */}
          <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Stock Controller UI</h1>
          </div>

          {/* Available Stocks Count */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-blue-600">
                Available Stocks: {stocks.length}
              </h2>
            </div>

          {/* Search Bar */}
          <div className="mb-6 flex flex-col items-center space-y-4">
            <input
              type="text"
              placeholder="Search by stock name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white text-gray-900 py-2 px-3 rounded-lg w-full sm:w-1/2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          
          {/* Button Container */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => navigate("/stockwelcome")}
              className="py-2 px-4 rounded-md shadow-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition duration-200 flex items-center"
            >
              Back to Stock Welcome
            </button>
            <button
              onClick={() => navigate("/stockcreate")}
              className="py-2 px-4 rounded-md shadow-lg text-sm bg-green-600 text-white hover:bg-green-700 transition duration-200 flex items-center"
            >
              <FaPlus className="mr-2" /> Add New Stock
            </button>
            <button
              onClick={() => generatePDF()}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-200 flex items-center"
            >
              <FaFilePdf className="mr-1 text-base" /> Download All Reports
            </button>
          </div>

          {/* Stock View Section */}
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Stock Views</h1>
          
          {/* Stock Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-lg bg-white shadow-lg">
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
                <div
                  key={stock._id}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="bg-blue-100 border border-blue-400 p-4 rounded mb-4">
                    <h2 className="text-2xl font-bold text-blue-700 text-center">
                      {stock.name}
                    </h2>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span className="font-semibold">Quantity:</span>
                      <span>{stock.quantity}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span className="font-semibold">Unit:</span>
                      <span>{stock.unitOfMeasure}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span className="font-semibold">Category:</span>
                      <span>{stock.category}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span className="font-semibold">Add Date:</span>
                      <span>
                        {new Date(stock.addDate).toLocaleDateString()} (
                        {new Date(stock.addDate).toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                        )
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span className="font-semibold">Expiry Date:</span>
                      <span>
                        {new Date(stock.expiryDate).toLocaleDateString()} (
                        {new Date(stock.expiryDate).toLocaleDateString(
                          "en-US",
                          { weekday: "long" }
                        )}
                        )
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span className="font-semibold">Price:</span>
                      <span className="text-lg font-semibold text-green-600">
                        RS:{stock.price}/=
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-2 mt-4">
                    <button
                      className="bg-red-600 text-white py-2 px-4 w-36 rounded-md shadow-lg hover:bg-red-700 transition duration-200 flex items-center justify-center"
                      onClick={() => {
                        setStockToDelete(stock._id);
                        setDeleteModalVisible(true);
                      }}
                    >
                      <FaTrashAlt className="mr-1" /> Delete
                    </button>
                    <button
                      className="bg-yellow-600 text-white py-2 px-4 w-36 rounded-md shadow-lg hover:bg-yellow-700 transition duration-200 flex items-center justify-center"
                      onClick={() => handleUpdate(stock._id)}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      className="bg-blue-600 text-white py-2 px-4 w-36 rounded-md shadow-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                      onClick={() => generatePDF(stock)}
                    >
                      <FaFilePdf className="mr-1" /> Download Report
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-700">
                No stock items found.
              </div>
            )}
          </div>
          
          {/* Delete Confirmation Modal */}
          {deleteModalVisible && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete this stock item?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 ml-2"
                    onClick={() => setDeleteModalVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white text-center py-6 w-screen">
        <div className="container mx-auto">
          <h3 className="text-lg font-bold mb-2">
            Join Us in Making a Difference!
          </h3>
          <p className="mb-4">
            Your journey towards a greener planet starts here.
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );

}
