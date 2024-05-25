"use client";
import React, { useEffect, useState } from "react";
import { mergeSort, selectionSort,bubbleSort} from "@/app/Utils/sortingHelpers";
import { FaHome } from "react-icons/fa";
import Link from "next/link";


const SortingAlgos = () => {
  const [array, setarray] = useState([]);
  const [desc, setdesc] = useState({ purple:"",green:"",red: "",tc: "", about: "" });
  const [arraySize, setarraySize] = useState(8);
  const [whichSort, setwhichSort] = useState('')
  const [speed, setspeed] = useState(3)
  const [progress, setprogress] = useState(false)
  const [isSort, setisSort] = useState(false)

  useEffect(() => {
    resetArray();
  }, [arraySize,speed]);

  useEffect(() => {
    startSort(whichSort)
  }, [isSort]);

  const refArray = [];
  const resetArray = () => {
    refArray.splice(0);
    for (let i = 0; i < arraySize; i++) {
      refArray.push(randomInt(35, 200));
    }
    setarray(refArray);
    setdesc({ tc: "", about: "" });
    setwhichSort('')
    setisSort(false)
  };
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const numWidth = Math.floor(900/(refArray.length * 3));
  const width = `${numWidth}px`;
  const numMargin =
    refArray.length < 5
      ? 10
      : refArray.length < 8
      ? 8
      : refArray.length < 11
      ? 6
      : refArray.length < 20
      ? 4
      : refArray.length < 50
      ? 3.5
      : refArray.length < 100
      ? 3
      : refArray.length < 130
      ? 2.5
      : 2;
  const margin = `${numMargin}px`;
  const color = refArray.length < 20 ? "#E1CE7A" : "transparent";
  const numFont =
    numWidth > 70
      ? 13
      : numWidth > 60
      ? 11
      : numWidth > 50
      ? 9
      : numWidth > 40
      ? 7
      : numWidth > 30
      ? 5
      : numWidth > 20
      ? 4
      : 3;
  const fontSize = `${numFont}px`;

  const renderFooter = (sort) => {
    const theta = "\u03B8";
    let tc = "";
    let about = "";
    let red="";
    let green="";
    let purple='';
    if (sort === "M") {
      red=`RED : Initial State`; green=`GREEN : The elements being compared`
      tc = `Time Complexity : ${theta} (n * log(n))`;
      about =
        "Merge Sort : Divides the array into halves,sort them recursively using merge sort,then merge the two halves";
    } else if (sort === "S") {
      red=`RED : Initial State`; purple=`PURPLE : The elements being compared`; green=`GREEN : The elements being swapped `
      tc = `Time Complexity : ${theta} (n**2)`;
      about =
        "Selection Sort: Repeatedly find the minimum element from the unsorted part and append it to the sorted part";
    } else {
      red=`RED : Initial State`; purple=`PURPLE : The elements being compared`; green=`GREEN : The elements being swapped `
      tc = `Time Complexity : ${theta} (n**2)`;
      about =
        "Bubble Sort: Repeatedly swap the adjacent elements if they are in wrong order";
    }
    setdesc({ purple,green ,red,tc, about });
  };

  const startSort = (e)=>
    {
        if(e==='M')
          {
           mergeSort(array,speed)
          }
        else if (e==='S')
          {
           selectionSort(array,speed)
          }
          else if (e==='B')
            {
             bubbleSort(array,speed)
            }
  }
  return (
    <>
      <div className="flex rounded gap-[13rem] items-center w-full h-28 bg-slate-800 ">
        <div>
          <button
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-14 me-2 mb-2"
            onClick={()=>window.location.reload()}
          >
            RESET
          </button>
        </div>
        <div className=" flex justify-center gap-7">
          <span className="w-24  text-white  hover:text-[#E1CE7A]">
            Array Length
            <input
              className="w-24"
              type="range"
              max={43}
              min={8}
              value={arraySize}
              onChange={(e) => setarraySize(e.target.value)}
              disabled={progress}
            ></input>
          </span>
          <span className="w-24 ml-4 text-white  hover:text-[#E1CE7A]">
            Speed<input className="w-24" type="range" max={100} min={3} value={speed} onChange={(e)=>setspeed(e.target.value)} disabled={progress}></input>
          </span>
        </div>
        <div className=" flex justify-center gap-7 ">
          <button
            onClick={() => {
              renderFooter("M");
              setwhichSort("M")
            }}
            className=" text-white  hover:text-[#E1CE7A] "
            disabled={progress}
          >
            Merge Sort
          </button>
          <button
            onClick={() => {
              renderFooter("S");
              setwhichSort("S")
            }}
            className=" text-white  hover:text-[#E1CE7A] "
            disabled={progress}
          >
            Selection Sort
          </button>
          <button
            onClick={() => {
              renderFooter("B");
              setwhichSort("B")
            }}
            className=" text-white  hover:text-[#E1CE7A] "
            disabled={progress}
          >
            Bubble Sort
          </button>
        </div>
        <div className=" flex gap-6 justify-center items-center">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2"
          onClick={()=>{setprogress((e)=>!e);}}
            hidden={progress}>
         Ready
        </button>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={()=>(setisSort((e)=>!e))}
          hidden={!progress}
          disabled={isSort}>
          Sort
        </button>
        </div>
      </div>
      <div className=" arrays flex mt-[3rem] overflow-hidden justify-center items-end w-full">
        {array.map((val, idx) => (
          <div
            key={idx}
            className="arrays-item"
            style={{
              height: `${val * 2}px`,
              width: `${width}`,
              marginLeft: `${margin}`,
              backgroundColor: "#9E0031",
              color: `${color}`,
              padding: "2px",
              fontSize: `${fontSize}`,
            }}
          >
            {val}
          </div>
        ))}
      </div>
      <div className="relative mt-24 w-full justify-center items-center">
        <div className=" absolute  left-1/2  bottom-[2rem] -translate-x-1/2 -translate-y-1/2 flex justify-center gap-10 items-center ">
          <p className=" text-[#9E0031] font-semibold">{desc.red}</p>
          <p className=" text-[#4CB944] font-semibold"> {desc.green}</p>
          <p className=" text-[purple] font-semibold">{desc.purple}</p>
        </div>
        <p className="absolute left-1/2  top-2/3 -translate-x-1/2 -translate-y-2/3 text-3xl text-zinc-400  font-extrabold italic">
          {desc.tc}
        </p>
        <p className=" absolute  flex-wrap top-8 left-1/3 -translate-x-36 text-xl text-zinc-400  font-semibold ">
          {desc.about}
        </p>
      </div>
      <div className="inline-block rounded-full ml-[90rem] p-2 bg-slate-600"><Link href='/Main'><FaHome  color="#90A8C3" size="2.5em" className='hover:cursor-pointer'/></Link></div>
    </>
  );
};

export default SortingAlgos;