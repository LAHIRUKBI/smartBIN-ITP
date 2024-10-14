import { useState, useEffect } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { FaUser, FaCalendarAlt, FaBarcode, FaCaretDown } from "react-icons/fa";
function AddStaffMember() {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    phone: "",
    memberID: "",
    memberType: "",
    dob: "",
    nic: "",
    email: "",
  });
  const generateID = () => {
    const prefix = "SMID ";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
  };
  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      memberID: generateID(),
    }));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Member Added successfully!");
    window.location.href = "/staff_manager_dash";
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:3000/api/staffMember", inputs);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <div className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6 text-teal-600">
            Add New Staff Member
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
                        <FaBarcode className="inline mr-2" /> Member ID
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
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        <FaUser className="inline mr-2" /> First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={inputs.firstName}
                        onChange={(e) => {
                          const re = /^[A-Za-z\s]*$/;
                          if (re.test(e.target.value)) {
                            handleChange(e);
                          }
                        }}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        placeholder="Lahiru"
                      />
                    </div>
                  </div>

                  <div className="flex" style={{ gap: "15px" }}>
                    <div className="flex-1">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        <FaUser className="inline mr-2" /> Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={inputs.lastName}
                        onChange={(e) => {
                          const re = /^[A-Za-z\s]*$/;
                          if (re.test(e.target.value)) {
                            handleChange(e);
                          }
                        }}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        placeholder="Bandara"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium text-gray-700"
                      >
                        <FaCaretDown className="inline mr-2" /> Select Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={inputs.gender}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      >
                        <option value="" disabled>
                          Select a Type
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex" style={{ gap: "15px" }}>
                    <div className="flex-1">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        <FaPhoneAlt className="inline mr-2" /> Phone Number
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        value={inputs.phone}
                        onChange={(e) => {
                          const re = /^[0-9\b]{0,10}$/;
                          if (re.test(e.target.value)) {
                            handleChange(e);
                          }
                        }}
                        maxLength="10"
                        pattern="[0-9]{10}"
                        title="Please enter exactly 10 digits."
                        required
                        placeholder="0778945123"
                      />
                    </div>

                    <div className="flex-1">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        <FaCalendarAlt className="inline mr-2" /> Birthday
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={inputs.dob}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex" style={{ gap: "15px" }}>
                    <div className="flex-1">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        <MdAttachEmail className="inline mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={inputs.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        placeholder="Bandara@gmail.com"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium text-gray-700"
                      >
                        <FaCaretDown className="inline mr-2" /> Select Member
                        Type
                      </label>
                      <select
                        id="service"
                        name="memberType"
                        value={inputs.memberType}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      >
                        <option value="" disabled>
                          Select a Type
                        </option>
                        <option value="Stock Manager">Stock Manager</option>
                        <option value="Paking Manager">Paking Manager</option>
                        <option value="Vehical Manager">Vehical Manager</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Notification Manager">
                          Notification Manager
                        </option>
                        <option value="Order Manager">Order Manager</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FaLocationDot className="inline mr-2" /> Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={inputs.address}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
                >
                  Add Member
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
  );
}

export default AddStaffMember;
