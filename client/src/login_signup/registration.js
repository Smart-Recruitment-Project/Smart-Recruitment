import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../images/logo.png';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    Cpassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.Cpassword) {
      alert("Please fill all the fields");
      return;
    }
  
    if (formData.password !== formData.Cpassword) {
      alert("Passwords do not match!");
      return;
    }
  
    const role = "Student";
    const { username, email, password } = formData;
    
  
    try {
      const response = await axios.post("http://localhost:8000/register", {
        Username: username,
        Email: email,
        Password: password,
        role:role,
      });
      if (response.status === 200) {
        alert(response.data.message);
        navigate(`/addRegistration?username=${username}`);
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("There was an error registering the user!", error);
    }
  };

  return (
    <div className="bg-slate-900 px-6 py-4 lg:px-8">
      <div className="max-w-md mx-auto p-6">
        <img
            alt="Your Company"
            src={logo}
            className="mx-auto h-16 w-auto"
          />
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Student Registration Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-400 py-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 py-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-400 py-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Cpassword" className="block text-gray-400 py-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="Cpassword"
              name="Cpassword"
              value={formData.Cpassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 bg-yellow-400 text-slate-900 font-bold rounded-lg hover:bg-red-800 hover:text-white"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
