import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const URL = "http://localhost:3000/api/staffMemberSalary";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function SalaryDetails() {
  const [staffMemberSalary, setStaffMemberSalary] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) =>
      setStaffMemberSalary(data.staffMemberSalary || [])
    );
  }, []);

  const generateIndividualReport = (item) => {
    const doc = new jsPDF();
    doc.text(`Salary Report - ${item.memberID}`, 20, 10);
    doc.autoTable({
      head: [["Field", "Details"]],
      body: [
        ["Member ID", item.memberID],
        ["Role", item.memberType],
        ["Date", item.date],
        ["Base Salary", `Rs.${item.baseSalary}.00`],
        ["Overtime Hours", item.OvertimeHours],
        ["Overtime Rate", item.OvertimeRate],
        ["Overtime Pay", `Rs.${item.OvertimePay}.00`],
        ["Bonuses", `Rs.${item.Bonuses}.00`],
        ["Deductions", `Rs.${item.Deductions}.00`],
        ["Total Salary", `Rs.${item.TotalSalary}.00`],
      ],
    });
    doc.save(`salary_report_${item.memberID}.pdf`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Salary Report", 14, 10); // Title of the document

    const tableColumn = [
      "Member ID",
      "Role",
      "Date",
      "Base Salary",
      "Overtime Hours",
      "Overtime Rate",
      "Overtime Pay",
      "Bonuses",
      "Deductions",
      "Total Salary",
    ];
    const tableRows = [];

    staffMemberSalary.forEach((item) => {
      const rowData = [
        item.memberID,
        item.memberType,
        item.date,
        `Rs.${item.baseSalary}.00`,
        item.OvertimeHours,
        item.OvertimeRate,
        `Rs.${item.OvertimePay}.00`,
        `Rs.${item.Bonuses}.00`,
        `Rs.${item.Deductions}.00`,
        `Rs.${item.TotalSalary}.00`,
      ];
      tableRows.push(rowData);
    });

    // Auto-table to generate table from the data
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("salary_report.pdf"); // Save the PDF
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
          className="nav_itm_stf  active_staff_nav"
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
      <div>
        <div className="min-h-screen py-8 px-4">
          <div className="container mx-auto">
            {/* Button to generate all reports */}
            <div className="mb-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={generatePDF}
              >
                Generate All Reports
              </button>
            </div>
            <div className="">
              <div className="tablecontiner">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="py-3 px-6 text-left">Member ID</th>
                      <th className="py-3 px-6 text-left">Role</th>
                      <th className="py-3 px-6 text-center">Date</th>
                      <th className="py-3 px-6 text-left">Base Salary</th>
                      <th className="py-3 px-6 text-left">Overtime Hours</th>
                      <th className="py-3 px-6 text-left">Overtime Rate</th>
                      <th className="py-3 px-6 text-left">Overtime Pay</th>
                      <th className="py-3 px-6 text-left">Bonuses</th>
                      <th className="py-3 px-6 text-left">Deductions</th>
                      <th className="py-3 px-6 text-left">Total Salary</th>
                      <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(staffMemberSalary) &&
                    staffMemberSalary.length > 0 ? (
                      staffMemberSalary.map((item, index) => (
                        <tr
                          key={index}
                          className="bg-gray-50 border-b hover:bg-gray-100"
                        >
                          <td className="py-3 px-6">{item.memberID}</td>
                          <td className="py-3 px-6">{item.memberType}</td>
                          <td className="py-3 px-6">{item.date}</td>
                          <td className="py-3 px-6">Rs.{item.baseSalary}.00</td>
                          <td className="py-3 px-6">{item.OvertimeHours}</td>
                          <td className="py-3 px-6">{item.OvertimeRate}</td>
                          <td className="py-3 px-6">
                            Rs.{item.OvertimePay}.00
                          </td>
                          <td className="py-3 px-6">Rs.{item.Bonuses}.00</td>
                          <td className="py-3 px-6">Rs.{item.Deductions}.00</td>
                          <td className="py-3 px-6">
                            Rs.{item.TotalSalary}.00
                          </td>
                          <td className="py-3 px-6">
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded"
                              onClick={() => generateIndividualReport(item)}
                            >
                              Generate Report
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="11"
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
    </div>
  );
}

export default SalaryDetails;
