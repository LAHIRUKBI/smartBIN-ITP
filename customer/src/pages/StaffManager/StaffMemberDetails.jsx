import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import NotFound from "./img/nofound.png";
import "./staff.css";
const URL = "http://localhost:3000/api/staffMember";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function StaffMemberDetails() {
  const [staffMember, setStaffMember] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setStaffMember(data.staffMember || []));
  }, []);

  const deleteHandler = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Member Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${URL}/${_id}`);
        window.alert("Staff Member Detaill Deleted successfully!");
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
      const filtered = data.staffMember.filter((staffMember) =>
        Object.values(staffMember).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setStaffMember(filtered);
      setNoResults(filtered.length === 0);
    });
  };
  const handleGenerateReport = () => {
    const doc = new jsPDF("landscape");
    doc.text("Staff Member Report", 20, 10);

    const columns = [
      "Member ID",
      "First Name",
      "Last Name",
      "Gender",
      "Phone",
      "Birthday",
      "Email",
      "Role",
      "Address",
    ];

    const rows = staffMember.map((item) => [
      item.memberID,
      item.firstName,
      item.lastName,
      item.gender,
      item.phone,
      item.dob,
      item.email,
      item.memberType,
      item.address,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
    });

    doc.save("Staff Members report.pdf");
  };

  return (
    <div>
      <div className="nav_setbar">
        <div
          className="nav_itm_stf active_staff_nav"
          onClick={() => (window.location.href = "/staff_manager_dash")}
        >
          Staff Members
        </div>
        <div
          className="nav_itm_stf  "
          onClick={() => (window.location.href = "/salaryDetails")}
        >
          Salary
        </div>
        <div
          className="nav_itm_stf"
          onClick={() => (window.location.href = "/staff_manager_request")}
        >
          Request
        </div>
      </div>
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto">
          {/* Search and Action Buttons */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => (window.location.href = "/add_new_staf_member")}
              className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition-all"
            >
              Add New Member
            </button>
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
            <div className="">
              <div className="tablecontiner">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="py-3 px-6 text-left">Member ID</th>
                      <th className="py-3 px-6 text-left">First Name</th>
                      <th className="py-3 px-6 text-left">Last Name</th>
                      <th className="py-3 px-6 text-left">Gender</th>
                      <th className="py-3 px-6 text-left">Phone</th>
                      <th className="py-3 px-6 text-left">Birthday</th>
                      <th className="py-3 px-6 text-left">Email</th>
                      <th className="py-3 px-6 text-left">Role</th>
                      <th className="py-3 px-6 text-center">Address</th>
                      <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(staffMember) && staffMember.length > 0 ? (
                      staffMember.map((item, index) => (
                        <tr
                          key={index}
                          className="bg-gray-50 border-b hover:bg-gray-100"
                        >
                          <td className="py-3 px-6">{item.memberID}</td>
                          <td className="py-3 px-6">{item.firstName}</td>
                          <td className="py-3 px-6">{item.lastName}</td>
                          <td className="py-3 px-6">{item.gender}</td>
                          <td className="py-3 px-6">{item.phone}</td>
                          <td className="py-3 px-6">{item.dob}</td>
                          <td className="py-3 px-6">{item.email}</td>
                          <td className="py-3 px-6">{item.memberType}</td>
                          <td className="py-3 px-6">{item.address}</td>
                          <td className="py-3 px-6 text-center">
                            <Link
                              to={`/update_staff_member/${item._id}`}
                              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-all"
                            >
                              Update
                            </Link>
                            <button
                              onClick={() => deleteHandler(item._id)}
                              className="ml-2 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-all"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => {
                                const salaryData = {
                                  memberID: item.memberID,
                                  memberType: item.memberType,
                                };
                                localStorage.setItem(
                                  "Salarytemp",
                                  JSON.stringify(salaryData)
                                );
                                window.location.href = "/salaryGenarate";
                              }}
                              className="ml-2 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-all"
                            >
                              Genarate Salary
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          className="py-4 text-center text-gray-500"
                        >
                          No Details Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
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
    </div>
  );
}

export default StaffMemberDetails;
