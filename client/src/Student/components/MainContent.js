import React from 'react';
import './style.css';
import Feed from '../Pages/feed.js';
export default function MainContent({ selectedMenu }) {
  return (
    <div className="bg-slate-900 mt-16 ml-72 w-full h-fit text-white">
      {selectedMenu === 'Home' && <Feed/>}
      {selectedMenu === 'All Companies' && <div>All Companies </div>}
      {selectedMenu === 'Applied Companies' && <div>Applied Companies Content</div>}
      {selectedMenu === 'Update Profile' && <div>Update Profile Content</div>}
      {selectedMenu === 'Test' && <div>Test Content</div>}
    </div>
  );
}