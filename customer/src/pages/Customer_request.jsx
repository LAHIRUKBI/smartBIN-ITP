import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const services = [
  {
    id: 1,
    type: 'Garbage Collection',
    image: 'src/images/Garbage.png',
    description: 'Weekly garbage collection service for residential areas.',
    availability: 'Monday, Wednesday, Friday',
    cost: '$10 per week',
    details: 'Our garbage collection service includes curbside pickup of household waste, ensuring a cleaner and more hygienic environment for your home.',
  },
  {
    id: 2,
    type: 'Recycling Pickup',
    image: 'src/images/Recycling.png',
    description: 'Bi-weekly recycling pickup for paper, plastic, and glass.',
    availability: 'Tuesday, Thursday',
    cost: '$8 per pickup',
    details: 'We handle all your recycling needs, from paper and plastic to glass, helping you reduce your environmental footprint effectively.',
  },
  {
    id: 3,
    type: 'Bulk Waste Removal',
    image: 'src/images/Bulk.png',
    description: 'Specialized service for large waste items like furniture.',
    availability: 'Saturday',
    cost: '$30 per item',
    details: 'For large and bulky items such as old furniture or appliances, our bulk waste removal service ensures safe and efficient disposal.',
  },
];

export default function Customer_request() {
  const navigate = useNavigate();

  const handleRequestClick = (serviceId) => {
    navigate(`/customer_requestForm/${serviceId}`);
  };

  const handleBack = () => {
    navigate('/Customer_welcome'); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="text-teal-600 hover:text-teal-500 flex items-center mb-6 transition-colors duration-300 text-lg"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
        </div>
        <h1 className="text-4xl font-bold text-center mb-12 text-teal-600">
          smartBIN Services
        </h1>

        <div className="space-y-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-100 rounded-lg shadow-lg p-6 border border-gray-300 transition-transform transform hover:scale-105 duration-300 ease-in-out hover:bg-gray-200"
            >
              <div className="flex items-center space-x-6">
                <img
                  src={service.image}
                  alt={service.type}
                  className="w-48 h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-110"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-green-600 mb-2">
                    {service.type}
                  </h2>
                  <p className="text-gray-700 mb-2">{service.description}</p>
                  <p className="text-gray-600 mb-1">
                    <strong>Availability:</strong> {service.availability}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Cost:</strong> {service.cost}
                  </p>
                  <p className="text-gray-600 mb-4">{service.details}</p>
                  <button
                    onClick={() => handleRequestClick(service.id)}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold shadow-md transition-colors duration-300"
                  >
                    Request Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-green-800 text-white text-center py-6 mt-12">
        <div className="container mx-auto">
          <h3 className="text-lg font-bold mb-2">Join Us in Making a Difference!</h3>
          <p className="mb-4">Your journey towards a greener planet starts here.</p>
          <div className="flex justify-center mb-4">
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
