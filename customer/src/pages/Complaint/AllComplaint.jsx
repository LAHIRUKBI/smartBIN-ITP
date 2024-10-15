import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import NotFound from "./img/nofound.png";

const URL = "http://localhost:3000/api/complain";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function AllComplaint() {
  const [complain, setComplain] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setComplain(data.complaint || []));
  }, []);

  const deleteHandler = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Complaint?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${URL}/${_id}`);
        window.alert("Complaint Deleted successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting details:", error);
      }
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.complaint.filter((complaint) =>
        Object.values(complaint).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setComplain(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.text("Complain Report", 20, 10);

    const columns = [
      "Full Name",
      "Complain ID",
      "Complain Type",
      "Date",
      "Message",
    ];

    const rows = complain.map((item) => [
      item.name,
      item.ComplainID,
      item.ComplainType,
      item.date,
      item.message,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
    });

    doc.save("complain_report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        {/* Search and Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              className="px-4 py-2 rounded-l-md border-t border-l border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search Here..."
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-all"
            >
              Search
            </button>
          </div>
          <button
            onClick={handleGenerateReport}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition-all"
          >
            Generate Report
          </button>
        </div>

        {/* Table Section */}
        {noResults ? (
          <div className="flex flex-col items-center mt-12">
            <img src={NotFound} alt="No data found" className="w-64 h-64" />
            <p className="text-gray-500 text-lg mt-4">No Details Found</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Complain ID</th>
                  <th className="py-3 px-6 text-left">Full Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Complain Type</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Message</th>
                  <th className="py-3 px-6 text-left">Reply</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(complain) && complain.length > 0 ? (
                  complain.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-gray-50 border-b hover:bg-gray-100"
                    >
                      <td className="py-3 px-6">{item.ComplainID}</td>
                      <td className="py-3 px-6">{item.name}</td>
                      <td className="py-3 px-6">{item.email}</td>
                      <td className="py-3 px-6">{item.ComplainType}</td>
                      <td className="py-3 px-6">{item.date}</td>
                      <td className="py-3 px-6">{item.message}</td>
                      <td className="py-3 px-6">
                        {item.reply || "Not Yet Replied"}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <Link
                          to={`/replyComplaint/${item._id}`}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-all"
                        >
                          Reply
                        </Link>
                        <button
                          onClick={() => deleteHandler(item._id)}
                          className="ml-2 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-all"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-4 text-center text-gray-500">
                      No Details Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
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
  );
}

export default AllComplaint;
