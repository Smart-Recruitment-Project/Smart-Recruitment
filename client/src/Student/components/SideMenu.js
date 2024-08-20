import React from 'react';
import './style.css';
export default function SideMenu({ onSelect }) {
  return (
    <div className="side-menu">
      <button onClick={() => onSelect('Home')}>Home</button>
      <button onClick={() => onSelect('All Companies')}>All Companies</button>
      <button onClick={() => onSelect('Applied Companies')}>Applied Companies</button>
      <button onClick={() => onSelect('Update Profile')}>Update Profile</button>
      <button onClick={() => onSelect('Test')}>Test</button>
    </div>
  );
}