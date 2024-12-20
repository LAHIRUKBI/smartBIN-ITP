import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Customer_profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          navigate("/signin");
          return;
        }

        const { data } = await axios.get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data);
        setLoading(false);
      } catch (error) {
        setError(
          "Failed to load user data: " +
            (error.response?.data.message || error.message)
        );
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleUpdateInfo = () => {
    navigate("/customer_updateInfo");
  };

  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      axios
        .delete("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then(() => {
          alert("Profile deleted successfully.");
          localStorage.removeItem("access_token");
          navigate("/signin");
        })
        .catch(() => {
          alert("Failed to delete profile.");
        });
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    navigate("/signin");
  };

  const handleRequestService = () => {
    navigate("/customer_request");
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  if (loading)
    return <div className="text-center p-4 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!user)
    return (
      <div className="text-center p-4 text-gray-500">No user data found.</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 flex flex-col items-center py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full border border-gray-300">
        {/* Back Navigation Button */}
        <button
          onClick={handleBackNavigation}
          className="text-gray-600 hover:text-gray-800 text-sm mb-4 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a1 1 0 01-.707-.293l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 1.414L4.414 9H18a1 1 0 110 2H4.414l6.293 6.293a1 1 0 01-1.414 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>

        <h1 className="text-4xl font-extrabold mb-8 text-gray-700 text-center">
          Customer Profile
        </h1>

        {/* Image Section */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg">
            {user.firstName ? user.firstName[0] : "U"}
            {user.lastName ? user.lastName[0] : "U"}
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="text-center lg:text-left mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
            Welcome, {user.firstName || "Customer"}!
          </h2>
          <p className="text-gray-500">We're glad to have you back.</p>

          <div className="mt-6 space-y-2">
            <p className="text-gray-600">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-600">
              <strong>Role:</strong> {user.role}
            </p>
            <p className="text-gray-600">
              <strong>Account Created:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong>Last Updated:</strong>{" "}
              {new Date(user.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-wrap justify-between gap-4 mt-8">
          <button
            onClick={handleUpdateInfo}
            className="px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-lg text-white font-semibold shadow-md"
          >
            Update
          </button>
          <button
            onClick={handleDeleteProfile}
            className="px-4 py-2 bg-red-400 hover:bg-red-500 rounded-lg text-white font-semibold shadow-md"
          >
            Delete
          </button>
          <button
            onClick={handleRequestService}
            className="px-4 py-2 bg-green-400 hover:bg-green-500 rounded-lg text-white font-semibold shadow-md"
          >
            Request Service
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-lg text-white font-semibold shadow-md"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
