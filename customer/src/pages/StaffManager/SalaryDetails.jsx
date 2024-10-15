import { useState, useEffect } from "react";
import axios from "axios";
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
        <div className="min-h-screen  py-8 px-4">
          <div className="container mx-auto">
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
