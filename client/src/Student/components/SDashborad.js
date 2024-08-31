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
    <div class="bg-white">
      <Navbar title={selectedMenu} onLogout={handleLogout} />
      <div className="dashboard">
        <SideMenu onSelect={handleSelectMenu} />
        <MainContent selectedMenu={selectedMenu} />
      </div>
    </div>
  );
}