import React from 'react';
import './style.css';
export default function SideMenu({ onSelect }) {
  return (
    <div class="fixed mt-16 bg-slate-900 text-white w-72 h-screen border-r border-gray-600 ">
      <div class="flex flex-col m-12 text-xl font-bold">
        <button class="m-5 text-lg hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Home')}>Home</button>
        <button class="m-5 text-lg hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('All Companies')}>All Companies</button>
        <button class="m-5 text-lg hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Applied Companies')}>Applied Companies</button>
        <button class="m-5 text-lg hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Update Profile')}>Update Profile</button>
        <button class="m-5 text-lg hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out" onClick={() => onSelect('Test')}>Test</button>
      </div>
    </div>
  );
}