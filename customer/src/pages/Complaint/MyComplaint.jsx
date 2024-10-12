/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:3000/api/complain";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function MyComplaint() {
  const [complain, setComplain] = useState([]); // Initialize as an empty array
  const [filteredComplaints, setFilteredComplaints] = useState([]); // Store filtered complaints
  const [email, setEmail] = useState(""); // Store user input email
  const [error, setError] = useState(""); // Store error message

  useEffect(() => {
    // Fetch complaints from the server
    fetchHandler().then((data) => setComplain(data.complaint || [])); // Set to an empty array if undefined
  }, []);

  const handleSearch = () => {
    // Filter complaints based on the entered email
    const filtered = complain.filter((item) => item.email === email);

    if (filtered.length === 0) {
      setError("No complaints found for the entered email.");
    } else {
      setError(""); // Clear any previous errors
    }

    setFilteredComplaints(filtered); // Update the filtered complaints state
  };

  return (
    <div>
      <div className="findname">
      
        <input
          className="inputemail"
          type="email"
          placeholder="Enter your email and find complaint"
          value={email} // Bind input to state
          onChange={(e) => setEmail(e.target.value)} // Update email state on change
        />

        <button className="search_btn" onClick={handleSearch}>
          Find
        </button>
      </div>
      <section className="py-16 ml-10 mr-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((item, index) => (
                <div
                  key={index} // Adding key prop for each mapped element
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                >
                  <h2 className="text-2xl font-bold mb-4 text-teal-600">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">
                    <b>ComplainType:</b> {item.ComplainType}
                  </p>
                  <p className="text-gray-600">
                    <b>Date:</b> {item.date}
                  </p>
                  <p className="text-gray-600">
                    <b>Email:</b> {item.email}
                  </p>
                  <p className="text-gray-600">
                    <b>Message:</b> {item.message}
                  </p>
                  <p className="text-gray-600">
                    <b>Reply:</b> {item.reply || "Not Yet Reply"}{" "}
                  </p>
                </div>
              ))
            ) : (
              <p></p> // Fallback if no complaints are found for the entered email
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyComplaint;
