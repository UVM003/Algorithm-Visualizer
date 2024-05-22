"use client"
import React, { useState } from 'react'
import { drawGraph } from '@/app/Utils/hauffmanHelpers';
import * as d3 from 'd3';
class HuffmanNode 
{ 
    constructor(val,freq,right,left,code) 
    { 
    this.value = val;
    this.freq = parseInt(freq);
    this.right = right;
    this.left = left;
    this.code =code;
}
}

const Huffmanencoding = () => {
    const [textIn, settextIn] = useState('')
    const [frequencies, setfrequencies] = useState('')
    const [binary, setBinary] = useState('')
    const [encoded, setencoded] = useState(new Map())
    const [list, setlist] = useState(new Map())
    const [compressed, setcompressed] = useState('')
    const [on, seton] = useState(true)
    const [onComp, setonComp] = useState(true)

  const getFrequency= ()=>
        {    
            const freqs=new Map(); 
   for(let i=0;i<textIn.length;i++)
    {
        
        let ref=textIn.charAt(i);
        if(ref===' ')
            {
                ref='Space';
            }
        if(ref in freqs)
            {
        freqs[ref]=freqs[ref]+1;
            }
    else
        freqs[ref]=1;
    }
    
    
    let text='Frequencies : '

    for(let key in freqs)
        {
            text+=`[ ${key} : ${freqs[key]}],  `;
            setlist(new Map(list.set(key,freqs[key])))
        }
       
        setfrequencies(text)
        Huffmancoding()
        convert()
    }

    const convert= ()=>
        {
            let value =textIn;
            let total = '';
    
    for (let i=0; i < value.length; i++) {
        let binary = '';
        let ch = value.charCodeAt(i)
        
        while (ch>0) {
            let mod = ch % 2;
            ch = Math.floor(ch / 2);
            binary = String(mod) + binary;
        }

        while (binary.length < 8) {
            binary = `0${binary}`

        }

        total += binary + ' ';
    }
    setBinary(total)
    
 }
        
     function Huffmancoding ()
            {
                let q = []; 
                for (let key of list) { 
                    let hn = new HuffmanNode(key[0],key[1],null,null); 
                    q.push(hn); 
                } 
                let root = null;
                  q.sort(function(a,b){return a.freq-b.freq;});
                  drawGraph(q)
                  while (q.length > 1) {
                    let x = q[0]
                    q.shift() 
                    let y = q[0]
                    q.shift()
                    let f = new HuffmanNode('-',(x.freq+y.freq),x,y);  
                    root = f; 
                    q.push(f); 
                    q.sort(function(a,b){return a.freq-b.freq;}); 
                }            
                createCode(q[0],"")
            }
            
        function createCode(node,s){
        
            if(node == null) return;
            if(node.right == null && node.left == null){
                node.code = s;
                setencoded(new Map(encoded.set(node.value,node.code)));
                return;
            }
            node.code = s;
        
            createCode(node.left,s + '0');
            createCode(node.right,s + '1');  
        }
   const compress = ()=>
    {
        let text=''
        for(let i=0;i<textIn.length;i++)
            {
                if(textIn.charAt(i)===' ')
                text+=`${encoded.get('Space')} `
                else
                text+=`${encoded.get(textIn.charAt(i))} `
            }
        setcompressed(text)
        
    }



  return (
    <div className="flex rounded gap-[13rem] w-full h-screen bg-slate-800 ">
        <div >
        <div className='flex gap-2'><textarea style={{width:'41rem',height:'8rem'}} className=' mt-10 ml-4 border-2 border-slate-600 bg-slate-300 text-2xl text-orange-700' value={textIn} onChange={(e)=>settextIn(e.target.value)} placeholder='Enter the Text Here'></textarea>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-3 h-10  mt-20 py-1.5 text-center me-2 mb-2"
          onClick={()=>{
            d3.select(".renderer").selectAll("*").remove();
            getFrequency()
            seton((e)=>!e)
            setonComp((e)=>true)
            setcompressed('')
            setlist(new Map())
          }}
          >
          Start
        </button>
        </div>
        <div className='h-10 mt-3 ml-4 font-semibold text-xl text-slate-200 w-[45rem]'>{frequencies}</div>
        <p className='ml-4 text-red-700 mt-12 text-2xl font-extrabold '>Binary :</p>
        <textarea readOnly value={binary} style={{width:'45rem',height:'8rem'}} className=' text-xl font-semibold  ml-4 border-2 border-slate-600 mt-2 bg-slate-300 text-red-900 '></textarea>
        <p className='ml-4 text-green-700 mt-4 text-2xl font-extrabold '>Hauffman Encoding : <button className='bg-purple text-xl font-thin text-white' hidden={on} onClick={()=>{compress(); seton((e)=>!e);setonComp((e)=>!e)}}> click</button></p> 
        <textarea value={compressed}  readOnly style={{width:'45rem',height:'8rem'}} className=' text-xl font-semibold ml-4 border-2 border-slate-600 mt-2  bg-slate-300 text-green-900 '></textarea>
        <div  className=' ml-4 justify-center items-center text-2xl text-slate-400 italic'> <p  hidden={onComp} >The Compression Rate is {(compressed.length!=0) ? (compressed.length/binary.length)*100:''}%</p>
        <div ><p  hidden={!onComp}>To encode the character traverse the tree provided :</p> <p hidden={!onComp}>For each left transition concatenate '0' and for each right trasition concatenate '1' </p></div></div>
        </div>
        <div className='renderer render w-[45rem]  bg-slate-600 overflow-auto items-center justify-center border-black border-2 mr-4 mt-4 mb-4'>
        <svg  className="graph-svg" >
        {/* This is where the graph will be drawn */}
        <g  id='abc' className="graph w-[100%]"></g>
      </svg>
        </div>
        </div>
  )
}

export default Huffmanencoding