import React from 'react';
export default function SideMenu({ onSelect }) {
  return (
    <div class=" bg-[#272a3a] text-white w-[30%] border-gray-600 rounded-lg ml-10 p-10 py-5 justify-self-center " style={{ height: 'calc(100vh - 10rem)' }}>
      <div class="flex justify-between items-center h-full flex-col  text-xl font-bold">
        <button class="mt-0 text-lg hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Feeds')}>Feeds</button>
        <button class="text-lg hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('View Companies')}>View Companies</button>
        <button class="text-lg hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Add Company')}>Add Company</button>
        <button class="text-lg hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Test/Report')}>Test/Report</button>
        <button class="text-lg hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('View Student')}>View Student</button>
        <button class="text-lg hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Add Employee')}>Add Employee</button>
      </div>
    </div>
  );
}