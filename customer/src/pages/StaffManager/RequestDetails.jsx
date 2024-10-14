import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Make sure this is imported
const URL = "http://localhost:3000/api/requestservice/servicerequests";

function RequestDetails() {
  const [serviceRequests, setServiceRequests] = useState([]);
  const navigate = useNavigate(); // Correctly calling useNavigate

  // Fetch service requests when component mounts
  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const response = await axios.get(URL);
        setServiceRequests(response.data);
      } catch (error) {
        console.error("Error fetching service requests:", error);
      }
    };

    fetchServiceRequests();
  }, []);

  // Function to handle the update (redirects to the update page)
  const handleUpdate = (id) => {
    navigate(`/customer_requestStatusUpdate/${id}`);
  };

  return (
    <div>
      <div className="nav_setbar">
        <div
          className="nav_itm_stf"
          onClick={() => (window.location.href = "/staff_manager_dash")}
        >
          Staff Members
        </div>
        <div
          className="nav_itm_stf"
          onClick={() => (window.location.href = "/salaryDetails")}
        >
          Salary
        </div>
        <div
          className="nav_itm_stf active_staff_nav"
          onClick={() => (window.location.href = "/staff_manager_request")}
        >
          Request
        </div>
      </div>

      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto">
          <div className="tablecontiner">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-center">Phone</th>
                  <th className="py-3 px-6 text-left">Address</th>
                  <th className="py-3 px-6 text-left">Additional Info</th>
                  <th className="py-3 px-6 text-left">Service ID</th>
                  <th className="py-3 px-6 text-left">Payment Method</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(serviceRequests) &&
                serviceRequests.length > 0 ? (
                  serviceRequests.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-gray-50 border-b hover:bg-gray-100"
                    >
                      <td className="py-3 px-6">{item.name}</td>
                      <td className="py-3 px-6">{item.email}</td>
                      <td className="py-3 px-6">{item.phone}</td>
                      <td className="py-3 px-6">{item.address}</td>
                      <td className="py-3 px-6">{item.additionalInfo}</td>
                      <td className="py-3 px-6">{item.serviceId}</td>
                      <td className="py-3 px-6">{item.paymentMethod}</td>
                      <td className="py-3 px-6">
                        {item.status || "Not Yet Review"}
                      </td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() => handleUpdate(item._id)}
                          className="flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white p-3 rounded transition-colors duration-300 shadow-md hover:shadow-lg w-full"
                        >
                          <FaEdit className="mr-2" /> Update Status
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="py-4 text-center text-gray-500">
                      No Details Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="bg-green-800 text-white text-center py-6 mt-12">
          <div className="container mx-auto">
            <h3 className="text-lg font-bold mb-2">
              Join Us in Making a Difference!
            </h3>
            <p className="mb-4">
              Your journey towards a greener planet starts here.
            </p>
            <div className="flex justify-center space-x-4 mb-4">
              <a
                href="https://facebook.com"
                className="text-gray-300 hover:text-white"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-300 hover:text-white"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-300 hover:text-white"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-300 hover:text-white"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default RequestDetails;
