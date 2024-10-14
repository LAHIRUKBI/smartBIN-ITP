import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const VehicleForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    vehicleId: "",
    vehicleCategory: "",
    vehicleNumber: "",
    duty: "",
    owner: "",
    phone: "",
    address: "",
    rental: "",
  });

  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setSubmissionMessage("");

    const newErrors = {};

    // Validate inputs before submission
    if (formData.vehicleId.length === 0) {
      newErrors.vehicleId = "Vehicle ID is required.";
    } else if (formData.vehicleId.length > 10) {
      newErrors.vehicleId = "Vehicle ID must be less than or equal to 10 characters.";
    }

    if (formData.vehicleCategory.length === 0) {
      newErrors.vehicleCategory = "Vehicle Category is required.";
    }

    if (formData.vehicleNumber.length === 0) {
      newErrors.vehicleNumber = "Vehicle Number is required.";
    }

    if (formData.duty.length === 0) {
      newErrors.duty = "Duty is required.";
    }

    if (formData.owner.length === 0) {
      newErrors.owner = "Vehicle Owner is required.";
    }

    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Telephone must be exactly 10 digits and contain only numbers.";
    }

    if (formData.address.length === 0) {
      newErrors.address = "Address is required.";
    }

    if (formData.rental === "") {
      newErrors.rental = "Please select an option for Rental.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Vehicle saved:", result);
      setSubmissionMessage("Vehicle successfully registered!");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error saving vehicle:", error);
      setSubmissionMessage(`Error: ${error.message}`);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      }
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 py-6">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-6 flex justify-center space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
            onClick={() => navigate("/vehicle_welcome")}
          >
            Go To Back
          </button>
          
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Vehicle Registration
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="form-group">
            <label htmlFor="inputVehicleId" className="block text-gray-700 font-semibold mb-1 text-sm">
              Vehicle ID
            </label>
            <input
              type="text"
              className={`form-control w-full p-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                errors.vehicleId ? "border-green-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"
              }`}
              id="inputVehicleId"
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleInputChange}
              maxLength={10}
            />
            {errors.vehicleId && <div className="text-red-500 text-xs">{errors.vehicleId}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="inputVehicleCategory" className="block text-gray-700 font-semibold mb-1 text-sm">
              Vehicle Category
            </label>
            <input
              type="text"
              className={`form-control w-full p-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                errors.vehicleCategory ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"
              }`}
              id="inputVehicleCategory"
              name="vehicleCategory"
              value={formData.vehicleCategory}
              onChange={handleInputChange}
            />
            {errors.vehicleCategory && <div className="text-red-500 text-xs">{errors.vehicleCategory}</div>}
          </div>



          <div className="form-group">
            <label htmlFor="InputNumber" className="block text-gray-700 font-semibold mb-1 text-sm">
              Vehicle Number
            </label>
            <input
              type="text"
              className={`form-control w-full p-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                errors.vehicleNumber ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"
              }`}
              id="InputNumber"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleInputChange}
            />
            {errors.vehicleNumber && <div className="text-red-500 text-xs">{errors.vehicleNumber}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="inputDuty" className="block text-gray-700 font-semibold mb-1 text-sm">
              Duty
            </label>
            <input
              type="text"
              className={`form-control w-full p-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                errors.duty ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"
              }`}
              id="inputDuty"
              name="duty"
              value={formData.duty}
              onChange={handleInputChange}
            />
            {errors.duty && <div className="text-red-500 text-xs">{errors.duty}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="inputOwner" className="block text-gray-700 font-semibold mb-1 text-sm">
              Vehicle Owner
            </label>
            <input
              type="text"
              className={`form-control w-full p-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                errors.owner ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"
              }`}
              id="inputOwner"
              name="owner"
              value={formData.owner}
              onChange={handleInputChange}
            />
            {errors.owner && <div className="text-red-500 text-xs">{errors.owner}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="inputPhone" className="block text-gray-700 font-semibold mb-1 text-sm">
              Telephone
            </label>
            <input
              type="text"
              className={`form-control w-full p-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                errors.phone ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"
              }`}
              id="inputPhone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <div className="text-red-500 text-xs">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="inputAddress" className="block text-gray-700 font-semibold mb-1 text-sm">
              Address
            </label>
            <input
              type="text"
              className={`form-control w-full p-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                errors.address ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"
              }`}
              id="inputAddress"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <div className="text-red-500 text-xs">{errors.address}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="inputRental" className="block text-gray-700 font-semibold mb-1 text-sm">
              Rental
            </label>
            <select
              className={`form-control w-full p-2 border rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
                errors.rental ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"
              }`}
              id="inputRental"
              name="rental"
              value={formData.rental}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.rental && <div className="text-red-500 text-xs">{errors.rental}</div>}
          </div>

          <div className="col-span-full text-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Submit
            </button>
            {submissionMessage && (
              <div className="mt-4 text-center text-green-500 font-semibold">{submissionMessage}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleForm;
