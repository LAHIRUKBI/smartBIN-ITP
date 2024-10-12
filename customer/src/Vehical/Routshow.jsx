import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa"; // Import icons from react-icons

const VehicleTable = () => {
  const [routes, setRoutes] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/routes");
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  const deleteRoute = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this route?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/api/routes/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setRoutes(routes.filter((route) => route._id !== id));
          setShowDeleteMessage(true);
          setTimeout(() => setShowDeleteMessage(false), 2000);
        } else {
          console.error("Failed to delete the route");
        }
      } catch (error) {
        console.error("Error deleting route:", error);
      }
    }
  };

  const handleEditClick = (route) => {
    setCurrentRoute(route);
    setShowUpdateModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedRoute = { ...currentRoute };
    delete updatedRoute.stops; // Remove stops field from update

    try {
      const response = await fetch(
        `http://localhost:3000/api/routes/${currentRoute._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRoute),
        }
      );

      if (response.ok) {
        const updatedRoutes = routes.map((route) =>
          route._id === currentRoute._id ? updatedRoute : route
        );
        setRoutes(updatedRoutes);
        setShowUpdateModal(false);
        setCurrentRoute(null);
        setSubmissionMessage("Route successfully updated!");
        setTimeout(() => setSubmissionMessage(""), 2000);
      } else {
        console.error("Failed to update the route");
      }
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRoute({ ...currentRoute, [name]: value });
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRoutes = routes.filter(
    (route) =>
      route.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.endPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to download route data as PDF
  const downloadRouteData = (route) => {
    const doc = new jsPDF(); // Create a new jsPDF instance

    // Add content to PDF
    doc.setFontSize(16);
    doc.text("Route Report", 20, 20);

    doc.setFontSize(12);
    const details = [
      `Route ID: ${route._id}`,
      `Start Point: ${route.startPoint}`,
      `End Point: ${route.endPoint}`,
      `Destination: ${route.destination}`,
      `Duration: ${route.duration} minutes`,
      `Distance: ${route.distance} km`,
      `Vehicle Type: ${route.vehicleType}`,
      `Status: ${route.status}`,
      `Route Description: ${route.routeDescription}`,
    ];

    details.forEach((line, index) => {
      doc.text(line, 20, 30 + index * 10); // Adjust y position for each line
    });

    // Save the PDF
    doc.save(`route_${route._id}.pdf`); // Use route ID in filename
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Route Report</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Search by Start Point, End Point, Destination, or Status"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRoutes.map((route) => (
          <div
            className="bg-white shadow-md rounded-lg p-4 transition transform hover:shadow-lg"
            key={route._id}
          >
            <div className="card-content">
              <h3 className="text-lg font-semibold">{route.startPoint}</h3>
              <p><strong>End Point:</strong> {route.endPoint}</p>
              <p><strong>Destination:</strong> {route.destination}</p>
              <p><strong>Duration:</strong> {route.duration} minutes</p>
              <p><strong>Distance:</strong> {route.distance} km</p>
              <p><strong>Vehicle Type:</strong> {route.vehicleType}</p>
              <p><strong>Status:</strong> {route.status}</p>
              <p><strong>Route Description:</strong> {route.routeDescription}</p>
            </div>
            <div className="card-actions mt-4 flex space-x-2">
              <button
                className="flex items-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                onClick={() => handleEditClick(route)}
              >
                <FaEdit className="mr-1" /> Update
              </button>
              <button
                className="flex items-center bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                onClick={() => deleteRoute(route._id)}
              >
                <FaTrash className="mr-1" /> Delete
              </button>
              <button
                className="flex items-center bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                onClick={() => downloadRouteData(route)}
              >
                <FaDownload className="mr-1" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDeleteMessage && (
        <div className="alert bg-green-100 text-green-800 p-2 rounded mt-4">
          Route deleted successfully!
        </div>
      )}
      {submissionMessage && (
        <div className="alert bg-green-100 text-green-800 p-2 rounded mt-4">
          {submissionMessage}
        </div>
      )}

      {showUpdateModal && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-content bg-white rounded-lg p-6">
            <span className="close absolute top-2 right-2 cursor-pointer" onClick={() => setShowUpdateModal(false)}>
              &times;
            </span>
            <h2 className="text-xl font-bold">Update Route</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="form-group">
                <label>Start Point</label>
                <input
                  type="text"
                  name="startPoint"
                  value={currentRoute.startPoint}
                  onChange={handleInputChange}
                  required
                  className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="form-group">
                <label>End Point</label>
                <input
                  type="text"
                  name="endPoint"
                  value={currentRoute.endPoint}
                  onChange={handleInputChange}
                  required
                  className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={currentRoute.destination}
                  onChange={handleInputChange}
                  required
                  className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="number"
                  name="duration"
                  value={currentRoute.duration}
                  onChange={handleInputChange}
                  required
                  className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="form-group">
                <label>Distance</label>
                <input
                  type="number"
                  name="distance"
                  value={currentRoute.distance}
                  onChange={handleInputChange}
                  required
                  className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="form-group">
                <label>Vehicle Type</label>
                <input
                  type="text"
                  name="vehicleType"
                  value={currentRoute.vehicleType}
                  onChange={handleInputChange}
                  required
                  className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <input
                  type="text"
                  name="status"
                  value={currentRoute.status}
                  onChange={handleInputChange}
                  required
                  className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="form-group">
                <label>Route Description</label>
                <textarea
                  name="routeDescription"
                  value={currentRoute.routeDescription}
                  onChange={handleInputChange}
                  className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              >
                Update Route
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleTable;
