import React from 'react';
import './style.css'
import logo from '../../images/logo.png'

export default function Navbar({ title, onLogout }) {
  return (
    <nav class="bg-slate-900 min-w-full max-h-16 flex flex-row flex-wrap justify-between items-center border-b-2">
      <img class="h-16 ml-0 p-3 pt-1" src={logo} alt="logo" />
      <div className="title text-white font-bold">{title}</div>
      <div className="avatar text-white font-bold" onClick={onLogout}>Avatar</div>
    </nav>
  );
}