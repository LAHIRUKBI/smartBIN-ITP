import React, { useState } from "react";
import { FaMapMarkerAlt, FaCar, FaClock, FaWeightHanging, FaListAlt } from 'react-icons/fa'; // Importing Font Awesome icons

const InsertRouteForm = () => {
  const [formData, setFormData] = useState({
    routeID: "",
    startPoint: "",
    endPoint: "",
    destination: "",
    duration: "",
    distance: "",
    vehicleType: "",
    status: "active",
    routeDescription: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });

  const validateForm = () => {
    let newErrors = {};

    if (!formData.routeID) {
      newErrors.routeID = "Route ID is required.";
    }

    if (!formData.startPoint || formData.startPoint.length > 50) {
      newErrors.startPoint = "Start Point is required and should not exceed 50 characters.";
    }

    if (!formData.endPoint || formData.endPoint.length > 50) {
      newErrors.endPoint = "End Point is required and should not exceed 50 characters.";
    }

    if (!formData.destination || isNaN(formData.destination) || formData.destination <= 0) {
      newErrors.destination = "Destination is required and should be a positive number.";
    }

    if (formData.duration && (isNaN(formData.duration) || formData.duration <= 0)) {
      newErrors.duration = "Duration should be a positive number if provided.";
    }

    if (formData.distance && (isNaN(formData.distance) || formData.distance <= 0)) {
      newErrors.distance = "Distance should be a positive number if provided.";
    }

    if (formData.vehicleType && formData.vehicleType.length > 50) {
      newErrors.vehicleType = "Vehicle Type should not exceed 50 characters.";
    }

    if (formData.routeDescription && formData.routeDescription.length > 200) {
      newErrors.routeDescription = "Route Description should not exceed 200 characters.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage({ text: "Please fix the errors above.", type: "error" });
      return;
    }

    const dataToSend = { ...formData };

    try {
      const response = await fetch("http://localhost:3000/api/routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Route added successfully:", result);
        setMessage({ text: "Route added successfully!", type: "success" });

        setFormData({
          routeID: "",
          startPoint: "",
          endPoint: "",
          destination: "",
          duration: "",
          distance: "",
          vehicleType: "",
          status: "active",
          routeDescription: "",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        const errorResult = await response.json();
        console.error("Error adding route:", errorResult);
        setMessage({
          text: `Error: ${errorResult.message || response.statusText}`,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        text: `Error: ${error.message || "Something went wrong!"}`,
        type: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-xl font-bold mb-4 text-center">Insert Route</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div>
            <label className="label block mb-1 text-sm text-gray-700 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Route ID:
            </label>
            <input
              className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              type="text"
              name="routeID"
              value={formData.routeID}
              onChange={handleChange}
              required
            />
            {errors.routeID && (
              <div className="error-message text-red-600 text-xs">{errors.routeID}</div>
            )}
          </div>

          <div>
            <label className="label block mb-1 text-sm text-gray-700 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Start Point:
            </label>
            <input
              className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              type="text"
              name="startPoint"
              value={formData.startPoint}
              onChange={handleChange}
              required
            />
            {errors.startPoint && (
              <div className="error-message text-red-600 text-xs">{errors.startPoint}</div>
            )}
          </div>

          <div>
            <label className="label block mb-1 text-sm text-gray-700 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> End Point:
            </label>
            <input
              className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              type="text"
              name="endPoint"
              value={formData.endPoint}
              onChange={handleChange}
              required
            />
            {errors.endPoint && (
              <div className="error-message text-red-600 text-xs">{errors.endPoint}</div>
            )}
          </div>

          <div>
            <label className="label block mb-1 text-sm text-gray-700 flex items-center">
              <FaListAlt className="mr-2" /> Destination (Number):
            </label>
            <input
              className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              type="number"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
            {errors.destination && (
              <div className="error-message text-red-600 text-xs">{errors.destination}</div>
            )}
          </div>

          {/* Right Column */}
          <div>
            <label className="label block mb-1 text-sm text-gray-700 flex items-center">
              <FaClock className="mr-2" /> Duration (Minutes):
            </label>
            <input
              className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
            {errors.duration && (
              <div className="error-message text-red-600 text-xs">{errors.duration}</div>
            )}
          </div>

          <div>
            <label className="label block mb-1 text-sm text-gray-700 flex items-center">
              <FaWeightHanging className="mr-2" /> Distance (Kilometers):
            </label>
            <input
              className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              type="number"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
            />
            {errors.distance && (
              <div className="error-message text-red-600 text-xs">{errors.distance}</div>
            )}
          </div>

          <div>
            <label className="label block mb-1 text-sm text-gray-700 flex items-center">
              <FaCar className="mr-2" /> Vehicle Type:
            </label>
            <input
              className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              type="text"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
            />
            {errors.vehicleType && (
              <div className="error-message text-red-600 text-xs">{errors.vehicleType}</div>
            )}
          </div>

          <div>
            <label className="label block mb-1 text-sm text-gray-700">Status:</label>
            <select
              className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="label block mb-1 text-sm text-gray-700">Route Description:</label>
            <textarea
              className="form-control w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              name="routeDescription"
              value={formData.routeDescription}
              onChange={handleChange}
              rows="4"
            ></textarea>
            {errors.routeDescription && (
              <div className="error-message text-red-600 text-xs">{errors.routeDescription}</div>
            )}
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Insert Route
            </button>
          </div>
        </form>

        {message.text && (
          <div className={`mt-4 text-center ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default InsertRouteForm;
