import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AddRegistration = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    College: "",
    year_of_study: "",
    contact_info: ""
  });
  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get("http://localhost:8000/colleges");
        if (Array.isArray(response.data.colleges)) {
          setColleges(response.data.colleges);
        } else {
          console.error("Fetched data is not an array:", response.data);
        }
      } catch (error) {
        console.error("There was an error fetching the colleges!", error);
      }
    };
    fetchColleges();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { FirstName, LastName, College, year_of_study, contact_info } = formData;

    try {
      const response = await axios.post("http://localhost:8000/addRegistration", {
        username,
        FirstName,
        LastName,
        College,
        year_of_study,
        contact_info
      });
      if (response.status === 200) {
        alert(response.data.message);
        navigate("/login");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("There was an error registering the user!", error);
      alert("Registration failed!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="bg-slate-900 px-6 py-12 lg:px-8">
      <div className="max-w-md mx-auto mt-10 p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Student Registration Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="FirstName" className="block text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="FirstName"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="LastName" className="block text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="LastName"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="College" className="block text-gray-700">
              College
            </label>
            <select
              id="College"
              name="College"
              value={formData.College}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select your college</option>
              {colleges.map((college) => (
                <option key={college.id} value={college.college_name}>
                  {college.college_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="year_of_study" className="block text-gray-700">
              Year of Study
            </label>
            <input
              type="text"
              id="year_of_study"
              name="year_of_study"
              value={formData.year_of_study}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact_info" className="block text-gray-700">
              Contact Info
            </label>
            <input
              type="text"
              id="contact_info"
              name="contact_info"
              value={formData.contact_info}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRegistration;
