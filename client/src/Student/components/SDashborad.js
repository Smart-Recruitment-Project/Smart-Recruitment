import React, { useState } from 'react';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import MainContent from './MainContent';
import './style.css';

export default function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState('Home');

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  const handleLogout = () => {
    
    console.log('Logout clicked');
  };

  return (
    <>
      <Navbar title={selectedMenu} onLogout={handleLogout} />
      <div className="dashboard bg-slate-900">
        <SideMenu onSelect={handleSelectMenu} />
        <MainContent selectedMenu={selectedMenu} />
      </div>
    </>
  );
}