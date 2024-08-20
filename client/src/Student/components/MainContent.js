import React from 'react';
import './style.css';
export default function MainContent({ selectedMenu }) {
  return (
    <div className="main-content">
      {selectedMenu === 'Home' && <div>Feed</div>}
      {selectedMenu === 'All Companies' && <div>All Companies Content</div>}
      {selectedMenu === 'Applied Companies' && <div>Applied Companies Content</div>}
      {selectedMenu === 'Update Profile' && <div>Update Profile Content</div>}
      {selectedMenu === 'Test' && <div>Test Content</div>}
    </div>
  );
}