import React from 'react';
import './style.css';
export default function SideMenu({ onSelect }) {

  

  return (
    <div class=" bg-[#272a3a] text-white w-[30%] border-gray-600 rounded-lg ml-10 p-10 py-5 justify-self-center " style={{ height: 'calc(100vh - 10rem)' }}>
      <div class="flex justify-between flex-col text-lg font-bold h-full">
        <button class="hover:text-white hover:scale-150 transition duration-300 hover:ease-in-out " onClick={() => onSelect('Home')}>Home</button>
        <button class="hover:text-white hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('All Companies')}>All Companies</button>
        <button class="hover:text-white hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Applied Companies')}>Applied Companies</button>
        <button class="hover:text-white hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Update Profile')}>Update Profile</button>
        <button class="hover:text-white hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Test')}>Test</button>
      </div>
    </div>
  );
}