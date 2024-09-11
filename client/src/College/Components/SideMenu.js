import React from 'react';
export default function SideMenu({ onSelect }) {
  return (
    <div class=" bg-[#2f344a] text-white w-72 border-r border-gray-600 rounded-lg ml-10 p-20 justify-self-center " style={{ height: 'calc(100vh - 10rem)' }}>
      <div class="flex justify-center  flex-col  text-xl font-bold">
        <button class="m-5 text-lg hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Feeds')}>Feeds</button>
        <button class="m-5 text-lg hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('View Companies')}>View Companies</button>
        <button class="m-5 text-lg hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Add Company')}>Add Company</button>
        <button class="m-5 text-lg hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Test/Report')}>Test/Report</button>
        <button class="m-5 text-lg hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('View Student')}>View Student</button>
        <button class="m-5 text-lg hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Add Employee')}>Add Employee</button>
      </div>
    </div>
  );
}