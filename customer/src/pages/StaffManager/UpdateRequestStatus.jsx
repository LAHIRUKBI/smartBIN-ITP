import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateRequestStatus() {
  const { id } = useParams();
  const [request, setRequest] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(
          `/api/requestservice/servicerequests/${id}`
        );
        setRequest(response.data);
      } catch (error) {
        console.error("Error fetching request:", error);
      }
    };
    fetchRequest();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/requestservice/servicerequests/${id}`, request);
      navigate("/staff_manager_request");
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  // New style variables
  const containerStyle =
    "min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-3000 py-10 flex justify-center items-center";
  const formContainerStyle =
    "bg-gray-100 bg-opacity-90 rounded-2xl shadow-lg border border-gray-300 max-w-md w-full p-6";

  return (
    <div>
      <div className={containerStyle}>
        <div className={formContainerStyle}>
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-600 text-center">
              Add Service Request
            </h1>
            <p className="text-center text-gray-600 text-sm mt-1">
              Please Add request details below
            </p>
          </div>

          {/* Conditional Loading */}
          {!request.name ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              <p className="text-gray-600 text-sm mt-3">
                Loading request details...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  className="block text-left text-gray-800 mb-1 text-sm font-medium"
                  htmlFor="name"
                >
                  Add Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={request.status || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 ease-in-out text-sm"
                  required
                >
                  <option value="">Select Status</option>{" "}
                  {/* Placeholder option */}
                  <option value="Confirm">Confirm</option>
                  <option value="Reject">Reject</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300 ease-in-out"
              >
                Save Changes
              </button>

              {/* Back Button */}
              <button
                type="button"
                className="mt-2 w-full py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
                onClick={() => navigate("/staff_manager_request")}
              >
                Back to Orders
              </button>
            </form>
          )}

          {/* Decorative Divider */}
          <div className="my-6">
            <div className="border-t border-gray-300"></div>
          </div>

          {/* Footer Section */}
          <p className="text-center text-gray-600 text-xs">
            Having issues?{" "}
            <a href="/support" className="text-pink-400 hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UpdateRequestStatus;
