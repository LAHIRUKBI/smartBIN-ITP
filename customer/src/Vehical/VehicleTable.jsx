import React, { useEffect, useState } from "react";
import jsPDF from "jspdf"; // Import jsPDF

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/vehicles");
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const deleteVehicle = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/vehicles/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setVehicles(vehicles.filter((vehicle) => vehicle._id !== id));
        } else {
          console.error("Failed to delete the vehicle");
        }
      } catch (error) {
        console.error("Error deleting vehicle:", error);
      }
    }
  };

  const handleEditClick = (vehicle) => {
    setCurrentVehicle(vehicle);
  };

  const validateVehicleData = (data) => {
    const newErrors = {};
    if (!data.vehicleId) newErrors.vehicleId = "Vehicle ID is required.";
    if (!data.vehicleCategory)
      newErrors.vehicleCategory = "Vehicle Category is required.";
    if (!data.vehicleNumber)
      newErrors.vehicleNumber = "Vehicle Number is required.";
    if (!data.duty) newErrors.duty = "Duty is required.";
    if (!data.owner) newErrors.owner = "Vehicle Owner is required.";
    if (data.phone.length !== 10 || !/^\d+$/.test(data.phone))
      newErrors.phone =
        "Telephone must be exactly 10 digits and contain only numbers.";
    if (!data.address) newErrors.address = "Address is required.";
    if (!data.rental) newErrors.rental = "Rental status is required.";
    return newErrors;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmissionMessage("");

    const newErrors = validateVehicleData(currentVehicle);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/vehicles/${currentVehicle._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentVehicle),
        }
      );

      if (response.ok) {
        const updatedVehicles = vehicles.map((vehicle) =>
          vehicle._id === currentVehicle._id ? currentVehicle : vehicle
        );
        setVehicles(updatedVehicles);
        setSubmissionMessage("Vehicle successfully updated!");
        setCurrentVehicle(null);
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
      setSubmissionMessage(`Error: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentVehicle({ ...currentVehicle, [name]: value });
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vehicleCategory
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      vehicle.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadVehicleData = (vehicle) => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Add Title
    doc.text("Vehicle Data Report", 14, 20);

    // Add content
    const content = [
      `Vehicle ID: ${vehicle.vehicleId}`,
      `Vehicle Category: ${vehicle.vehicleCategory}`,
      `Vehicle Number: ${vehicle.vehicleNumber}`,
      `Duty: ${vehicle.duty}`,
      `Owner: ${vehicle.owner}`,
      `Phone: ${vehicle.phone}`,
      `Address: ${vehicle.address}`,
      `Rental: ${vehicle.rental}`,
    ];

    content.forEach((line, index) => {
      doc.text(line, 14, 30 + index * 10); // Adjust vertical spacing as needed
    });

    // Save the PDF
    doc.save(`${vehicle.vehicleId}_data.pdf`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="vehicle-table">
        <h2 className="text-3xl font-bold mb-4 text-center">Vehicle List</h2>

        {submissionMessage && (
          <div className="alert alert-info bg-green-100 text-green-800 p-4 mb-4 rounded">
            {submissionMessage}
          </div>
        )}

        {/* Search input */}
        <div className="search-container mb-4">
          <input
            type="text"
            className="form-control search-input w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search by Vehicle ID, Category, Number, or Owner"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </div>

        <table className="styled-table min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Vehicle ID</th>
              <th className="py-3 px-6 text-left">Vehicle Category</th>
              <th className="py-3 px-6 text-left">Vehicle Number</th>
              <th className="py-3 px-6 text-left">Duty</th>
              <th className="py-3 px-6 text-left">Owner</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Rental</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle) => (
              <tr
                key={vehicle._id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  currentVehicle && currentVehicle._id === vehicle._id
                    ? "bg-yellow-100"
                    : ""
                }`}
              >
                {currentVehicle && currentVehicle._id === vehicle._id ? (
                  // Editing row
                  <>
                    <td>
                      <input
                        type="text"
                        name="vehicleId"
                        value={currentVehicle.vehicleId}
                        onChange={handleInputChange}
                        className={`p-2 border border-gray-300 rounded-md ${
                          errors.vehicleId ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.vehicleId && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.vehicleId}
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="vehicleCategory"
                        value={currentVehicle.vehicleCategory}
                        onChange={handleInputChange}
                        className={`p-2 border border-gray-300 rounded-md ${
                          errors.vehicleCategory ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.vehicleCategory && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.vehicleCategory}
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="vehicleNumber"
                        value={currentVehicle.vehicleNumber}
                        onChange={handleInputChange}
                        className={`p-2 border border-gray-300 rounded-md ${
                          errors.vehicleNumber ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.vehicleNumber && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.vehicleNumber}
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="duty"
                        value={currentVehicle.duty}
                        onChange={handleInputChange}
                        className={`p-2 border border-gray-300 rounded-md ${
                          errors.duty ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.duty && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.duty}
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="owner"
                        value={currentVehicle.owner}
                        onChange={handleInputChange}
                        className={`p-2 border border-gray-300 rounded-md ${
                          errors.owner ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.owner && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.owner}
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="phone"
                        value={currentVehicle.phone}
                        onChange={handleInputChange}
                        className={`p-2 border border-gray-300 rounded-md ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.phone && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="address"
                        value={currentVehicle.address}
                        onChange={handleInputChange}
                        className={`p-2 border border-gray-300 rounded-md ${
                          errors.address ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.address && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.address}
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="rental"
                        value={currentVehicle.rental}
                        onChange={handleInputChange}
                        className={`p-2 border border-gray-300 rounded-md ${
                          errors.rental ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.rental && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.rental}
                        </div>
                      )}
                    </td>
                    <td>
                      <button
                        className="text-green-600 hover:text-green-800 mr-4"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-6">{vehicle.vehicleId}</td>
                    <td className="py-3 px-6">{vehicle.vehicleCategory}</td>
                    <td className="py-3 px-6">{vehicle.vehicleNumber}</td>
                    <td className="py-3 px-6">{vehicle.duty}</td>
                    <td className="py-3 px-6">{vehicle.owner}</td>
                    <td className="py-3 px-6">{vehicle.phone}</td>
                    <td className="py-3 px-6">{vehicle.address}</td>
                    <td className="py-3 px-6">{vehicle.rental}</td>
                    <td className="py-3 px-6">
                      <button
                        className="text-blue-600 hover:text-blue-800 mr-4"
                        onClick={() => handleEditClick(vehicle)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => deleteVehicle(vehicle._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="text-yellow-600 hover:text-yellow-800 ml-2"
                        onClick={() => downloadVehicleData(vehicle)}
                      >
                        Download
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTable;
