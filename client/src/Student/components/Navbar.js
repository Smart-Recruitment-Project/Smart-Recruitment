import React from 'react';
import './style.css'
import logo from '../../images/logo.png'

export default function Navbar({ title, onLogout }) {
  return (
    <nav class="fixed bg-slate-900 min-w-full max-h-16 flex flex-row flex-wrap justify-between items-center border-b border-gray-600 z-50">
      <img class="h-16 ml-16 mt-2 p-3 pt-1" src={logo} alt="logo" />
      <div className="title text-yellow-400 text-2xl font-bold">{title}</div>
      <div className="avatar text-white font-bold mr-12" onClick={onLogout}>Avatar</div>
    </nav>
  );
}