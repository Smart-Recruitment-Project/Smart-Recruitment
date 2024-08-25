import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './login_signup/login.js';
import Forgot from './login_signup/forgot.js';
import RegistrationForm from './login_signup/registration.js';
import SDashboard from './Student/components/SDashborad.js';
import Landing from './landing.js';
import Addsignup from './login_signup/addregistration.js';
import './index.css';
function App() {
  return (
    <div>
      <BrowserRouter> 
        <Routes>
         <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot" element={<Forgot/>}/>
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/addRegistration" element={<Addsignup/>} />
          <Route path="/student-dashboard" element={<SDashboard/>} /> 
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;