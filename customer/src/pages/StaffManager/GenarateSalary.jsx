/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
function GenarateSalary() {
  const [inputs, setInputs] = useState({
    memberID: "",
    memberType: "",
    baseSalary: "",
    OvertimeHours: "",
    OvertimeRate: "",
    OvertimePay: "",
    Bonuses: "",
    Deductions: "",
    TotalSalary: "",
    date: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("Salarytemp");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setInputs((prevInputs) => ({
        ...prevInputs,
        memberID: parsedData.memberID,
        memberType: parsedData.memberType,
      }));

      // Set the base salary based on the userType
      const userType = parsedData.memberType;
      if (userType) {
        const baseSalary = salaryMapping[userType] || ""; // Default to empty if not found
        setInputs((prevInputs) => ({
          ...prevInputs,
          baseSalary: baseSalary,
        }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => {
      const updatedInputs = { ...prevInputs, [name]: value };

      // Update baseSalary if memberType changes
      if (name === "memberType") {
        updatedInputs.baseSalary = salaryMapping[value] || ""; // Reset to "" if not found
      }

      // Call the calculateSalary function to update salary calculations
      calculateSalary(); // Call to recalculate salary

      return updatedInputs;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    calculateSalary();
    console.log(inputs);
    await sendRequest();
    window.alert("Salary Added successfully!");
    window.location.href = "/staff_manager_dash";
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:3000/api/staffMemberSalary", inputs);
  };

  //Salary calculatin part
  const salaryMapping = {
    "Stock Manager": 1000,
    "Paking Manager": 1000,
    "Vehicle Manager": 1500,
    "Product Manager": 2000,
    "Notification Manager": 1200,
    "Order Manager": 1200,
  };
  const calculateSalary = () => {
    const { baseSalary, OvertimeHours, OvertimeRate, Bonuses, Deductions } =
      inputs;

    // Convert values to numbers for calculations
    const baseSalaryNum = parseFloat(baseSalary) || 0;
    const overtimeHoursNum = parseFloat(OvertimeHours) || 0;
    const overtimeRateNum = parseFloat(OvertimeRate) || 0;
    const bonusesNum = parseFloat(Bonuses) || 0;
    const deductionsNum = parseFloat(Deductions) || 0;

    // Calculate Regular Pay
    const regularPay = baseSalaryNum * 160; // Assuming 160 hours for a month
    // Calculate Overtime Pay
    const overtimePay = overtimeHoursNum * baseSalaryNum * overtimeRateNum;
    // Calculate Total Salary
    const totalSalary = regularPay + overtimePay + bonusesNum - deductionsNum;

    // Update the Total Salary in state
    setInputs((prevInputs) => ({
      ...prevInputs,
      OvertimePay: overtimePay,
      TotalSalary: totalSalary,
    }));
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col bg-white text-gray-800">
        <div className="flex-grow py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-6 text-teal-600">
              Calculate Staff Member Salary
            </h1>
            <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-300">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="">
                  <div className="space-y-4">
                    <div className="flex" style={{ gap: "15px" }}>
                      <div className="flex-1">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Member ID
                        </label>
                        <input
                          type="text"
                          id="memberID"
                          name="memberID"
                          value={inputs.memberID}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          readOnly
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="memberType"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Role
                        </label>
                        <input
                          type="text"
                          id="memberType"
                          name="memberType"
                          value={inputs.memberType}
                          onChange={handleChange}
                          readOnly
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex" style={{ gap: "15px" }}>
                      <div className="flex-1">
                        <label
                          htmlFor="baseSalary"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Base Salary
                        </label>
                        <input
                          type="number"
                          id="baseSalary"
                          name="baseSalary"
                          value={inputs.baseSalary}
                          readOnly
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="type"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Overtime Hours
                        </label>
                        <input
                          type="number"
                          id="OvertimeRate"
                          name="OvertimeRate"
                          value={inputs.OvertimeRate}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex" style={{ gap: "15px" }}>
                      <div className="flex-1">
                        <label
                          htmlFor="OvertimeRate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Overtime Rate
                        </label>
                        <input
                          type="number"
                          id="OvertimeHours"
                          name="OvertimeHours"
                          value={inputs.OvertimeHours}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={inputs.date}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex" style={{ gap: "15px" }}>
                      <div className="flex-1">
                        <label
                          htmlFor="Bonuses"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Bonuses
                        </label>
                        <input
                          type="number"
                          id="Bonuses"
                          name="Bonuses"
                          value={inputs.Bonuses}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="Deductions"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Deductions
                        </label>
                        <input
                          type="number"
                          id="Deductions"
                          name="Deductions"
                          value={inputs.Deductions}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex" style={{ gap: "15px" }}>
                      <div className="flex-1">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Overtime Pay
                        </label>
                        <input
                          type="text"
                          id="OvertimePay"
                          name="OvertimePay"
                          value={inputs.OvertimePay}
                          onChange={handleChange}
                          required
                          readOnly
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="TotalSalary"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Total Salary
                        </label>
                        <input
                          id="TotalSalary"
                          name="TotalSalary"
                          value={inputs.TotalSalary}
                          onChange={handleChange}
                          required
                          readOnly
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
                  >
                    Add Salary
                  </button>
                </div>
              </form>
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
    </div>
  );
}

export default GenarateSalary;
