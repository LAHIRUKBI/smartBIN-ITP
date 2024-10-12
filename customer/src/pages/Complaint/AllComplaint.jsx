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
  const [complain, setComplain] = useState([]); // Ensure it's initialized as an empty array

  useEffect(() => {
    fetchHandler().then((data) => setComplain(data.complaint || [])); // Set to an empty array if undefined
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

  /* Search Function */
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

  /* Report Generation Function */
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
    <div>
      <div className="main_staf">
        <br /> <br />
        <div className="action_set_staf">
          <div>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              className="search_input"
              placeholder="Search Here..."
            />
            <button onClick={handleSearch} className="search_btn">
              Search
            </button>
          </div>

          <button className="reportbtn" onClick={handleGenerateReport}>
            Generate Report
          </button>
        </div>
        <br />
        <br />
        {noResults ? (
          <div className="not_found_box">
            <img src={NotFound} alt="noimg" className="notfound" />
            <p className="nodata_pera">No Details Found</p>
          </div>
        ) : (
          <div className="table_container">
            <table className="table">
              <thead>
                <tr className="admin_tbl_tr">
                  <th className="table_th">Complain ID</th>
                  <th className="table_th">Full Name</th>
                  <th className="table_th">Email</th>
                  <th className="table_th">Complain Type</th>
                  <th className="table_th">Date</th>
                  <th className="table_th">Message</th>
                  <th className="table_th">Reply</th>
                  <th className="table_th">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(complain) && complain.length > 0 ? (
                  complain.map((item, index) => (
                    <tr key={index}>
                      <td className="table_td">{item.ComplainID}</td>
                      <td className="table_td">{item.name}</td>
                      <td className="table_td">{item.email}</td>
                      <td className="table_td">{item.ComplainType}</td>
                      <td className="table_td">{item.date}</td>
                      <td className="table_td">{item.message}</td>
                      <td className="table_td">
                        {item.reply || "Not Yet Reply"}
                      </td>
                      <td className="table_td data_btn">
                        <Link
                          className="update"
                          to={`/replyComplaint/${item._id}`}
                        >
                          Reply
                        </Link>
                        <button
                          onClick={() => deleteHandler(item._id)}
                          className="deletbtn2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="table_td">
                      <br />
                      <div className="not_found_box">
                        <img src={NotFound} alt="noimg" className="notfound" />
                        <p className="nodata_pera">No Details Found</p>
                      </div>
                      <br />
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
          <div className="flex justify-center mb-4">
            <a
              href="https://facebook.com"
              className="mx-2 text-gray-300 hover:text-white"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              className="mx-2 text-gray-300 hover:text-white"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              className="mx-2 text-gray-300 hover:text-white"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              className="mx-2 text-gray-300 hover:text-white"
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
