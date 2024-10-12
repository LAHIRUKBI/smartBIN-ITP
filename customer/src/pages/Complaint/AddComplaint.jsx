import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaCalendarAlt, FaBarcode, FaCaretDown } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

function AddComplaint() {
  const [inputs, setInputs] = useState({
    name: "",
    ComplainID: "",
    ComplainType: "",
    date: "",
    message: "",
    email: "",
  });
  const generateID = () => {
    const prefix = "CID";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
  };
  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      ComplainID: generateID(),
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
    window.alert("Complain Send successfully!");
    window.location.href = "/mycomplaint";
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:3000/api/complain", inputs);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <div className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6 text-teal-600">
            Complaint
          </h1>
          <div className="flex justify-start mb-5">
            <button
              onClick={() => (window.location.href = "/mycomplaint")}
              type="submit"
              className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
            >
              My Complaint
            </button>
          </div>
          <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-300">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FaBarcode className="inline mr-2" /> Complain ID
                    </label>
                    <input
                      type="text"
                      id="ComplainID"
                      name="ComplainID"
                      value={inputs.ComplainID}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FaUser className="inline mr-2" /> Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={inputs.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="Lahiru Bandara"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FaUser className="inline mr-2" /> Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={inputs.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="Lahiru Bandara"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FaCaretDown className="inline mr-2" /> Select Type
                    </label>
                    <select
                      id="service"
                      name="ComplainType"
                      value={inputs.ComplainType}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    >
                      <option value="" disabled>
                        Select a Type
                      </option>
                      <option value="type1">Type 1</option>
                      <option value="type2">Type 2</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FaCalendarAlt className="inline mr-2" /> Date
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

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FaMessage className="inline mr-2" /> Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={inputs.message}
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
                  Submit Complaint
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

export default AddComplaint;
