import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './login.js';
import Forgot from './forgot.js';
import RegistrationForm from './registration.js';
import SDashboard from './Student/components/SDashborad.js';
import Landing from './landing.js';
import Index from './index.css';
function App() {
  return (
    <div>
      <BrowserRouter> 
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot" element={<Forgot/>}/>
          <Route path="/" element={<Landing/>}/>
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/SDashboard" element={<SDashboard />} /> 
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;