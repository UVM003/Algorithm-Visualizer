"use client"
import React, { useEffect, useRef, useState } from 'react'
import { FaHome } from "react-icons/fa";
import Link from "next/link";
const Kmeans = () => {
const [pointsArray, setpointsArray] = useState([])
const [colors, setcolors] = useState(['#DC0F0C','#D4D245','#698F3F','#2D7DD2','#B11CAC'])
const [centroidColors, setcentroidColors] = useState(['#7C1817','#9B9802','#3B5D17','#024388','#72006E'])
const [noOfDots, setnoOfDots] = useState(100)
const [noOfCent, setnoOfCent] = useState(2)
const [centroids, setcentroids] = useState([])
const [iterations, setiterations] = useState(0)
const [lock, setlock] = useState(false)
const [dimensions, setDimensions] = useState({ width:960, height:530});
const [hideHome, sethideHome] = useState(true)
const divRef = useRef(null);


useEffect(() => {
  generateDots()
  setcentroids([])
  },[noOfCent,noOfDots])


useEffect(() => {
  if (centroids.length > 0) {
   setTimeout(kmeansClustering(),3000);
  }
}, [centroids]);

useEffect(() => {
  // Ensure the divRef.current is available
  if (divRef.current) {
    const { width, height } = divRef.current.getBoundingClientRect();
    setDimensions({ width, height });
  }},[noOfCent,noOfDots])

const generateDots = ()=>
        {
            let dots = [];
            for (let i = 0; i < noOfDots; i++) {
                const centerX=Math.random()*dimensions.width
                const centerY=Math.random()*dimensions.height
                for (let j = 0; j < (Math.random()*0.3*(31)); j++) {
                    const angle = Math.random()*2* Math.PI;
                    const radius = Math.random() *34; 
                    const x = centerX + radius * Math.cos(angle);
                     const y = centerY+ radius * Math.sin(angle);
                dots.push([x,y])
            }
           
        }
        setpointsArray([...dots])   
    }
 function kmeansClustering()
        {
            const dots=document.getElementsByClassName('points')
            const clusters=formClusters()
            for(let i=0;i<noOfCent;i++)
                {
                    for(let j=0;j<clusters[i].length;j++)
                    setTimeout(()=>{dots[clusters[i][j]].style.backgroundColor=colors[i]},(i * clusters[i].length + j))
                }
                setTimeout(()=>{
                const newCentroids = recomputeCentroids(clusters);
            
                if (!arraysEqual(centroids, newCentroids) && iterations < 10) {
                    setcentroids(newCentroids);
                    setiterations(iterations + 1);
                  }
                },2800)
        }
const initializeCentroids=(pointsArray)=>
        {
            let newCentroids=[]
            for(let i=0;i<noOfCent;i++)
                {
                    let idx=Math.floor(Math.random()*pointsArray.length)
                    newCentroids.push([pointsArray[idx][0],pointsArray[idx][1]])
                }
                setcentroids([...newCentroids]);
       }
const recomputeCentroids=(clusters)=>
        {
            let newCentroids=[];
            for(let i=0;i<noOfCent;i++)
                {
                    let x=0,y=0;
                    for(let j=0;j<clusters[i].length;j++)
                        {
                          x+= pointsArray[clusters[i][j]][0];
                          y+=pointsArray[clusters[i][j]][1];
                        }
                        x=x/clusters[i].length;
                        y=y/clusters[i].length;
                        newCentroids.push([x,y])
                }
                return newCentroids;
        }
  const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

 const formClusters = ()=>
        {
            const clusters = Array.from({ length: noOfCent }, () => []);
            for(let k=0;k<pointsArray.length;k++)
                {
                    let min=10000;
                    let idx=100;
            for(let i=0;i<noOfCent;i++)
                {
                    let cur=euclideanDistance(pointsArray[k],centroids[i])
                    if(cur<min)
                        {
                            min=cur;
                            idx=i;
                        }
                }
                clusters[idx].push(k)
            }
            return clusters;
        }

const euclideanDistance = (point1, point2) => {
            const x1=point1[0]
            const y1=point1[1]
            const x2=point2[0]
            const y2=point2[1]
            
            const deltaX = x2 - x1;
            const deltaY = y2 - y1;
            
            return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          };
        
  return (
    <>
      <div className="flex rounded gap-[18rem] relative items-center w-full h-28 bg-slate-800 ">
      <button
      className="text-white ml-32 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      onClick={()=>(window.location.reload())}>
            Reset
          </button>
    <span className="w-28  text-white  hover:text-[#E1CE7A]">No of Points<input type='range' className="w-24" max={560} min={100} value={noOfDots} onChange={(e)=>setnoOfDots(e.target.value)}  disabled={lock}/></span> 
    <span className="w-28 ml-4 text-white  hover:text-[#E1CE7A]">No of clusters<input type='range' className="w-24" max={5} min={2} value={noOfCent} onChange={(e)=>setnoOfCent(e.target.value)} disabled={lock}/></span>
          <button
          disabled={lock}
      className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-10 me-2 mb-2"
      onClick={()=>{initializeCentroids(pointsArray),setlock(true),sethideHome(false)}}>
            start
          </button>
      </div>
      <div  ref={divRef} className='dotArena relative w-2/3 h-3/4 ml-6 mb-6 mt-8 overflow-hidden bg-slate-400'>
      {pointsArray.map((dot, index) => (
        <div
        className='points'
          key={index}
          style={{
            position: 'absolute',
            left: `${dot[0]}px`,
            top: `${dot[1]}px`,
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'black'}}
        ></div>
      ))}
      {centroids.map((dot, index) => (
        <div
        className='centroids'
          key={index}
          style={{
            position: 'absolute',
            left: `${dot[0]}px`,
            top: `${dot[1]}px`,
            width: '13px',
            height: '13px',
            shadow:'8px',
            border:'2px',
            borderColor:'black',
            borderRadius: '30%',
            backgroundColor:centroidColors[index]}}
        ></div>
      ))}
    </div>
    <div className=' absolute m-3 w-[29rem] h-3/4 left-2/4 translate-x-[4rem] top-[8.25rem] ml-56 bg-slate-700'>
        <h1 className='ml-14 mt-7 text-slate-300 font-extrabold text-4xl '>K-Means Clustering</h1>
        <p className='p-3 mt-4  text-slate-300 font-semibold'>K-Means Clustering is an Unsupervised Machine Learning algorithm, which groups the unlabeled dataset into different clusters</p>
        <p className='p-3  text-slate-300 font-semibold'>K means clustering, assigns data points to one of the K clusters depending on their distance from the center of the clusters. It starts by randomly assigning the clusters centroid in the space. Then each data point assign to one of the cluster based on its distance from centroid of the cluster. After assigning each point to one of the cluster, new cluster centroids are assigned. This process runs iteratively until it finds good cluster. In the analysis we assume that number of cluster is given in advanced and we have to put points in one of the group.</p>
        <div className='flex justify-center items-center mt-5'><div className='w-[17px] h-[17px] mt-1 rounded bg-slate-100'>
        </div> <pre className=' text-yellow-300 font-bold italic font-2xl'> :- Centroids</pre></div>
        <div className='flex justify-center items-center mt-2'><div className='w-[12px] h-[12px] mt-1 rounded-2xl bg-slate-100'>
        </div> <pre className=' text-yellow-300 font-bold italic font-2xl'> :- Data Instances</pre></div>
        {hideHome&&(<div className=" absolute inline-block rounded-full left-[24rem] bottom-[1rem] p-2 bg-slate-300"><Link href='/Main'><FaHome color="#10314A" size="2.5em" className='hover:cursor-pointer'/></Link></div>)}
    </div> 
    
      </>
  )
}

export default Kmeans