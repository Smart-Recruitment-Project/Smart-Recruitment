import React from 'react';
import Collegefeed from '../Pages/Collegefeed.js';

export default function MainContent({ selectedMenu }) {
  return (
    <div
      className="bg-[#2f344a] ml-5 mr-5 w-full text-white border-r border-gray-600 rounded-lg flex justify-center items-start"
      style={{ maxHeight: 'calc(100vh - 10rem)', overflowY: 'auto' }}
    >
      {selectedMenu === 'Feeds' &&  <Collegefeed/>}
      {selectedMenu === 'View Companies' && <div>View Companies</div>}
      {selectedMenu === 'Add Company' && <div>Add Company</div>}
      {selectedMenu === 'Test/Report' && <div>Test/Report</div>}
      {selectedMenu === 'View Student' && <div>View Student</div>}
      {selectedMenu === 'Add Employee' && <div>Add Employee</div>}
    </div>
  );
}