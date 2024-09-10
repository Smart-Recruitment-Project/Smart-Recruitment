import React, { useState } from 'react';
import axios from 'axios';
import logo from '../images/logo.png';
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log('email:', email);
    console.log('password:', password);

    try {
      const response = await axios.post('http://localhost:8000/login', {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        alert(response.data.message);
        const token = response.data.token;
        localStorage.setItem('token', token);
        const username = response.data.username;
        alert(username);
        navigate(response.data.redirect + `?username=${username}`);
    } else {
        alert(response.data.error);
    }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setError(err.response.data.error);
      } else {
        setError('There was an error logging in the user!');
      }
    }
  };

  return (
    <body class="flex bg-slate-900 h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm rounded-lg shadow-md shadow-gray-500/50 justify-center items-center p-6 bg-customBlue">
          <img
            alt="Your Company"
            src={logo}
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-50 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>       
        <form onSubmit={handleSubmit} class="signin-box">
          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Email address
            </label>
            <input
              type="email"
              class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div class="mt-4">
            <div class="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Password
              </label>
              <div className="text-sm">
                <a href="./forgot.js" className="font-semibold text-yellow-400 hover:text-red-400">
                  Forgot password?
                </a>
              </div>
            </div>
            <input
              type="password"
              class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-bold leading-6 text-slate-900 hover:shadow-lg hover:bg-red-800 hover:text-white  mt-7 "
              >
                Sign in
              </button>
            </div>
        </form>
      </div>
    </body>
    
  );
}

export default LoginForm;