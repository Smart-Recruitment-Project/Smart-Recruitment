import React from 'react';
import logo from './images/logo.png';
import jobs from './images/image1.png';


export default function Landing() {
  return (
    <body class="bg-slate-900 min-h-full ">
        <div class="">
            <div class="flex flex-col">
                <nav class="fixed top-0 left-0 bg-slate-900 min-w-full max-h-16 flex flex-row flex-wrap justify-between items-center">
                    <img class="h-16 ml-0 p-3 pt-1" src={logo} alt="logo"/>
                    <ul class="flex flex-row justify-between flex-wrap text-white font-bold leading-9 tracking-tight">
                        <li class="p-7 pt-3 hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out"><a href="#header">Home</a></li>
                        <li class="p-7 pt-3 hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out"><a href="#about">About</a></li>
                        <li class="p-7 pt-3 hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out"><a href="#services">Services</a></li>
                        <li class="p-7 pt-3 hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out"><a href="#portfolio">Portfolio</a></li>
                        <li class="p-7 pt-3 hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out"><a href="#contact">Contact</a></li>
                    </ul>
                
                </nav>
                <div class="flex flex-row justify-between  items-center">
                    <div class="flex flex-col m-28 mt-32     text-6xl font-bold text-white">
                        <h1 class="p-3">Smart </h1>
                        <h1 class="p-3">Campus</h1>
                        <h1 class="p-3">Recruitment</h1>
                        <div class="flex flex-row justify-between m-7 ml-0">
                            <button class="text-base w-36 border border-yellow-400 text-yellow-400 p-2 pl-5 pr-5 rounded-2xl bg-slate-900 hover:bg-yellow-400 hover:text-black hover:scale-125 transition duration-300 hover:ease-in-out hover:shadow-lg hover:shadow-yellow-400/30">Sign in</button>                    
                            <button class="text-base w-36 border border-yellow-400 text-yellow-400 p-2 pl-5 pr-5 rounded-2xl bg-slate-900 hover:bg-yellow-400 hover:text-black hover:scale-125 transition duration-300 hover:ease-in-out hover:shadow-lg hover:shadow-yellow-400/20">Sign up</button>                    
                        </div>
                    </div>
                    <div class="h-screen mr-5">     
                        <img class="h-full rounded-3xl border-yellow-400 p-2" src={jobs} alt="jobs"></img>
                    </div>
                </div>
            </div>
        </div>
    </body>
  )
}