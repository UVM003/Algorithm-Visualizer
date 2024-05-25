"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { CgProfile } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const main = () => {
const [showPro, setshowPro] = useState(false)
const [isFadingOut, setIsFadingOut] = useState(false);

const handleClick = () => {
    setshowPro(true);
    setIsFadingOut(false);
}


  const handleExploreClick = () => {
    setIsFadingOut(true);
    setTimeout(() => setshowPro(false), 500); // Match the duration of the CSS transition
  };
  
  return (
    <div className='relative w-full h-screen bg-zinc-900'>
           {showPro && (
        <div className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 ${isFadingOut ? 'fade-exit-active':'fade-enter-active'}`}>
          <div className="bg-slate-300 rounded-lg shadow-lg p-6 w-3/5 h-1/2">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-900">Hello!</h2>
              <p className="text-gray-800 mb-4">
              I'm Venkatachala Melady U, an Information Science Engineering student at JSSATEB. Welcome to my web application, designed to help you visualize algorithms for a deeper understanding. This project not only aims to demystify complex algorithms but also serves as a platform for me to hone my JavaScript and React skills.
              </p>
              <p className="text-gray-800 mb-6">
              I hope you find this tool insightful and engaging. For the best experience, please view it on a PC. I would love to hear your feedback and suggestions—feel free to connect with me on LinkedIn.
              </p>
              <button 
                 onClick={handleExploreClick} 
                className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      )}
       <div className="flex gap-10 rounded items-center justify-center w-full h-28 bg-slate-800 ">
        <p className='hover:text-orange-600 font-serif  font-bold text-[3rem] text-slate-400'>ALGORITHM </p>
        <p className='hover:text-orange-600 font-serif  font-bold text-[3rem] text-slate-400'> VISUALIZER</p>
       </div>
       <div className='flex mt-6 gap-5 ml-20'><CgProfile color="#90A8C3" size="2.5em" className='hover:cursor-pointer' onClick={handleClick} />
       <a href='https://github.com/UVM003/Algorithm-Visualizer'target="_blank" rel="noopener noreferrer"><FaGithub color="#90A8C3" size="2.2em" className='hover:cursor-pointer'/></a>
       <a href="https://www.linkedin.com/in/venkatachala-melady-u-4838b3228" target="_blank" rel="noopener noreferrer"><FaLinkedin color="#90A8C3" size="2.2em" className='hover:cursor-pointer'/></a></div>
  <div className="flex flex-col items-center space-y-8 mt-[6rem]">
  
    <Link href="/Sorting">
      <button className="py-3 shadow-slate-500 px-4 rounded-lg shadow-md bg-slate-700 hover:text-orange-400 font-bold text-3xl text-slate-400">
        Sorting Algorithms
      </button>
      </Link>
      <Link href="/Counting">
      <button className="py-3 shadow-slate-500 w-[19rem] px-4 rounded-lg shadow-md bg-slate-700 hover:text-orange-400 font-bold text-3xl text-slate-400">
        Counting Sort 
      </button>
      </Link>
    <Link href="/Hauffman">
      <button className="py-3 px-3 shadow-slate-500 rounded-lg shadow-md bg-slate-700 hover:text-orange-400 font-bold text-3xl text-slate-400">
        Hauffman Encoding
      </button>
    </Link>
    <Link href="/Kmeans">
      <button className="py-3 px-2 w-[19rem] shadow-slate-500 rounded-lg shadow-md bg-slate-700 hover:text-orange-400 font-bold text-3xl text-slate-400">
        K-means Clustering
      </button>
    </Link>
  </div>
</div>

  )
}

export default main