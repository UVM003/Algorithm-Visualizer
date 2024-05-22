import React from 'react'
import Link from 'next/link'
const page = () => {
  return (
    <div className='w-full h-screen bg-zinc-900'>
       <div className="flex gap-10 rounded items-center justify-center w-full h-28 bg-slate-800 ">
        <p className='hover:text-orange-600 font-serif  font-bold text-[3rem] text-slate-400'>ALGORITHM </p>
        <p className='hover:text-orange-600 font-serif  font-bold text-[3rem] text-slate-400'> VISUALIZER</p>
       </div>
  <div className="flex flex-col items-center space-y-8 mt-[10rem]">
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

export default page