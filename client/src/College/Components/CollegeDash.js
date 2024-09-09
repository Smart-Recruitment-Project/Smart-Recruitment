import React, { useState } from 'react';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import MainContent from './MainContent';

export default function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState('Home');

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="bg-slate-900 h-screen fixed w-full">
      <div className="pt-5 ml-10 mr-5 mb-5">
        <Navbar title={selectedMenu} onLogout={handleLogout} />
      </div>
      <div className="dashboard flex h-full">
        <SideMenu onSelect={handleSelectMenu} />
        <MainContent selectedMenu={selectedMenu} />
      </div>
    </div>
  );
}