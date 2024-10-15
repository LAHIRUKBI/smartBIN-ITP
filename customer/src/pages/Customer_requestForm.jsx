import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaInfoCircle, FaClipboardList, FaArrowLeft } from 'react-icons/fa';

// Define services
const services = [
  {
    id: 1,
    type: 'Garbage Collection',
    description: 'Weekly garbage collection service for residential areas.',
    availability: 'Monday, Wednesday, Friday',
    cost: '$10 per week',
  },
  {
    id: 2,
    type: 'Recycling Pickup',
    description: 'Bi-weekly recycling pickup for paper, plastic, and glass.',
    availability: 'Tuesday, Thursday',
    cost: '$8 per pickup',
  },
  {
    id: 3,
    type: 'Bulk Waste Removal',
    description: 'Specialized service for large waste items like furniture.',
    availability: 'Saturday',
    cost: '$30 per item',
  },
];

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, formData, selectedService }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Confirm Your Request</h2>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Additional Info:</strong> {formData.additionalInfo}</p>
          <h3 className="text-lg font-semibold">Service Details</h3>
          {selectedService && (
            <>
              <p><strong>Service Type:</strong> {selectedService.type}</p>
              <p><strong>Description:</strong> {selectedService.description}</p>
              <p><strong>Availability:</strong> {selectedService.availability}</p>
              <p><strong>Cost:</strong> {selectedService.cost}</p>
            </>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded-md mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-md" onClick={onConfirm}>
            Confirm Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Customer_requestForm() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(serviceId);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    additionalInfo: '',
    paymentMethod: '', // New field for payment method
  });
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const service = services.find(service => service.id === parseInt(selectedServiceId, 10));
    setSelectedService(service);
  }, [selectedServiceId]);

  const handleServiceChange = (event) => {
    setSelectedServiceId(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePhoneChange = (event) => {
    const { value } = event.target;
    // Allow only digits and limit to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setFormData(prevData => ({
        ...prevData,
        phone: value
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate phone number length
    if (formData.phone.length !== 10) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    // Check if all required fields are filled
    const requiredFields = [formData.name, formData.email, formData.phone, formData.address, formData.additionalInfo, formData.paymentMethod];
    if (requiredFields.some(field => !field)) {
      alert('Please fill out all fields.');
      return;
    }

    // Open the confirmation modal
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post('/api/requestservice/submit', {
        ...formData,
        serviceId: selectedServiceId
      });
      alert(response.data.message);
      navigate('/customer_welcome'); // Navigate to customer_welcome after successful submission
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request');
    } finally {
      setModalOpen(false); // Close the modal after submission
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <div className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6 text-teal-600">Request Service</h1>
          <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-teal-600 flex items-center">
                    <FaUser className="mr-2" /> Personal Information
                  </h2>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      <FaUser className="inline mr-2" /> Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="Lahiru Bandara"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      <FaEnvelope className="inline mr-2" /> Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="lahiru@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      <FaPhone className="inline mr-2" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="0714567890" // Updated placeholder
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      <FaHome className="inline mr-2" /> Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="123 Street Name, City"
                    />
                  </div>

                  <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                      <FaInfoCircle className="inline mr-2" /> Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="Any additional information or special requests"
                    ></textarea>
                  </div>
                </div>

                {/* Service Selection Section */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-teal-600 flex items-center">
                    <FaClipboardList className="mr-2" /> Service Selection
                  </h2>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                      Select Service
                    </label>
                    <select
                      id="service"
                      value={selectedServiceId}
                      onChange={handleServiceChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    >
                      {services.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedService && (
                    <div className="p-4 bg-gray-100 rounded-md border border-gray-300">
                      <h3 className="text-lg font-semibold">{selectedService.type}</h3>
                      <p>{selectedService.description}</p>
                      <p><strong>Availability:</strong> {selectedService.availability}</p>
                      <p><strong>Cost:</strong> {selectedService.cost}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                >
                  <option value="">Select a payment method</option>
                  <option value="creditCard">Cash</option>
                  <option value="debitCard">Debit Card</option>
                  <option value="paypal">Credit Card</option>
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Submit Request
                </button>
              </div>
            </form>
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        formData={formData}
        selectedService={selectedService}
      />
    </div>
  );
}
