import React from 'react';
import './style.css';
import Feed from '../Pages/feed.js';
import Allcompanies from '../Pages/allcompanies.js';
import Appliedcompany from '../Pages/appliedcompany.js'

export default function MainContent({ selectedMenu }) {
  return (
    <div
      className="bg-[#272a3a] ml-5 mr-5 w-full text-white border-gray-600 rounded-lg flex justify-center items-start"
      style={{ maxHeight: 'calc(100vh - 10rem)', overflowY: 'auto' }}
    >
      {selectedMenu === 'Home' && <Feed />}
      {selectedMenu === 'All Companies' && <Allcompanies />}
      {selectedMenu === 'Applied Companies' && <Appliedcompany/>}
      {selectedMenu === 'Update Profile' && <div>Update Profile Content</div>}
      {selectedMenu === 'Test' && <div>Test Content</div>}
    </div>
  );
}