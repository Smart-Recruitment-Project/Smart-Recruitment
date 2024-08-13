import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        Password: '',
        Cpassword: '',
        College: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.Password !== formData.Cpassword) {
            alert("Passwords do not match!");
            return;
        }

        const { FirstName, LastName, Email, Phone, Password, College } = formData;

        try {
            const response = await axios.post('http://localhost:8000/register', {
                FirstName,
                LastName,
                Email,
                Phone,
                Password,
                College
            });
            if (response.status === 200) {
                alert(response.data.message);
            } else {
                alert(response.data.error);
            }
        } catch (error) {
            console.error("There was an error registering the user!", error);
            alert("Registration failed!");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Student Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="FirstName" className="block text-gray-700">First Name</label>
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
                    <label htmlFor="LastName" className="block text-gray-700">Last Name</label>
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
                    <label htmlFor="Email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="Email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Phone" className="block text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        id="Phone"
                        name="Phone"
                        value={formData.Phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="Password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Cpassword" className="block text-gray-700">Confirm Password</label>
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
                    <label htmlFor="College" className="block text-gray-700">College</label>
                    <input
                        type="text"
                        id="College"
                        name="College"
                        value={formData.College}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;