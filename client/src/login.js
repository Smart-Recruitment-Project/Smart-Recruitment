import React, { useState } from 'react';
import axios from 'axios';
import './login.css'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const response = await axios.post('http://localhost:8000/login', {
        Email: email,
        Password: password,
      });
      console.log(response.data);
      // Handle successful login, e.g., redirect to dashboard
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setError(err.response.data.error);
      } else {
        setError('There was an error logging in the user!');
      }
    }
  };

  return (
    <body>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit} class="signin-box">
        <div class="inputs">
          {/* <label>Email:</label> */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div class="inputs">
          {/* <label>Password:</label> */}
          <input
            type="password"
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
        <a href='#'>Forgot Password?</a>
      </form>
    </body>
  );
}

export default LoginForm;