import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRecycle } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Sample services array
const services = [
  {
    id: 1,
    type: "Garbage Collection",
    image: "src/images/Garbage.png",
    description: "Weekly garbage collection service for residential areas.",
    availability: "Monday, Wednesday, Friday",
    cost: "$10 per week",
    details:
      "Our garbage collection service includes curbside pickup of household waste, ensuring a cleaner and more hygienic environment for your home.",
  },
  {
    id: 2,
    type: "Recycling Pickup",
    image: "src/images/Recycling.png",
    description: "Bi-weekly recycling pickup for paper, plastic, and glass.",
    availability: "Tuesday, Thursday",
    cost: "$8 per pickup",
    details:
      "We handle all your recycling needs, from paper and plastic to glass, helping you reduce your environmental footprint effectively.",
  },
  {
    id: 3,
    type: "Bulk Waste Removal",
    image: "src/images/Bulk.png",
    description: "Specialized service for large waste items like furniture.",
    availability: "Saturday",
    cost: "$30 per item",
    details:
      "For large and bulky items such as old furniture or appliances, our bulk waste removal service ensures safe and efficient disposal.",
  },
];

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("/api/listing/get"); // Adjust your API endpoint as needed
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

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-500 to-cyan-500 py-24">
        {/* Video background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
          src="src/videos/home.mp4"
          autoPlay
          muted
          loop
          playsInline
        ></video>

        {/* Overlay to darken video */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        {/* Hero Content */}
        <div className="relative container mx-auto text-center z-10">
          <h1 className="text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
            Welcome to SmartBIN
          </h1>
          <p className="text-xl mb-8 text-gray-200 drop-shadow-md">
            Innovating waste management for a cleaner future.
          </p>
          <Link
            to="/register"
            className="bg-teal-600 hover:bg-teal-700 text-white py-4 px-8 rounded-full text-lg shadow-lg transition duration-300"
          >
            <FaRecycle className="inline mr-2" /> Get Started
          </Link>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-teal-600">
            Our Vision and Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-teal-600">
                Our Mission
              </h3>
              <p className="text-gray-600">
                We aim to revolutionize waste management with innovative solutions that help both people and the planet.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-teal-600">
                Our Services
              </h3>
              <p className="text-gray-600">
                Explore a range of services designed to make waste management easy and efficient for you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-teal-600">Join Us</h3>
              <p className="text-gray-600">
                Become a part of our community and contribute to a greener future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-teal-600">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out"
              >
                <img
                  src={service.image}
                  alt={service.type}
                  className="w-full h-32 object-cover rounded-lg mb-4 shadow-md"
                />
                <h3 className="text-xl font-semibold text-teal-600 mb-2">
                  {service.type}
                </h3>
                <p className="text-gray-600 mb-2">{service.description}</p>
                <p className="text-gray-500 mb-1">
                  <strong>Availability:</strong> {service.availability}
                </p>
                <p className="text-gray-500 mb-4">
                  <strong>Cost:</strong> {service.cost}
                </p>
                <Link
                  to={`/customer_requestForm/${service.id}`}
                  className="inline-block bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold shadow-md transition-colors duration-300"
                >
                  Request Service
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section for displaying stock dates */}
      <div className="mt-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-teal-400">
          Stock Dates Overview
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {stocks.map((stock) => (
            <div
              key={stock._id}
              className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-teal-600">
                {stock.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Category:</strong> {stock.category}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Added on:</strong>{" "}
                {new Date(stock.addDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Expiry Date:</strong>{" "}
                {new Date(stock.expiryDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Quantity:</strong>{" "}
                <span className="font-semibold">
                  {stock.quantity} {stock.unitOfMeasure}
                </span>
              </p>
              <div className="flex justify-center">
                <button
                  className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full font-semibold shadow-md transition-all duration-300"
                  onClick={() =>
                    navigate(`/packing_order`, { state: stock })
                  }
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-200 py-8 mt-16">
        <div className="container mx-auto text-center">
          <p className="mb-4">© 2024 SmartBIN. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
