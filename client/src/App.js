import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './login.js';
import RegistrationForm from './registration.js';

function App() {
  return (
    <div>
      <BrowserRouter> 
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RegistrationForm />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;