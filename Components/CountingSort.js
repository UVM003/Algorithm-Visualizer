"use client"
import React, { useEffect, useState } from 'react'

const CountingSort = () => {
    const [progress, setprogress] = useState(false)
    const [array, setarray] = useState([]);
    const [freqArray, setfreqArray] = useState([]);
    const [arraySize, setarraySize] = useState(8);
    const [speed, setspeed] = useState(3);
    const [maxVal, setmaxVal] = useState(0);
    const [disSort, setdisSort] = useState(false)

    useEffect(() => {
        resetArray();
      }, [arraySize,speed]);

      useEffect(() => {
        const freq=formFreqArray();
        setfreqArray([...freq]);
      }, [maxVal]);

      useEffect(() => {
        if(maxVal!=0)
            setTimeout(()=>(findFreq()),(1000*speed));
    }, [maxVal]);

    useEffect(() => {
      if(freqArray.length!=0)
          setTimeout(()=>(CountingSort3()),(700*speed));
  }, [freqArray]);

    const resetArray = () => {
        const refArray = [];
      for (let i = 0; i < arraySize; i++) {
        refArray.push(Math.floor(Math.random()*10));
      }
      setarray(refArray);
      setmaxVal(0);
    };

    const CountingSort = async ()=>
       {
         const {max , ani}=findMax()
         for(let i=0;i<ani.length;i++)
        {
      const arrayBars = document.getElementsByClassName('arrays-item');
      const [barOneIdx, barTwoIdx] = ani[i];
      if (barTwoIdx === -1) {
        const barOneStyle = arrayBars[barOneIdx].style;
        setTimeout(() => {
           barOneStyle.backgroundColor = "purple";
          }, i * (180 - speed));
          setTimeout(() => {
            barOneStyle.backgroundColor = "#9E0031";
          }, i * (195 - speed));
            }
            else
            {
                const barOneStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                   barOneStyle.backgroundColor = "#4CB944";
                  }, i * (180 - speed));
                  setTimeout(() => {
                    barOneStyle.backgroundColor = "#9E0031";
                  }, i * (195 - speed)); 
            }
        }
        setTimeout(() => {
            setmaxVal(max)
            CountingSort2();
          }, ani.length*(70*speed));
        }


const CountingSort2 =async  ()=>
            {
        for(let i=0;i<arraySize;i++)
            {  
                const arrayBars = document.getElementsByClassName('arrays-item');
                const barOneIdx=i;
                const barOneStyle = arrayBars[barOneIdx].style;
                setTimeout(() => {
                barOneStyle.backgroundColor = "purple";
                }, i * (180 - speed));
                setTimeout(() => {
                    barOneStyle.backgroundColor = "#9E0031";
                }, i * (195 - speed));
       } 
}
const CountingSort3=  ()=>
    {
     let animations=doSort()
     for(let i=0;i<animations.length;i++)
      {
        const arrayBars = document.getElementsByClassName('arrays-item');
        const freqBars = document.getElementsByClassName('freq-items');
      const [barOneIdx, val] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const freqBarStyle = freqBars[val].style;
      const barOneVal = arrayBars[barOneIdx];
        setTimeout(() => {
           barOneStyle.backgroundColor = "purple";
           freqBarStyle.backgroundColor = "purple";
           barOneVal.innerText=val;
          },(i+0.35)*2*(300- speed));
          setTimeout(() => {
            barOneStyle.backgroundColor = "#9E0031";
            freqBarStyle.backgroundColor = "#5D7961";
          },(i+0.35)* 2*(325 - speed));
      }
    }
const doSort=()=>
  {
    let animations=[];
    let freq=[...freqArray]
    let j=0,i=0;
    while(i<arraySize&&j<freqArray.length)
      {
        if(freq[j]>0)
          {
            let fr=freq[j];
            while(fr>0)
              {
                animations.push([i,j]);
                i++;
                fr--;
              }
              j++;
          }
          else
          {
            j++;
          }

      }
      return animations;
  }

  const findMax=()=>
        {
            let max=-1;
            let idx=-1;
            let ani=[]
            for(let i=0;i<arraySize;i++)
                {
                    ani.push([i,-1])
                    if(max<array[i])
                        {
                            max=array[i];
                            idx=i;
                            ani.push([-1,idx])
                        }
                }
                return { max, ani};
        }
    const formFreqArray=()=>
        {
            let fre=[]
            if(maxVal!=0){
            for(let i=0;i<=maxVal;i++)
                {
                    fre.push(0);
                }
            }
            return fre;
        }
    const findFreq=()=>
        {
            let freq=new Array(maxVal+1).fill(0);
            console.log(freq)
            for(let i=0;i<arraySize;i++)
                {
                    let idx=array[i];
                    console.log(freq[idx])
                   freq[idx]++;
                  
                }
                console.log(freq)
            setfreqArray([...freq])
        }
  return (
    <>
    <div className="flex rounded gap-[16rem] items-center w-full h-24 bg-slate-800 ">
        <div>
          <button
            className="ml-[23rem] text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  me-2 mb-2"
            onClick={() =>window.location.reload()}
          >
            RESET
          </button>
        </div>
        
          <span className="w-24  text-white  hover:text-[#E1CE7A]">
            Array Length
            <input
              className="w-24"
              type="range"
              value={arraySize}
              onChange={(e) => setarraySize(e.target.value)}
              max={15}
              min={4}
              disabled={progress}
            ></input>
          </span>
   
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
          hidden={!progress}
          disabled={disSort}
          onClick={()=>(CountingSort(),setdisSort((e)=>!e))}>
          Sort
        </button>
        </div>
        </div>
        <div  className=' w-2/3 h-3/4 flex relative overflow-hidden justify-center  ml-6 mb-6 mt-8  bg-slate-400'>
        {array.map((val, idx) => (
          <div
            key={idx}
            className="arrays-item  pl-5 pt-2"
            style={{
              height: '4rem',
              width: '4rem',
              marginLeft: '0.25rem',
              backgroundColor: "#9E0031",
              color: 'white',
              fontSize: `2rem`,
              marginTop:'4rem'
            }}
          >
            {val}
          </div>
        ))}
        <p className='absolute top-48 text-3xl font-bold italic justify-center items-center text-slate-800'>Maximun Value : {maxVal==0?' ':maxVal}</p>
        <div className='absolute top-[18rem] flex'>{freqArray.map((val, idx) => (
          <div
            key={idx}
            className="freq-items text-slate-100 pl-3 pt-4"
            style={{
              height: '5rem',
              width: '5rem',
              marginLeft: '0.25rem',
              backgroundColor: "#5D7961",
              fontSize: `1rem`,
            }}
          >
           <div className='flex-col'> <p>Idx : {idx}</p>
                 <p>Freq : {val}</p></div>
          </div>
        ))}
        </div>
        <p className='absolute top-[28rem] text-3xl font-bold italic justify-center items-center text-slate-800'>Time Complexity: O(N+M) </p>
        <p className='absolute top-[31rem] text-xl font-bold italic justify-center items-center text-slate-800'>where N and M are the size of InputArray and CountArray respectively. </p>
        </div> <div className=' absolute m-3 w-[29rem] h-3/4 left-2/4 translate-x-[4rem] top-[7.25rem] ml-56 bg-slate-700'>
        <h1 className='ml-28 mt-7 text-slate-300 font-extrabold text-4xl '>Counting Sort</h1>
        <p className='p-2 mt-4  text-slate-300 font-semibold'>Iterate through the input array to find the highest value.</p>
       <p className='p-2 mt-1  text-slate-300 font-semibold'>Declare a new array with the value 0 and a size of max+1.</p>
       <p className='p-2 mt-1  text-slate-300 font-semibold'>Count each element in the array and increment its value in the auxiliary array generated at the corresponding index.</p>
        <p className='p-2  mt-1  text-slate-300 font-semibold'>Add current and previous frequency to the auxiliary array to find the cumulative sum.</p>
        <p className='p-2 mt-1  text-slate-300 font-semibold'>The cumulative value now represents the element's actual position in the sorted input array.</p>
       <p className='p-2 mt-1  text-slate-300 font-semibold'>Begin iterating through the auxiliary array from 0 to max.Put 0 at the corresponding index and reduce the count by 1, which will indicate the element's second position in the input array if it exists.</p>
 <p className='p-2 text-slate-300 font-semibold'>Now put the array you got in the previous step into the actual input array.</p>
    </div> 

        
    </>
  )
}

export default CountingSort