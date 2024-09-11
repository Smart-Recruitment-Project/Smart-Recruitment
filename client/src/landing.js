import React from 'react';
import logo from './images/logo.png';
import jobs from './images/image2.png';


export default function Landing() {
  return (
    <div class="bg-slate-900 min-h-screen">
    <div class="">
        <div class="flex flex-col">
            <nav class="fixed top-0 left-0 bg-slate-900 min-w-full max-h-16 border-b border-gray-600 z-50">
                <div class="mx-16 my-2 flex flex-row flex-wrap justify-between items-center">
                    <img class="h-16 ml-0 mb-3 p-3 pt-1" src={logo} alt="logo" />
                    <ul class="flex flex-row justify-between flex-wrap text-white font-bold leading-9 tracking-tight">
                        <li class="p-7 pt-3 hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out"><a href="#header">Home</a></li>
                        <li class="p-7 pt-3 hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out"><a href="#about">About</a></li>
                        <li class="p-7 pt-3 hover:text-yellow-400 hover:scale-150 transition duration-300 hover:ease-in-out"><a href="#contact">Contact</a></li>
                    </ul>
                </div>

            </nav>
            <div class="flex flex-row justify-between items-center mt-20">
                <div class="flex flex-col m-16 mt-0 z-20 text-6xl font-bold text-white">
                    <h1 class="p-3">Smart </h1>
                    <h1 class="p-3">Campus</h1>
                    <h1 class="p-3">Recruitment</h1>
                    <div class="flex flex-row justify-between m-7 ml-0">
                        <button class="text-base w-36 border border-yellow-400 text-yellow-400 p-2 pl-5 pr-5 rounded-2xl bg-slate-900 hover:bg-yellow-400 hover:text-black hover:scale-125 transition duration-300 hover:ease-in-out hover:shadow-lg hover:shadow-yellow-400/30" onClick={() => window.location.href = '/login'}>Sign in</button>
                        <button class="text-base w-36 border border-yellow-400 text-yellow-400 p-2 pl-5 pr-5 rounded-2xl bg-slate-900 hover:bg-yellow-400 hover:text-black hover:scale-125 transition duration-300 hover:ease-in-out hover:shadow-lg hover:shadow-yellow-400/20" onClick={() => window.location.href = '/signup'}>Sign up</button>
                    </div>
                </div>
                <div class="h-screen mr-5 ">
                    <img class="h-full rounded-3xl z-10 border-yellow-400 p-2" src={jobs} alt="jobs"></img>
                </div>
            </div>
            <div class="flex flex-col items-start m-10">
            <h1 class="text-white text-4xl font-bold m-5">About</h1>
            <p class="text-white m-5 text-lg"> We believe that recruitment should be as dynamic and innovative as the world we live in. Our mission is to revolutionize the hiring process by leveraging cutting-edge technology, data-driven insights, and a deep understanding of human potential. We are committed to making recruitment smarter, faster, and more personalized. Whether you’re an employer looking for the next superstar or a job seeker aiming for your dream role, our platform empowers you to achieve your goals. We are not just a recruitment service; we are your partner in building a better future.
            </p>
            </div>
            <div class="flex flex-col items-start m-10">
                <h1 class="text-white text-4xl font-bold m-5 ">Contact Us</h1>
                <form class="w-3/4">
                    <input
                        type="text"
                        class="block w-full rounded-md border-0 p-3 bg-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 opacity-75 m-5"
                        placeholder="Enter Name" />
                    <input
                        type="email"
                        class="block w-full rounded-md border-0 p-3 bg-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 m-5 opacity-75"
                        placeholder="Enter Email Address" />
                    <textarea name="Message" rows="6" class="block w-full rounded-md border-0 p-3  bg-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 m-5 opacity-75"
                        placeholder="Your Message" />
                    <button
                        type="submit"
                        className="flex w-24 justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-bold leading-6 text-slate-900 hover:shadow-lg hover:bg-red-800 hover:text-white m-5"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
  </div>
  )
}