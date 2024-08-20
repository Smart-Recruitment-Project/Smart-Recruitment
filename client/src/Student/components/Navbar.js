import React from 'react';
import './style.css'
export default function Navbar({ title, onLogout }) {
  return (
    <div className="navbar">
      <div className="logo">Logo</div>
      <div className="title">{title}</div>
      <div className="avatar" onClick={onLogout}>Avatar</div>
    </div>
  );
}