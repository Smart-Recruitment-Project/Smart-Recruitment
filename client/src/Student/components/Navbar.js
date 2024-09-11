import React from 'react';
import './style.css';
import logo from '../../images/logo.png';
import avatar from '../../images/avatar.png';

export default function Navbar({ title, onLogout }) {
  return (
    <nav className="bg-[#272a3a] min-w-full flex flex-row flex-wrap justify-between items-center border-gray-600 shadow-lg rounded-lg z-50 p-3">
      <img className="h-16 ml-10" src={logo} alt="logo" />
      <div className="title text-white text-2xl font-bold">{title}</div>
      <img className="h-16 mr-10 cursor-pointer" src={avatar} alt="avatar" onClick={onLogout} />
    </nav>
  );
}