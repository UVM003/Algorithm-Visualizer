//Merge Sort 
export async function mergeSort(array,speed){

  const animations = getMergeSortAnimations(array);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName('arrays-item');
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? "#4CB944" : "#9E0031";
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * (110-speed));
    } else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const innerVal=arrayBars[barOneIdx];
        barOneStyle.height = `${newHeight*2}px`;
        innerVal.innerText=`${newHeight}`;
      }, i *(110-speed));
    }
}
}

 function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

//Selection Sort
export async function selectionSort(array,speed){
  const animations = getSelectionSortAnimations(array);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName('arrays-item');
    const [barOneIdx,barTwoIdx] = animations[i];
     if (barTwoIdx === -2) {
      const [barOneIdx, newHeight] = animations[++i]; 
      const [barOneIdx2, newHeight2] = animations[++i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barOneStyle2 = arrayBars[barOneIdx2].style;
      setTimeout(() => {
        barOneStyle2.backgroundColor = "#4CB944";
        barOneStyle.backgroundColor = "#4CB944";
      }, i * (110 - speed));
      setTimeout(() => {
        barOneStyle.height = `${newHeight * 2}px`;
        arrayBars[barOneIdx].innerText = newHeight;
        barOneStyle2.height = `${newHeight2 * 2}px`;
        arrayBars[barOneIdx2].innerText = newHeight2;
        setTimeout(() => {
          barOneStyle2.backgroundColor = "#9E0031";
          barOneStyle.backgroundColor = "#9E0031";
        },110 );
      }, i * (111 - speed));
    } else {
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      setTimeout(() => {
        barOneStyle.backgroundColor = "purple";
        barTwoStyle.backgroundColor = "purple";
      }, i * (110 - speed));
      setTimeout(() => {
        barOneStyle.backgroundColor = "#9E0031";
        barTwoStyle.backgroundColor = "#9E0031";
      }, i * (110.5- speed));
    }
  }
};

   function getSelectionSortAnimations(array) {
    const animations = [];
  const n = array.length;
  for (let i = 0; i < n ; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
       animations.push([minIdx, j]);
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    animations.push([i,-2])
    animations.push([i, array[minIdx]]);
    animations.push([minIdx, array[i]]);
    [array[i], array[minIdx]] = [array[minIdx], array[i]]; 
    
  }
  return animations;
  };


  //Bubble Sort 
export async function bubbleSort (array,speed)
  {
    const animations=getBubbleSortAnimations(array)
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('arrays-item');
      const [barOneIdx, barTwoIdx] = animations[i];
       if (barTwoIdx === -1) {
        const [barOneIdx, newHeight] = animations[++i]; 
        const [barOneIdx2, newHeight2] = animations[++i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barOneStyle2 = arrayBars[barOneIdx2].style;
        setTimeout(() => {
           barOneStyle2.backgroundColor = "#4CB944";
           barOneStyle.backgroundColor = "#4CB944";
          }, i * (110 - speed));
        setTimeout(() => {
          barOneStyle.height = `${newHeight * 2}px`;
          arrayBars[barOneIdx].innerText = newHeight;
          barOneStyle2.height = `${newHeight2 * 2}px`;
          arrayBars[barOneIdx2].innerText = newHeight2;
        }, i * (110 - speed));
      
          setTimeout(() => {
            barOneStyle2.backgroundColor = "#9E0031";
            barOneStyle.backgroundColor = "#9E0031";
          }, i * (110.5 - speed));
       
      } 
      else
      {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = "purple";
          barTwoStyle.backgroundColor = "purple";
        }, i * (110 - speed));
        setTimeout(() => {
          barOneStyle.backgroundColor = "#9E0031";
          barTwoStyle.backgroundColor = "#9E0031";
        }, i * (112 - speed));
      }
    }
  }


  function getBubbleSortAnimations (array)
  {
    const animations=[]
    for (let i=0;i<array.length-1;i++)
      {
        for(let j=0;j<array.length-i-1;j++)
          {
            animations.push([j,j+1])
            if(array[j]>array[j+1])
              {
                animations.push([j,-1])
                animations.push([j,array[j+1]])
                animations.push([j+1,array[j]])
                const temp=array[j]
                array[j]=array[j+1];
                array[j+1]=temp;
                
              }
          }
      }
      return animations
  }