import React from 'react';
import './style.css'
import logo from '../../images/logo.png'

export default function Navbar({ title, onLogout }) {
  return (
    <nav class="fixed bg-slate-900 min-w-full max-h-16 flex flex-row flex-wrap justify-between items-center">
      <img class="h-16 ml-0 p-3 pt-1" src={logo} alt="logo" />
      <ul class="flex flex-row justify-between flex-wrap text-white font-bold leading-9 tracking-tight">
        <li class="p-7 pt-3"><a href="#header">Home</a></li>
        <li class="p-7 pt-3"><a href="#about">About</a></li>
        <li class="p-7 pt-3"><a href="#services">Services</a></li>
        <li class="p-7 pt-3"><a href="#portfolio">Portfolio</a></li>
        <li class="p-7 pt-3"><a href="#contact">Contact</a></li>
      </ul>

    </nav>

  );
}